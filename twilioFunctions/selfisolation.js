const { getTextForFunction } = require('../lib/index')
const { logger } = require('../constants')
exports.handler = async function (context, event, callback) {
  try {
    const message = await getTextForFunction('Self-Isolation', event.Channel)

    const responseObject = {
      actions: [
        {
          say: message
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
