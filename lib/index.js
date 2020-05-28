var axios = require('axios')
var mysql = require('mysql2')
const opencage = require('opencage-api-client')
const { format } = require('date-fns')
const { messageTableDB, hospitalTableDB } = require('../constants')
const haversineDistance = require('./haversineDistance')
const {
  getSheet,
  languages,
  CONFIRMED_CASES_API_TABLE,
  CONFIRMED_CASES_RES_LIMIT,
  CONFIRMED_CASES_API_OUTCOMES,
  CONFIRMED_CASES_TOTAL,
  FATAL
} = require('../constants')

const getTop3Centers = async (tableName = 'CenterDetails', postalCode) => {
  const { lat: _lat, lng: _lng } = await getLatFromPostalCode(postalCode)
  const userLatLng = { lat: _lat, lng: _lng }
  const result = await hospitalTableDB.findAll({ raw: true })
  const distanceHash = []

  result.forEach(({ id, lat, lng, ...rest }) => {
    const centerLatLng = { lat, lon: lng }
    distanceHash.push({
      id,
      distance: haversineDistance(userLatLng, centerLatLng),
      ...rest
    })
  })
  distanceHash.sort((a, b) => a.distance - b.distance)
  const top3 = distanceHash.slice(0, 3)
  return top3
}

const getLatFromPostalCode = async postalCode => {
  try {
    const { results } = await opencage.geocode({ q: `${postalCode},Canada` })
    // geometry defaults to Toronto
    const { geometry } = (Array.isArray(results) &&
      results.length > 0 &&
      results[0]) || { lat: 43.6915, lng: -79.4307 }
    return geometry
  } catch (error) {
    return error
  }
}

const defaultHospitalCodeTxt = async (startTxt, centers = [], channel) => {
  let resultTxt = `${startTxt} \n`
  centers.forEach(center => {
    const { HospitalName, StreetAddress, City, Province, PostalCode } = center
    resultTxt =
      resultTxt +
      `${HospitalName} ${StreetAddress} ${City}, ${Province} ${PostalCode}`
    resultTxt = resultTxt + '\n '
  })
  const message = await getTextForFunction('911advise', channel)
  resultTxt =
    resultTxt + message
  return resultTxt
}

const getTextForFunction = async (Name, channel = 'SMS', BotType = 'Both', Language = 'English') => {
  const result = await messageTableDB.findAll({
    where: {
      Name,
      BotType,
      Language
    },
    raw: true
  })
  const message = (Array.isArray(result) && result.length > 0 && result[0].Message) || ''
  const actualMessage = channel === 'Voice' && BotType !== 'Voice' ? message.split(' ').join(', , ,') : message

  return actualMessage
}

function setLanguageOptions (options) {
  switch (options) {
    case '1':
    case 'english':
      return { Language: languages.english, selected: languages.english }
    case '2':
    case 'francais':
      return { Language: languages.french, selected: languages.french }
    default:
      return { Language: languages.english, selected: languages.unknown }
  }
}

async function addNumberToGoogleSheet ({ reqOn, number, callbackStatus, contactedOn }) {
  // Load GoogleDoc and Specific Sheet
  const sheet = await getSheet()

  const rows = await sheet.getRows()

  // Add Number to Google Sheet
  const addRowResponse = await sheet.addRow({
    'Request ID': rows.length,
    'Requested On': reqOn,
    'Contact Number': number,
    'Callback Status': callbackStatus,
    'Contacted On': contactedOn,
    'Notes': '' // eslint-disable-line quote-props
  })
  return addRowResponse
}

// This function will create separate api calls to get the number of cases located in the user provided postal code against outcomes: Resolved, Not Resolved, Fatal
const getNearestCases = async (postalCode) => {
  const totalCases = {
    [CONFIRMED_CASES_TOTAL]: 0
  }
  await Promise.all(
    CONFIRMED_CASES_API_OUTCOMES.map(async (outcome) => {
      totalCases[outcome] = await getNearestCasesForOutcome(postalCode, outcome)
      totalCases[CONFIRMED_CASES_TOTAL] = totalCases[CONFIRMED_CASES_TOTAL] + totalCases[outcome]
    })
  )
  return totalCases
}

