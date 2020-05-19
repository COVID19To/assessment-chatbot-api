var express = require('express')
var mysql = require('mysql2')

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT
})

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
  let response = 'Cant do this!'
  if (req.body) {
    const { body: { postalCode, number } } = req

    console.log(postalCode, number)

    connection.query(`Insert Into NewCasesSubscribers (Subscriber, PostalCode, Active, createdAt, updatedAt)
                        Values (${number}, '${postalCode}', 1, NOW(), NOW())`, function (error, results) {
      if (error) console.log(error)

      console.log(`Insert Into NewCasesSubscribers (Subscriber, PostalCode, Active, createdAt, updatedAt)
                          Values (${number}, ${postalCode}, 1, NOW(), NOW())`)
      response = results
    })
  }

  res.send({
    result: response
  })
})

module.exports = testRouter
