
const { setLanguageOptions } = require('../lib/index')

exports.handler = function (context, event, callback) {
  let responseObject = {}
  const memory = JSON.parse(event.Memory)
  const Language = memory.twilio.collected_data.ask_questions.answers.Language.answer || '1'

  setLanguageOptions(Language)

  responseObject = {
    actions: [{
      redirect: `${process.env.ASSESMENT_API}/menu`

    },
    {
      listen: false
    }
    ]
  }

  callback(null, responseObject)
}
