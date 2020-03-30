const { getTextForFunction } = require('../lib/index')

exports.handler = async function (context, event, callback) {
  try {
    const message = await getTextForFunction('Goodbye')

    const responseObject = {
      actions: [
        {
          say: message
        }
      ]
    }
    callback(null, responseObject)
  } catch (e) {
    rollbar.log(e)
    callback(e)
  }
}
