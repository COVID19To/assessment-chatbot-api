const { getTextForFunction } = require('../lib/index')
const { logger } = require('../constants')
exports.handler = async function (context, event, callback) {
  try {
    const memory = JSON.parse(event.Memory)
    const Language = memory.twilio.collected_data.ask_questions.answers.Language.answer || '1'
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
          listen: {
            voice_digits: {
              redirects: {
                1: `${process.env.ASSESMENT_API}/newsupdate`,
                2: `${process.env.ASSESMENT_API}/Questions1`,
                3: `${process.env.ASSESMENT_API}/selfisolation`,
                4: `${process.env.ASSESMENT_API}/safetytips`,
                5: `${process.env.ASSESMENT_API}/goodbye`
              },
              finish_on_key: '#',
              num_digits: 1
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
