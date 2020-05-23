var express = require('express')
var { storeNewCasesSubscriber } = require('./lib/index')

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

testRouter.post('/insertIntoNewCasesSubscribers', (req, res) => {
  if (req.body) {
    const { body: { postalCode, number } } = req

    const response = storeNewCasesSubscriber(postalCode, number)

    res.send({
      success: response
    })
  }
  else {
    res.send({
      success: false
    })
  }
})

module.exports = testRouter
