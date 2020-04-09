const opencage = require('opencage-api-client')
const { messageTableDB, hospitalTableDB } = require('../constants')
const haversineDistance = require('./haversineDistance')
const { getSheet } = require('../constants')

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
      return { Language: 'English', selected: 'english' }
    case '2':
    case 'en francais':
      return { Language: 'French', selected: 'french' }
    default:
      return { Language: 'English', selected: 'unknown' }
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

module.exports = {
  getLatFromPostalCode,
  getTop3Centers,
  defaultHospitalCodeTxt,
  getTextForFunction,
  setLanguageOptions,
  addNumberToGoogleSheet
}
