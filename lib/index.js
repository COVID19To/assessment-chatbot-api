// const { format } = require('date-fns')
const opencage = require('opencage-api-client')
const { messageTableDB, centerTableDB, hospitalTableDB } = require('../constants')
const haversineDistance = require('./haversineDistance')
const { getSheet } = require('../constants')

const getTop3Centers = async (tableName = 'CenterDetails', postalCode) => {
  const { lat: _lat, lng: _lng } = await getLatFromPostalCode(postalCode)
  const userLatLng = { lat: _lat, lng: _lng }
  let result = []
  if (tableName === 'CenterDetails') {
    result = await centerTableDB.findAll({ raw: true })
  } else {
    result = await hospitalTableDB.findAll({ raw: true })
  }
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

const defaultAssementCodeTxt = async (startTxt, centers = [], channel) => {
  let resultTxt = `${startTxt} \n`
  centers.forEach(center => {
    // {
    //     "id": "recoETgz2HJeTjlWI",
    //     "distance": 5828.285340806428,
    //     "CenterName": "Unity - St. Michael's Hospital",
    //     "StreetAddress": "209 Victoria Street",
    //     "City": "Toronto",
    //     "Province": "ON",
    //     "PostalCode": "M5B 1T8",
    //     "PhoneNumber": "416-360-4000",
    //     "PID": "ChIJ7SFqkzTL1IkRHP4f8xxifIQ"
    // }
    const { CenterName, StreetAddress, City, Province, PostalCode } = center
    resultTxt =
      resultTxt +
      `${CenterName} ${StreetAddress} ${City}, ${Province} ${PostalCode}`
    resultTxt = resultTxt + '\n '
  })
  const message = await getTextForFunction('911advise', channel)
  resultTxt =
    resultTxt +
    message
  return resultTxt
}

const defaultHospitalCodeTxt = async (startTxt, centers = [], channel) => {
  let resultTxt = `${startTxt} \n`
  centers.forEach(center => {
    // {
    //     "id": "recoETgz2HJeTjlWI",
    //     "distance": 5828.285340806428,
    //     "CenterName": "Unity - St. Michael's Hospital",
    //     "StreetAddress": "209 Victoria Street",
    //     "City": "Toronto",
    //     "Province": "ON",
    //     "PostalCode": "M5B 1T8",
    //     "PhoneNumber": "416-360-4000",
    //     "PID": "ChIJ7SFqkzTL1IkRHP4f8xxifIQ"
    // }
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
      return 'English'
    case '2':
    case 'en francais':
      return 'French'
    default:
      return 'English'
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
  defaultAssementCodeTxt,
  defaultHospitalCodeTxt,
  getTextForFunction,
  setLanguageOptions,
  addNumberToGoogleSheet
}
