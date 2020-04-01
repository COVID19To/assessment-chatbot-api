const { getTextForFunction } = require('../lib/index')
const { logger } = require('../constants')
exports.handler = async function (context, event, callback) {
  try {
    const channel = event.Channel.toLowerCase() === 'voice' ? 'Voice' : 'SMS'

    const message = await getTextForFunction('Information_Router', channel, channel)

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
                0: 'task://LanguageSelection',
                1: 'task://newsupdate',
                2: 'task://questions',
                3: 'task://self-isolation',
                4: 'task://safety-tips',
                5: 'task://goodbye'
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
