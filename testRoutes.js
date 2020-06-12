var express = require('express')
var axios = require('axios')
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

testRouter.get('/getSubPost', async (req, res) => {
  const subscribers = await getNewCasesActiveSubscribers()

  res.send({
    subscribers
  })
})

testRouter.get('/ac2', async (req, res) => {
  const subscribers = await getNewCasesActiveSubscribers()

  // const responseFirst = []

  const { Subscriber, PostalCode } = subscribers[0]
  console.log(Subscriber, PostalCode)

  const response = await axios.post('/test', {
    postalCode: PostalCode, phoneNumber: Subscriber
  })

  // const response = await axios({
  //   method: 'post',
  //   url: '/nearestCasesUpdates',
  //   data: { postalCode: PostalCode, phoneNumber: Subscriber }
  // })
  console.log(response)
  res.send({})

  // subscribers.map(async ({ Subscriber, PostalCode }, index) => {
  //   const response = await axios({
  //     method: 'post',
  //     url: '/nearestCasesUpdates',
  //     data: {
  //       event: {
  //         UserIdentifier: Subscriber,
  //         Memory: JSON.stringify({
  //           twilio: {
  //             collected_data: {
  //               ask_questions: {
  //                 answers: {
  //                   NCPostalCode: {
  //                     answer: PostalCode
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         })
  //       }
  //     }
  //   })
  //   if (index === 0) {
  //     responseFirst.push(response)
  //   }
  // })
  //
  // console.log(responseFirst)
  // res.send({responseFirst})
})

module.exports = testRouter
