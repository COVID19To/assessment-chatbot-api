
const { setLanguageOptions } = require('../lib/index')

exports.handler = function (context, event, callback) {
  let responseObject = {}
  const memory = JSON.parse(event.Memory)
  const options = memory.twilio.collected_data.ask_questions.answers.Language.answer || '1'

  const Language = setLanguageOptions(options)

  if (Language === 'English' && options !== '1') {
    const message = 'Invalid Language Selection. Default to English'
    responseObject = {
      actions: [{
        say: message
      }, {
        redirect: `${process.env.ASSESMENT_API}/menu`
      },
      {
        listen: false
      }
      ]
    }
  } else {
    responseObject = {
      actions: [{
        redirect: `${process.env.ASSESMENT_API}/menu`

      },
      {
        listen: false
      }
      ]
    }
  }

  callback(null, responseObject)
}
