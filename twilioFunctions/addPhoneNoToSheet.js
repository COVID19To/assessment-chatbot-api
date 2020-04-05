const {
  // getTextForFunction,
  addNumberToGoogleSheet
} = require('../lib')
const { logger } = require('../constants')
// const { setLanguageOptions } = require('../lib/index')

const addPhoneNoToSheet = async (context, event, callback) => {
  try {
    let responseObject = {}
    const phoneNumber = event.UserIdentifier
    // const memory = JSON.parse(event.Memory)
    // Call function to add number into Google Sheet
    console.log('add')
    const response = await addNumberToGoogleSheet({ serialNum: '1', phoneNumber, outreachStatus: 'no', assessmentStatus: 'no' })
    console.log('res', response)
    // const options = memory.twilio.collected_data.ask_questions.answers.Language.answer || '1'
    // const Language = setLanguageOptions(options)

    // const startTxt = await getTextForFunction('getCenterDetails', event.Channel, 'Both', Language)

    responseObject = {
      actions: [
        {
          say: `phone number is ${phoneNumber}`
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
    console.log(e)
    logger.log(e)
    callback(e)
  }
}

exports.handler = addPhoneNoToSheet
