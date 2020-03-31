const { getTextForFunction } = require('../lib/index')
const { logger } = require('../constants')
exports.handler = async function (context, event, callback) {
  try {
    let responseObject = {}
    let message = ''
    const memory = JSON.parse(JSON.stringify(event.Memory))

    const Breathing = memory.twilio.collected_data.ask_questions.answers.Breathing.answer || 'No'

    if (Breathing === 'No') {
      message = await getTextForFunction('Evaluate-Answers3')

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
      responseObject = {
        actions: [
          {
            redirect: `${process.env.ASSESMENT_API}/Questions4`
          },
          {
            listen: false
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
