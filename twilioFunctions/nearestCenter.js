const { getTop3Centers, defaultAssementCodeTxt, getTextForFunction } = require('../lib')
const { centerTable, logger } = require('../constants')
const nearestCenter = async (context, event, callback) => {
  try {
    let responseObject = {}
    const memory = JSON.parse(event.Memory)
    const postalCode = memory.twilio.collected_data.ask_questions.answers.PostalCode.answer
    const Language = memory.twilio.collected_data.ask_questions.answers.Language.answer || '1'

    const top3 = await getTop3Centers(centerTable, postalCode)
    const startTxt = await getTextForFunction('getCenterDetails', event.Channel, 'Both', Language)
    const result = await defaultAssementCodeTxt(
      startTxt,
      top3,
      event.Channel
    )
    responseObject = {
      actions: [
        {
          say: result
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

exports.handler = nearestCenter
