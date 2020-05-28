const axios = require('axios')
const { newCasesDailyUpdates } = require('../lib')
const { logger } = require('../constants')

const responseObject = {}

exports.handler = async (context, event, callback) => {
  try {
    const memory = JSON.parse(event.Memory)
    const postalCode =
    memory.twilio.collected_data.ask_questions.answers.NCPostalCode.answer

    const phoneNumber = event.UserIdentifier

    // Create a function to get total new cases  (fatal & unresolved [Today vs Yesterday])
    const result = await newCasesDailyUpdates(postalCode)

    axios({
      method: 'post',
      url: `/2010-04-01/Accounts/${process.env.AccountSid}/Messages`,
      data: {
        to: `+${phoneNumber}`,
        from: '+18886005722',
        body: result
      }
    })

    callback(null, responseObject)
  } catch (e) {
    logger.log(e)
    callback(e)
  }
}
