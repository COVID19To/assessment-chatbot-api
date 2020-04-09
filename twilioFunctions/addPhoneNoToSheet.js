const { format } = require('date-fns')

const {
  getTextForFunction,
  addNumberToGoogleSheet
} = require('../lib')
const { logger } = require('../constants')
const { setLanguageOptions } = require('../lib')

const addPhoneNoToSheet = async (context, event, callback) => {
  try {
    let responseObject = {}
    const phoneNumber = event.UserIdentifier
    const memory = JSON.parse(event.Memory)

    // Call function to add number into Google Sheet
    const options =
       memory.twilio.collected_data.ask_questions.answers.Language.answer || '1'

    const EvaluateProvider = memory.twilio.collected_data.ask_questions.answers.EvaluateProvider.answer.toString().toLowerCase()
    const { Language } = setLanguageOptions(options)
    if (EvaluateProvider === 'yes') {
      await addNumberToGoogleSheet({
        reqOn: format(new Date(), 'MM/dd/yyyy@HH:MM'), // eslint-disable-line quote-props
        number: phoneNumber,
        callbackStatus: '',
        contactedOn: ''
      })
      const responseTxt = await getTextForFunction('EvaluateProvider', event.Channel, 'Both', Language)
      responseObject = {
        actions: [
          {
            say: responseTxt
          },
          {
            redirect: `${process.env.ASSESMENT_API}/menu`
          },
          {
            listen: false
          }
        ]
      }
    } else {
      const message = await getTextForFunction('Goodbye', event.Channel, 'Both', Language)
      responseObject = {
        actions: [
          {
            say: message
          }
        ]
      }
    }

    callback(null, responseObject)
  } catch (e) {
    console.log(e)
    logger.log(e)
    callback(e)
  }
}

exports.handler = addPhoneNoToSheet
