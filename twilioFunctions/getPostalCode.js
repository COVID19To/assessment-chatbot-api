const { getTextForFunction } = require('../lib/index')

exports.handler = async function (context, event, callback) {
  const message = await getTextForFunction('getPostalCode')
  const questions = [
    {
      question: {
        say: message
      },
      name: 'PostalCode'
    }
  ]
  const responseObject = {
    actions: [
      {
        collect: {
          name: 'ask_questions',
          questions: questions,
          on_complete: {
            redirect: `${process.env.ASSESMENT_API}/nearestCenter`
          }
        }
      }]
  }
  callback(null, responseObject)
}
