const { getTextForFunction } = require('../lib/index')
const { logger } = require('../constants')
exports.handler = async function (context, event, callback) {
  try {
    const message = await getTextForFunction('Information_Router', 'SMS')
    const responseObject = {
      actions: [
        {
          say: message
        },
        {
          listen: {
            voice_digits: {
              redirects: {
                0: 'task://LanguageSelection',
                1: 'task://newsupdate',
                2: 'task://questions',
                3: 'task://self-isolation',
                4: 'task://safety-tips',
                5: 'task://goodbye'
              },
              finish_on_key: '#',
              num_digits: 1
            }
          }
        }
      ]
    }
    callback(null, responseObject)
  } catch (e) {
    logger.log(e)
    callback(e)
  }

  // Current PRod
  // [
  //   {
  //     say: 'For COVID-19 News Update Text 1. \r For COVID-19 Triage Text 2. \r For COVID-19 Self-isolation Text 3. \r For COVID-19 Prevention Tips Text 4. \r For Exit Text 5.'
  //   },
  //   {
  //     listen: {
  //       voice_digits: {
  //         redirects: {
  //           1: 'task://newsupdate',
  //           2: 'task://questions',
  //           3: 'task://self-isolation',
  //           4: 'task://safety-tips',
  //           5: 'task://goodbye'
  //         },
  //         finish_on_key: '#',
  //         num_digits: 1
  //       }
  //     }
  //   }
  // ]
}
