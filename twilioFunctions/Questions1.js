const { getTextForFunction } = require('../lib/index')

exports.handler = async function (context, event, callback) {
  try {
    const message = await getTextForFunction('Questions')

    const questions = [
      {
        question: {
          say: message

        },
        name: 'Breathing',
        type: 'Twilio.YES_NO'
      }
    ]
    const responseObject = {
      actions: [
        {
          collect: {
            name: 'ask_questions',
            questions: questions,
            on_complete: {
              redirect: `${process.env.ASSESMENT_API}/triage1`
            }
          }
        }]
    }
    callback(null, responseObject)
  } catch (e) {
    rollbar.log(e)
    callback(e)
  }
}
