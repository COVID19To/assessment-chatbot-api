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
  const { serialNum, number, outreachStatus, assessmentStatus } = req.body
  const event = {
    UserIdentifier: req.body.number,
    Memory: { serialNum, number, outreachStatus, assessmentStatus }
  }
  const callback = (err, respond) => {
    if (err) res.send(err)
    res.send(respond)
  }
  const { handler } = require('./twilioFunctions/addPhoneNoToSheet')
  handler(null, event, callback)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
