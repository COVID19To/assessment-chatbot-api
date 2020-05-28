const axios = require('axios')
const { getNewCasesActiveSubscribers } = require('../lib')
const { logger } = require('../constants')

const responseObject = {}

exports.handler = async (context, event, callback) => {
  try {
    // Create a function to get total new cases  (fatal & unresolved [Today vs Yesterday])
    const subscribers = getNewCasesActiveSubscribers()
    subscribers.map(({ Subscriber, PostalCode }) => {
      axios({
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
    })

    callback(null, responseObject)
  } catch (e) {
    logger.log(e)
    callback(e)
  }
}
