const { getTextForFunction } = require('../lib/index')
const { logger, noAllLanguages } = require('../constants')
const { setLanguageOptions } = require('../lib/index')

exports.handler = async function (context, event, callback) {
  try {
    let responseObject = {}
    let message = ''
    const memory = JSON.parse(event.Memory)

    const Breathing = memory.twilio.collected_data.ask_questions.answers.Breathing.answer.toString().toLowerCase()

    const options = memory.twilio.collected_data.ask_questions.answers.Language.answer || '1'
    const Language = setLanguageOptions(options)

    if (noAllLanguages.includes(Breathing)) {
      message = await getTextForFunction('Evaluate-Answers3', event.Channel, 'Both', Language)

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
