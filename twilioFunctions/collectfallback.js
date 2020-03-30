const { getTextForFunction } = require('../lib/index')
exports.handler = async function (context, event, callback) {
  try {
    const message = await getTextForFunction('Collect_Fallback', 'Both', 'English')
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
    rollbar.log(e)
    callback(e)
  }
}
