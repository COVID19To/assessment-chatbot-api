const { getTextForFunction } = require('../lib/index')
const { logger } = require('../constants')
exports.handler = async function (context, event, callback) {
  try {
    let responseObject = {}
    let message = ''
    const memory = JSON.parse(event.Memory)

    const Breathing = memory.twilio.collected_data.ask_questions.answers.Breathing.answer

    if (Breathing === 'Yes') {
      message = await getTextForFunction('Evaluate-Answers', event.Channel)

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
            redirect: `${process.env.ASSESMENT_API}/Questions3`
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
