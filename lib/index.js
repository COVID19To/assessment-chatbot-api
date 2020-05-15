var axios = require('axios')
const opencage = require('opencage-api-client')
const { messageTableDB, hospitalTableDB } = require('../constants')
const haversineDistance = require('./haversineDistance')
const {
  getSheet,
  languages,
  CONFIRMED_CASES_API_TABLE,
  CONFIRMED_CASES_RES_LIMIT
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

// This function will create an api call to get the total number of cases located in the user provided postal code
const getNearestCases = async (postalCode) => {
  const queryString = `?q=${postalCode}&resource_id=${CONFIRMED_CASES_API_TABLE}&limit=${CONFIRMED_CASES_RES_LIMIT}`
  const baseURL = 'https://data.ontario.ca/api/3/action/datastore_search'

  const { data } = await axios.get(`${baseURL}${queryString}`)
  return data.result.total
}

module.exports = {
  getLatFromPostalCode,
  getTop3Centers,
  defaultHospitalCodeTxt,
  getTextForFunction,
  setLanguageOptions,
  addNumberToGoogleSheet,
  getNearestCases
}
