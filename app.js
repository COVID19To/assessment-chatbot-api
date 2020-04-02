require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

const bodyParser = require('body-parser')

const router = express.Router()

app.use(express.json()) // for parsing application/json
router.use(cors())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

require('./chatBot')(router)

app.use('/', router)

app.get('/testGoogleSheetsFunction', async (req, res) => {
  // const { addNumberToGoogleSheet } = require('./lib/index')
  const { GoogleSpreadsheet } = require('google-spreadsheet')
  const doc = new GoogleSpreadsheet(process.env.SPREAD_SHEET_ID)

  await doc.useServiceAccountAuth(require('./google-generated-creds.json'))

  await doc.loadInfo()

  console.log(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, process.env.GOOGLE_PRIVATE_KEY)

  // const sheet = await doc.addSheet({ headerValues: ['number'] });
  // // const sheet = await doc.sheetsById[0];
  // console.log('sheet.headerValues', sheet)

  // If there are no header rows in the google sheet, then lets make some
  // if(sheet && !sheet.headerValues) {
  //   const addHeader = await sheet.setHeaderRow('Callback Numbers')
  //   console.log('addHeader', addHeader)
  // }
  const sheet = await doc.sheetsById[0]

  const { _sheet: { _rawProperties: basicSheetProperties } } = await sheet.addRow({ callbackNumbers: '416-467-1111' })

  // test to see if we got a doc title back
  // console.log('doc title: ', doc.title)

  res.send({
    result: basicSheetProperties
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
