const { getTextForFunction } = require('../lib/index')
const { logger } = require('../constants')

exports.handler = async function (context, event, callback) {
  try {
    let responseObject = {}
    let message = {}
    const memory = JSON.parse(event.Memory)

    const Breathing = memory.twilio.collected_data.ask_questions.answers.Breathing.answer || 'No'

    const Language = memory.twilio.collected_data.ask_questions.answers.Language.answer || '1'

    if (Breathing === 'No') {
      message = await getTextForFunction('Evaluate-Answers4A', event.Channel, 'Both', Language)

      responseObject = {
        actions: [
          {
            say: message
          },
          {
            redirect: `${process.env.ASSESMENT_API}/menu`
          },
          {
            listen: true
          }
        ]
      }
      callback(null, responseObject)
    } else {
      message = await getTextForFunction('Evaluate-Answers4B', event.Channel, 'Both', Language)
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
