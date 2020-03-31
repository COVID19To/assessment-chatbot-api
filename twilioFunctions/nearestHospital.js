const { getTop3Centers, defaultHospitalCodeTxt, getTextForFunction } = require('../lib')
const { hospitalTable } = require('../constants')
const { logger } = require('../constants')
exports.handler = async (context, event, callback) => {
  try {
    let responseObject = {}
    const memory = JSON.parse(event.Memory)
    const postalCode =
    memory.twilio.collected_data.ask_questions.answers.HPostalCode.answer

    const top3 = await getTop3Centers(hospitalTable, postalCode)
    const startTxt = await getTextForFunction('getHospitalDetails', event.Channel)
    const result = await defaultHospitalCodeTxt(
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
          redirect: `${process.env.ASSESMENT_API}/informationRoute`
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
