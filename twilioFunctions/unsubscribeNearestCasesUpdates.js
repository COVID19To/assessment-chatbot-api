const { nearestCasesResponse, setNewCasesSubscriberActive } = require('../lib')
const { logger } = require('../constants')

exports.handler = async (context, event, callback) => {
  try {
    let responseObject = {}
    const memory = JSON.parse(event.Memory)
    const phoneNumber = event.UserIdentifier
    const options = memory.twilio.collected_data.ask_questions.answers.Language.answer || '1'

    const { Language } = setLanguageOptions(options)
   
    setNewCasesSubscriberActive(phoneNumber, 0)
    const message = await getTextForFunction('unsubscribeNearestCasesUpdates', event.Channel, 'SMS', Language)

    responseObject = {
      actions: [
        {
          say: message
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
