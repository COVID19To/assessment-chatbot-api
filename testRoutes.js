var express = require('express')
var testRouter = express.Router()

const { getNearestCases } = require('./lib')

testRouter.get('/nearestCasesApiRequest', async (req, res) => {
  if (req.query) {
    const { query: { postalCode } } = req

    const response = await getNearestCases(postalCode)
    res.send({
      success: true,
      total_cases: response
    })
  }
  else {
    res.send({
      success: false,
      error: 'Postal Code not provided in query string.',
      query: req.query.postalCode
    })
  }
})

module.exports = testRouter
