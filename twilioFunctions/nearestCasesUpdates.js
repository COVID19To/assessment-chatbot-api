// const axios = require('axios')
const { newCasesDailyUpdates } = require('../lib')
const { logger } = require('../constants')

const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)

exports.handler = async (context, event, callback) => {
  try {
    const { phoneNumber, postalCode } = event

    // Create a function to get total new cases  (fatal & unresolved [Today vs Yesterday])
    const result = await newCasesDailyUpdates(postalCode)
    let clientMessageResponse = ''

    const message = await client.messages
      .create({
        body: result,
        from: '+18886005722',
        to: `+${phoneNumber}`
      })

    clientMessageResponse = message.sid

    const responseObject = {
      actions: [
        {
          result,
          clientMessageResponse
        }
      ]
    }

    callback(null, responseObject)
  } catch (e) {
    logger.log(e)
    callback(e)
  }
}
