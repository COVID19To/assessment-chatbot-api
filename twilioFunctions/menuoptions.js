exports.handler = function (context, event, callback) {
  let responseObject = {}
  const memory = JSON.parse(event.Memory)
  const options = memory.twilio.collected_data.ask_questions.answers.Menu.answer.toString().toLowerCase().trim()
  const [split] = options.split(' ')

  let redirectask = []
  switch (split) {
    case '1':
    case 'latest':
      redirectask = `${process.env.ASSESMENT_API}/newsupdate`
      break
    case '2':
    case 'assessment':
      redirectask = `${process.env.ASSESMENT_API}/Questions1`
      break
    case '3':
    case 'isolation':
      redirectask = `${process.env.ASSESMENT_API}/selfisolation`
      break
    case '4':
    case 'prevention':
      redirectask = `${process.env.ASSESMENT_API}/safetytips`
      break
    case '5':
    case 'callback':
      redirectask = `${process.env.ASSESMENT_API}/addPhoneNoToSheet`
      break
    case '6':
    case 'exit':
      redirectask = `${process.env.ASSESMENT_API}/goodbye`
      break
    default:
      redirectask = `${process.env.ASSESMENT_API}/fallback`
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
