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

// Test route for adding user call back number to google sheets
app.post('/test/AddCallBackNumber', async (req, res) => {
  const callbackNumber = req.body.number

  // Call function to add number into Google Sheet
  const { addNumberToGoogleSheet } = require('./lib')
  const response = addNumberToGoogleSheet(callbackNumber)

  response.then(async (addNumResp) => {
    // Success is true if response is an object, with more than 0 keys, otherwise
    // it is empty/undefined (adding number to google sheet resulted in error)
    res.json({
      success: typeof addNumResp === 'object'
    })
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
