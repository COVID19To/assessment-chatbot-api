const hospitalTable = 'HospitalDetails'
const centerTable = 'CenterDetails'
const messagesTable = 'TwilioMessages'
const Sequelize = require('sequelize')
var Rollbar = require('rollbar')
const { GoogleSpreadsheet } = require('google-spreadsheet')

const yesAllLanguages = ['yes', 'oui']
const noAllLanguages = ['no', 'non']

var logger = new Rollbar({
  accessToken: process.env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true
})
const db = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USERNAME, process.env.MYSQL_PASS, {
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASS,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  dialect: 'mysql'
})

const hospitalTableDB = db.define('HospitalDetails', {
  HospitalName: Sequelize.DataTypes.STRING,
  StreetAddress: Sequelize.DataTypes.STRING,
  City: Sequelize.DataTypes.STRING,
  Province: Sequelize.DataTypes.STRING,
  PostalCode: Sequelize.DataTypes.STRING,
  PhoneNumber: Sequelize.DataTypes.STRING,
  PID: Sequelize.DataTypes.STRING,
  lat: Sequelize.DataTypes.FLOAT,
  lng: Sequelize.DataTypes.FLOAT
}, {})

const centerTableDB = db.define('CenterDetails', {
  CenterName: Sequelize.DataTypes.STRING,
  StreetAddress: Sequelize.DataTypes.STRING,
  City: Sequelize.DataTypes.STRING,
  Province: Sequelize.DataTypes.STRING,
  PostalCode: Sequelize.DataTypes.STRING,
  PhoneNumber: Sequelize.DataTypes.STRING,
  PID: Sequelize.DataTypes.STRING,
  lat: Sequelize.DataTypes.FLOAT,
  lng: Sequelize.DataTypes.FLOAT
}, {
  tableName: 'CenterDetails'
})

const messageTableDB = db.define('TwilioMessages', {
  Name: Sequelize.DataTypes.STRING,
  Message: Sequelize.DataTypes.TEXT('long'),
  BotType: Sequelize.DataTypes.STRING,
  Language: Sequelize.DataTypes.STRING
}, {})

const doc = new GoogleSpreadsheet(process.env.SPREAD_SHEET_ID)

const getSheet = async () => {
  const { client_email, private_key } = process.env // eslint-disable-line camelcase
  // Service Account Auth
  await doc.useServiceAccountAuth({ client_email, private_key }) // eslint-disable-line camelcase
  await doc.loadInfo()
  const sheet = await doc.sheetsById[0]
  return sheet
}

module.exports = {
  centerTable,
  hospitalTable,
  db,
  messagesTable,
  messageTableDB,
  centerTableDB,
  hospitalTableDB,
  logger,
  yesAllLanguages,
  noAllLanguages,
  getSheet
}
