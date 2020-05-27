var express = require('express')
var { storeNewCasesSubscriber, newCasesDailyUpdates, getNewCasesActiveSubscribers, setNewCasesSubscriberActive } = require('./lib/index')

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
    console.log("response", response)

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

testRouter.get('/getNewCasesActiveSubscribers', (req, res) => {
  if (req.body) {

    const response = getNewCasesActiveSubscribers()

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

testRouter.post('/setNewCasesSubscriberActive', (req, res) => {
  if (req.body) {
    const { body: { number, active } } = req

    const response = setNewCasesSubscriberActive(number, active)

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
