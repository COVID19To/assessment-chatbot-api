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
const db = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PASS,
  {
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASS,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql'
  }
)

const hospitalTableDB = db.define(
  'HospitalDetails',
  {
    HospitalName: Sequelize.DataTypes.STRING,
    StreetAddress: Sequelize.DataTypes.STRING,
    City: Sequelize.DataTypes.STRING,
    Province: Sequelize.DataTypes.STRING,
    PostalCode: Sequelize.DataTypes.STRING,
    PhoneNumber: Sequelize.DataTypes.STRING,
    PID: Sequelize.DataTypes.STRING,
    lat: Sequelize.DataTypes.FLOAT,
    lng: Sequelize.DataTypes.FLOAT
  },
  {}
)

const messageTableDB = db.define(
  'TwilioMessages',
  {
    Name: Sequelize.DataTypes.STRING,
    Message: Sequelize.DataTypes.TEXT('long'),
    BotType: Sequelize.DataTypes.STRING,
    Language: Sequelize.DataTypes.STRING
  },
  {}
)

const doc = new GoogleSpreadsheet(process.env.SPREAD_SHEET_ID)

const getSheet = async () => {
  // Service Account Auth
  const privateKey = `-----BEGIN PRIVATE KEY-----
${process.env.PRIVATE_KEY}
e7mfybafFNZktU3ZRgdyHDMysosaVsNieF/mF7unuQ4GEFEpTjjTeV9ete/6ObIb
DYWbC0xgKPyhVeaiiq4qzSoOYoHQt3wX0oW3oDNmFj5BGcLqeBqcEozH/V4O8bKB
dPctDgRjTWP4YzFqqryDumBl2fOYQuFuA3zhQ1+d5scaUIbcxPYBkXBIQL1MLUDo
nnLFK99FzYMI139u3NC/vc7pkvqimJVgIPd5atnNNMlE/dR2532hDkA6klpPbRPQ
h5Xd78HE/qz3vjEAto3DELErN+ERSiYz/k9GCaRpDhrBimNLRHc2C16K1UILQXCW
S3xUv8nRAgMBAAECggEACM+PrskBDkm2ci+EKQUOU3ai0/+eHmgL5eEO6N0sqeiG
FnZrcW27HI/06VtyLbtsk6+5GWMtMnUJ94qUKurhTsk9jcvTPYa3ktj1nEWRAgL/
+05SxID5Dsqop0+eMvsxF5REEpSeJOvz0EqwmB6YGgjwAE82LrziP9PpXIDFQxTL
jYFxmNaklnF0nIjbu9fvoDZdibQB78eBE0idYRCdn3KnIZvyzfZUBWBo1Xxumi9t
XaHGO3VN395WraDr+1qsLFeutJ/VFN58XEFkqTWO3V/UaDmn2uJYyf6whFbFjT26
VPs1Q75BOo1QkVyZxzSvrCgZWynJWWzsNWUUnY+KNQKBgQDMQBfHi1JIH/UMK4Cq
lvTsYhnDKqlDbtBEYyPkSFeoMvlkPu8Qe++94ABTYvXHQlWgd7ox21bdkRTDQONO
gcsbO+c20zVuobXUzRIajZilnvr8t6p2l6jRQCvMjtSAcnLavyrlY1f0KnptPKbs
rWBt4UQ7WZnLMcA8qaz+9fVsdQKBgQDHqguftFDdgJb0cL9ZtQSsZ4PXalvFGJG8
fyTyaPvJmXTt2CapHYoKS9Hg4YIOe8koxzKSU7BqQd2z6oez3LvxdrsVCQo0G8fu
0Z1bEOcuTdVfoJmg6Wa/ZoWVPk/thH7dy58vsYmOtgBqQOHCKhpJFPLRh9gudgtx
YaSUmJqsbQKBgBZoebNkr5RGHUZGh4kvopNEd/sXdRZ209aM4eUroqJLZV0AIo42
aqj0KFT9qGVB+87tE7pgi/km75Y0SjvUtYm5WraDGXuXtjEwhmnvWu3gsTyEkekM
3nKGjceVa+7jn4IsMvKToZSiDGhrnQyeQNQNQMUaIWtPe/2rx9T4+wH5AoGAJR6f
+pjzT7rQVbGAYZUdwU+dWzcSyJnAvmKE4+xQozI8YtuElHxBZZii9EP4gejRhRtD
c6DLc3W7We+IOxAWgNWqAkcj9nwTt3qQ3pVN5XXi7VxWM2wxBfRxcUWcZnPzghiR
B7Th9f4wJZDaZ9ab/GpAmmO+9SRNDE8y4c1dNCECgYAZqxA4Lf49G/ktgqDwQi3i
ixyEQmZtSOKtLftQHkfhZlDpaRkN+wJvak1+VT3wRpWkE7icx9RZjLuEx6XlJvLv
czx7ZdWQK7oPEqVDAR/h1EGchWBD46xrip+LgL2TDv/6YEZjhEcGVGQN3hFfp4OX
Up2B7iwATWVg3gQ3biSGTQ==
-----END PRIVATE KEY-----`

  await doc.useServiceAccountAuth({
    client_email: process.env.CLIENT_EMAIL,
    private_key: privateKey
  }) // eslint-disable-line camelcase
  await doc.loadInfo()
  const sheet = await doc.sheetsById[0]
  return sheet
}

const languages = {
  english: 'English',
  unknown: 'unknown',
  french: 'french'
}

const CONFIRMED_CASES_API_TABLE = '455fd63b-603d-4608-8216-7d8647f43350'
const CONFIRMED_CASES_RES_LIMIT = 5
const CONFIRMED_CASES_TOTAL = 'Cases'
const RESOLVED = 'Resolved'
const NOT_RESOLVED = 'Not Resolved'
const FATAL = 'Fatal'
const CONFIRMED_CASES_API_OUTCOMES = [RESOLVED, NOT_RESOLVED, FATAL]

module.exports = {
  centerTable,
  hospitalTable,
  db,
  messagesTable,
  messageTableDB,
  hospitalTableDB,
  logger,
  yesAllLanguages,
  noAllLanguages,
  languages,
  getSheet,
  CONFIRMED_CASES_API_TABLE,
  CONFIRMED_CASES_RES_LIMIT,
  CONFIRMED_CASES_TOTAL,
  CONFIRMED_CASES_API_OUTCOMES,
  FATAL
}
