exports.handler = function (context, event, callback) {
  let responseObject = {}
  const memory = JSON.parse(event.Memory)
  const options = memory.twilio.collected_data.ask_questions.answers.Menu.answer.toString().toLowerCase()

  callback(null, [options, memory.twilio.collected_data.ask_questions.answers.Menu.answer])

  let redirectask = []
  switch (options) {
    case '1':
    case 'latest numbers':
      redirectask = `${process.env.ASSESMENT_API}/newsupdate`
      break
    case '2':
    case 'self assessment':
      redirectask = `${process.env.ASSESMENT_API}/Questions1`
      break
    case '3':
    case 'isolation tips':
      redirectask = `${process.env.ASSESMENT_API}/selfisolation`
      break
    case '4':
    case 'prevention tips':
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
