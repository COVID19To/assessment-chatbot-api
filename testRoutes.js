var express = require('express')
var testRouter = express.Router()

const { getNearestCases } = require('./lib')

testRouter.get('/nearestCasesApiRequest', async (req, res) => {
  if (req.query) {
    const { query: { postalCode } } = req

    const response = await getNearestCases(postalCode)
    res.send({
      success: true,
      cases: response
    })
  }
  else {
    res.send({
      success: false,
      error: 'Postal Code not provided in query string.'
    })
  }
})

testRouter.get('/getRealTimeUpdate', async (req, res) => {
  const callback = (err, respond) => {
    if (err) res.send(err)
    res.send(respond)
  }
  const { handler } = require('./twilioFunctions/addRealTimeUpdate')
  handler(null, {}, callback)
})

module.exports = testRouter
