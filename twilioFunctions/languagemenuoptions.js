
const { setLanguageOptions } = require('../lib')
const { languages } = require('../constants')
exports.handler = function (context, event, callback) {
  let responseObject = {}
  const memory = JSON.parse(event.Memory)
  const options = memory.twilio.collected_data.ask_questions.answers.Language.answer.toString().toLowerCase()

  const { selected } = setLanguageOptions(options)
  if (selected === languages.unknown) {
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
