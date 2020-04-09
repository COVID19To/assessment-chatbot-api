const { getTextForFunction } = require('../lib/index')
const { logger } = require('../constants')
const { setLanguageOptions } = require('../lib/index')

exports.handler = async function (context, event, callback) {
  try {
    const memory = JSON.parse(event.Memory)
    const options = memory.twilio.collected_data.ask_questions.answers.Language.answer || '1'
    const { Language } = setLanguageOptions(options)
    const message = await getTextForFunction('Questions4', event.Channel, 'Both', Language)

    const questions = [
      {
        question: {
          say: message

        },
        name: 'Breathing'
      }
    ]
    const responseObject = {
      actions: [
        {
          collect: {
            name: 'ask_questions',
            questions: questions,
            on_complete: {
              redirect: `${process.env.ASSESMENT_API}/triage4`
            }
          }
        }]
    }
    callback(null, responseObject)
  } catch (e) {
    logger.log(e)
    callback(e)
  }
}
