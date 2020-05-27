const { newCasesDailyUpdates } = require('../lib')
const { logger } = require('../constants')

exports.handler = async (context, event, callback) => {
  try {
    let responseObject = {}
    const memory = JSON.parse(event.Memory)
    const postalCode =
    memory.twilio.collected_data.ask_questions.answers.NCPostalCode.answer

    // Create a function to get total new cases  (fatal & unresolved [Today vs Yesterday])
    const result = await newCasesDailyUpdates(postalCode)

    responseObject = {
      actions: [
        {
          say: result
        },
        {
          redirect: `${process.env.ASSESMENT_API}/menu`
        },
        {
          listen: false
        }
      ]
    }

    callback(null, responseObject)
  } catch (e) {
    logger.log(e)
    callback(e)
  }
}