// This function will create an api call to get the number of cases located in the user provided postal code and a certain outcome
const getNearestCasesForOutcome = async (postalCode, outcome) => {
  // Can be modified in future using the datastore_search_sql endpoint, currently unavailable
  const queryString = `?q=${postalCode}&resource_id=${CONFIRMED_CASES_API_TABLE}&limit=${CONFIRMED_CASES_RES_LIMIT}&filters={"Outcome1": "${outcome}"}`
  const baseURL = 'https://data.ontario.ca/api/3/action/datastore_search'

  const { data } = await axios.get(`${baseURL}${queryString}`)
  return data.result.total
}

const determineIfUserInOntario = (postalCode) => {
  if (postalCode.charAt(0).toLowerCase() === 'm') {
    return true
  }
  return false
}

const nearestCasesResponse = async (postalCode) => {
  if (determineIfUserInOntario(postalCode)) {
    const casesCount = await getNearestCases(postalCode)

    let response = ''

    for (const [key, value] of Object.entries(casesCount)) {
      response += `Total ${key}: ${value}.\n`
    }

    return response + '\nYou are now subscribed to alerts, to unsubscribe at any time text STOP'
  }
  else {
    return 'Unfortunately this service is only available in Ontario but we are working hard to onboard other provinces and will notify you when we are available.'
  }
}

const storeNewCasesSubscriber = (postalCode, number) => {
  let response = false

  if (determineIfUserInOntario(postalCode)) {
    const connection = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DATABASE,
      port: process.env.MYSQL_PORT
    })

    // Underlying assumption is that a single user can subscribe to a single postal code
    // To allow a user to be able to subscribe to multiple, we'll add the postal code in check
    connection.query(`Select * from NewCasesSubscribers where Subscriber='${number}'`, (error, results) => {
      response = results && results.length > 0
      if (error) console.log(error)
      if (response) {
        return setNewCasesSubscriberActive(number, 1)
      } else {
        connection.query(`Insert Into NewCasesSubscribers (Subscriber, PostalCode, Active, createdAt, updatedAt)
        Values (${number}, '${postalCode}', 1, NOW(), NOW())`, (error, results) => {
          response = results && results.affectedRows > 0
          if (error) console.log(error)
        })
      }
    })
  }
  return response
}

const newCasesDailyUpdates = async (postalCode) => {
  const yesterdayDate = format(new Date(Date.now() - 86400000), 'yyyy-MM-dd')
  const yesterdayDateTime = `${yesterdayDate}T00:00:00`

  const baseURL = 'https://data.ontario.ca/api/3/action/datastore_search'
  const queryString = `?q=${postalCode} %26 ${yesterdayDateTime}&resource_id=${CONFIRMED_CASES_API_TABLE}&limit=0`
  const filter = `&filters={"Outcome1": "${FATAL}"}`

  // Total Cases API call
  const { data: { result: { total: totalCases } } } = await axios.get(`${baseURL}${queryString}`)

  // Fatal Cases API call
  const { data: { result: { total: fatalCases } } } = await axios.get(`${baseURL}${queryString}${filter}`)

  return `Total Cases as of ${yesterdayDate}: ${totalCases}\nTotal Fatal as of ${yesterdayDate}: ${fatalCases}`
}

const getNewCasesActiveSubscribers = () => {
  let subscribers = []

  const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
  })

  connection.query('Select * From NewCasesSubscribers where active=1', (error, results) => {
    if (results) {
      subscribers = results.map(row => { return { Subscriber: row.Subscriber, PostalCode: row.PostalCode } })
    }
    if (error) console.log(error)
  })
  return subscribers
}

// Underlying assumption is that a single user can subscribe to a single postal code
// To allow a user to be able to subscribe to multiple, we'll add the postal code in set
const setNewCasesSubscriberActive = (number, active) => {
  let response = []

  active = active ? 1 : 0
  const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
  })

  connection.query(`Update NewCasesSubscribers set active=${active} where Subscriber=${number}`, (error, results) => {
    response = results && results.affectedRows > 0

    if (error) console.log(error)
  })
  return response
}

module.exports = {
  getLatFromPostalCode,
  getTop3Centers,
  defaultHospitalCodeTxt,
  getTextForFunction,
  setLanguageOptions,
  addNumberToGoogleSheet,
  getNearestCases,
  nearestCasesResponse,
  storeNewCasesSubscriber,
  newCasesDailyUpdates,
  getNewCasesActiveSubscribers,
  setNewCasesSubscriberActive
}
