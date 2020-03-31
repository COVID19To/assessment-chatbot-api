const { getTextForFunction } = require('../lib/index')
const { logger } = require('../constants')

exports.handler = async function (context, event, callback) {
  try {
    const message = await getTextForFunction('Goodbye', event.Channel)

    const responseObject = {
      actions: [
        {
          say: message
        }
      ]
    }
    callback(null, responseObject)
  } catch (e) {
    logger.log(e)
    callback(e)
  }
}
