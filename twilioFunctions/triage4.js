const { getTextForFunction } = require('../lib/index')
const { logger } = require('../constants')

exports.handler = async function (context, event, callback) {
  try {
    let responseObject = {}
    let message = {}
    const memory = JSON.parse(event.Memory)

    const Breathing = memory.twilio.collected_data.ask_questions.answers.Breathing.answer || 'No'

    if (Breathing === 'No') {
      message = await getTextForFunction('Evaluate-Answers4A', event.Channel)

      responseObject = {
        actions: [
          {
            say: message
          },
          {
            redirect: `${process.env.ASSESMENT_API}/informationRoute`
          },
          {
            listen: true
          }
        ]
      }
      callback(null, responseObject)
    } else {
      message = await getTextForFunction('Evaluate-Answers4B', event.Channel)
      responseObject = {
        actions: [
          {
            say: message
          },
          {
            redirect: `${process.env.ASSESMENT_API}/getPostalCode`
          },
          {
            listen: true
          }
        ]
      }
      callback(null, responseObject)
    }
  } catch (e) {
    logger.log(e)
    callback(e)
  }
}
