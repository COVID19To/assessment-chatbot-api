const { getTextForFunction } = require('../lib/index')
const { logger } = require('../constants')
exports.handler = async function (context, event, callback) {
  try {
    const memory = JSON.parse(event.Memory)
    const Language = memory.twilio.collected_data.ask_questions.answers.Language.answer || '1'
    const message = await getTextForFunction('Self-Isolation', event.Channel, 'Both', Language)

    const responseObject = {
      actions: [
        {
          say: message
        },
        {
          redirect: `${process.env.ASSESMENT_API}/menu`
        },
        {
          listen: false
        }
      ]
    }
    callback(null, responseObject)
  } catch (e) {
    logger.log(e)
    callback(e)
  }
}
