const axios = require('axios')
const { getNewCasesActiveSubscribers } = require('../lib')
const { logger } = require('../constants')

exports.handler = async (context, event, callback) => {
  try {
    // Create a function to get total new cases  (fatal & unresolved [Today vs Yesterday])
    const subscribers = getNewCasesActiveSubscribers()
    const responseFirst = []

    subscribers.map(async ({ Subscriber, PostalCode }, index) => {
      const response = await axios({
        method: 'post',
        url: '/nearestCasesUpdates',
        data: {
          event: {
            UserIdentifier: Subscriber,
            Memory: JSON.stringify({
              twilio: {
                collected_data: {
                  ask_questions: {
                    answers: {
                      NCPostalCode: {
                        answer: PostalCode
                      }
                    }
                  }
                }
              }
            })
          }
        }
      })
      if (index === 0) {
        responseFirst.push(response)
      }
    })

    const responseObject = {
      actions: [
        {
          responseFirst
        }
      ]
    }

    callback(null, responseObject)
  } catch (e) {
    logger.log(e)
    callback(e)
  }
}
