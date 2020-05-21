const { nearestCasesResponse, storeNewCasesSubscriber } = require('../lib')
const { logger } = require('../constants')

exports.handler = async (context, event, callback) => {
  try {
    let responseObject = {}
    const memory = JSON.parse(event.Memory)
    const postalCode =
    memory.twilio.collected_data.ask_questions.answers.NCPostalCode.answer
    const phoneNumber = event.UserIdentifier || '434343434343'

    console.log(`phoneNumber:${phoneNumber} postalCode:${postalCode}`)
    storeNewCasesSubscriber(postalCode, phoneNumber)
    const result = await nearestCasesResponse(postalCode)

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
