const { getNewCasesActiveSubscribers } = require('../lib/index')
const { logger } = require('../constants')

exports.handler = async function (context, event, callback) {
  try {
    const responseObject = {
      actions: [
        {
          subscribers: await getNewCasesActiveSubscribers()
        }]
    }
    callback(null, responseObject)
  } catch (e) {
    logger.log(e)
    callback(e)
  }
}
