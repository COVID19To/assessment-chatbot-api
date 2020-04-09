const { getTextForFunction } = require('../lib/index')
const { logger } = require('../constants')
const { setLanguageOptions } = require('../lib/index')

exports.handler = async function (context, event, callback) {
  try {
    const memory = JSON.parse(event.Memory)
    const options = memory.twilio.collected_data.ask_questions.answers.Language.answer || '1'
    const Language = setLanguageOptions(options)
    const channel = event && event.Channel && event.Channel.toLowerCase() === 'voice' ? 'Voice' : 'SMS'

    const message = await getTextForFunction('Menu', channel, channel, Language)

    const questions = [
      {
        question: {
          say: message
        },
        name: 'Menu'
      }
    ]
    const responseObject = {
      actions: [
        {
          collect: {
            name: 'ask_questions',
            questions: questions,
            on_complete: {
              redirect: `${process.env.ASSESMENT_API}/menuoptions`
            }
          }
        },
        {
          listen: true
        }]
    }
    callback(null, responseObject)
  } catch (e) {
    logger.log(e)
    callback(e)
  }
}
