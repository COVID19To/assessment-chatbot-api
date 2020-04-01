exports.handler = function (context, event, callback) {
  let responseObject = {}
  const memory = JSON.parse(event.Memory)
  const options = memory.twilio.collected_data.ask_questions.answers.Menu.answer || '5'
  let redirectask = []
  switch (options) {
    case '1':
      redirectask = `${process.env.ASSESMENT_API}/newsupdate`
      break
    case '2':
      redirectask = `${process.env.ASSESMENT_API}/Questions1`
      break
    case '3':
      redirectask = `${process.env.ASSESMENT_API}/selfisolation`
      break
    case '4':
      redirectask = `${process.env.ASSESMENT_API}/safetytips`
      break
    default:
      redirectask = `${process.env.ASSESMENT_API}/goodbye`
  }

  responseObject = {
    actions: [{
      redirect: redirectask
    },
    {
      listen: false
    }
    ]
  }

  callback(null, responseObject)
}
