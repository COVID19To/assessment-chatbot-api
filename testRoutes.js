var express = require('express')
var { storeNewCasesSubscriber, newCasesDailyUpdates } = require('./lib/index')

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

testRouter.get('/yesterdayDate', async (req, res) => {
  const response = await newCasesDailyUpdates('L5W 1N4')
  res.send({ cases: response })
})

module.exports = testRouter
