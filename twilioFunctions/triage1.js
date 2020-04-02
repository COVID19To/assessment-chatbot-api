const { getTextForFunction } = require('../lib/index')
const { logger, yesAllLanguages } = require('../constants')
const { setLanguageOptions } = require('../lib/index')

exports.handler = async function (context, event, callback) {
  try {
    let responseObject = {}
    let message = ''

    const memory = JSON.parse(event.Memory)

    const Breathing = memory.twilio.collected_data.ask_questions.answers.Breathing.answer.toLowercase()

    const options = memory.twilio.collected_data.ask_questions.answers.Language.answer || '1'
    const Language = setLanguageOptions(options)

    if (Breathing.includes(yesAllLanguages)) {
    // Evaluate-Answers
      message = await getTextForFunction('Evaluate-Answers', event.Channel, 'Both', Language)

      responseObject = {
        actions: [
          {
            say: message
          },
          {
            redirect: `${process.env.ASSESMENT_API}/getHospitalPostalCode`
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
            redirect: `${process.env.ASSESMENT_API}/Questions2`
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
