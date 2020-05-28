module.exports = (router) => {
  // getHospitalPostalCode
  router.post('/getHospitalPostalCode', async (req, res) => {
    const postalCode = req.body.postalCode
    // Pushing into Twilio format
    const mem = JSON.stringify({
      twilio: {
        collected_data: {
          ask_questions: {
            answers: {
              HPostalCode: {
                answer: postalCode
              }
            }
          }
        }
      }
    })

    const event = {
      Memory: mem
    }
    const callback = (err, respond) => {
      if (err) res.send(err)
      res.send(respond)
    }
    const { handler } = require('./twilioFunctions/getHospitalPostalCode')
    handler(null, event, callback)
  })
  router.post('/nearestHospital', async (req, res) => {
    const postalCode = req.body.postalCode
    // Pushing into Twilio format
    const mem = JSON.stringify({
      twilio: {
        collected_data: {
          ask_questions: {
            answers: {
              HPostalCode: {
                answer: postalCode
              }
            }
          }
        }
      }
    })

    const event = {
      Memory: mem
    }
    const callback = (err, respond) => {
      if (err) res.send(err)
      res.send(respond)
    }
    const { handler } = require('./twilioFunctions/nearestHospital')
    handler(null, event, callback)
  })

  router.get('/infoRoute', async (req, res) => {
    const event = {
    }
    const callback = (err, respond) => {
      if (err) res.send(err)
      res.send(respond)
    }
    const { handler } = require('./twilioFunctions/informationRoute')
    handler(null, event, callback)
  })

  router.post('/triage1', async (req, res) => {
    const breathing = req.body.breathing
    const Language = req.body.Language

    const mem = JSON.stringify({
      twilio: {
        collected_data: {
          ask_questions: {
            answers: {
              Breathing: {
                answer: breathing
              },
              Language: {
                answer: Language
              }
            }
          }
        }
      }
    })

    const event = { Memory: mem }

    const callback = (err, respond) => {
      if (err) res.send(err)
      res.send(respond)
    }

    const { handler } = require('./twilioFunctions/triage1')
    handler(null, event, callback)
  })

  router.post('/triage2', async (req, res) => {
    const breathing = req.body.breathing

    const mem = JSON.stringify({
      twilio: {
        collected_data: {
          ask_questions: {
            answers: {
              Breathing: {
                answer: breathing
              }
            }
          }
        }
      }
    })

    const event = { Memory: mem }

    const callback = (err, respond) => {
      if (err) res.send(err)
      res.send(respond)
    }

    const { handler } = require('./twilioFunctions/triage2')
    handler(null, event, callback)
  })

  router.post('/triage3', async (req, res) => {
    const breathing = req.body.breathing

    const mem = JSON.stringify({
      twilio: {
        collected_data: {
          ask_questions: {
            answers: {
              Breathing: {
                answer: breathing
              }
            }
          }
        }
      }
    })

    const event = { Memory: mem }

    const callback = (err, respond) => {
      if (err) res.send(err)
      res.send(respond)
    }

    const { handler } = require('./twilioFunctions/triage3')
    handler(null, event, callback)
  })

  router.post('/triage4', async (req, res) => {
    const breathing = req.body.breathing

    const mem = JSON.stringify({
      twilio: {
        collected_data: {
          ask_questions: {
            answers: {
              Breathing: {
                answer: breathing
              }
            }
          }
        }
      }
    })

    const event = { Memory: mem }

    const callback = (err, respond) => {
      if (err) res.send(err)
      res.send(respond)
    }

    const { handler } = require('./twilioFunctions/triage4')
    handler(null, event, callback)
  })

  router.get('/Questions1', async (req, res) => {
    const event = {
    }
    const callback = (err, respond) => {
      if (err) res.send(err)
      res.send(respond)
    }
    const { handler } = require('./twilioFunctions/Questions1')
    handler(null, event, callback)
  })

  router.get('/Questions2', async (req, res) => {
    const event = {
    }
    const callback = (err, respond) => {
      if (err) res.send(err)
      res.send(respond)
    }
    const { handler } = require('./twilioFunctions/Questions2')
    handler(null, event, callback)
  })

  router.get('/Questions3', async (req, res) => {
    const event = {
    }
    const callback = (err, respond) => {
      if (err) res.send(err)
      res.send(respond)
    }
    const { handler } = require('./twilioFunctions/Questions3')
    handler(null, event, callback)
  })

  router.get('/Questions4', async (req, res) => {
    const event = {
    }
    const callback = (err, respond) => {
      if (err) res.send(err)
      res.send(respond)
    }
    const { handler } = require('./twilioFunctions/Questions4')
    handler(null, event, callback)
  })

  router.get('/possibleTest', async (req, res) => {
    const event = {
    }
    const callback = (err, respond) => {
      if (err) res.send(err)
      res.send(respond)
    }
    const { handler } = require('./twilioFunctions/possibleTest')
    handler(null, event, callback)
  })

  router.get('/collectfallback', async (req, res) => {
    const event = {
    }
    const callback = (err, respond) => {
      if (err) res.send(err)
      res.send(respond)
    }
    const { handler } = require('./twilioFunctions/collectfallback')
    handler(null, event, callback)
  })

  router.get('/greetings', async (req, res) => {
    const Language = req.body.Language
    const mem = JSON.stringify({
      twilio: {
        collected_data: {
          ask_questions: {
            answers: {
              Language: {
                answer: Language
              }
            }
          }
        }
      }
    })

    const event = { Memory: mem }
    const callback = (err, respond) => {
      if (err) res.send(err)
      res.send(respond)
    }
    const { handler } = require('./twilioFunctions/greetings')
    handler(null, event, callback)
  })

  router.post('/newsupdate', async (req, res) => {
    const Language = req.body.Language

    const mem = JSON.stringify({
      twilio: {
        collected_data: {
          ask_questions: {
            answers: {
              Language: {
                answer: Language
              }
            }
          }
        }
      }
    })

    const event = { Memory: mem }

    const callback = (err, respond) => {
      if (err) res.send(err)
      res.send(respond)
    }

    const { handler } = require('./twilioFunctions/newsupdate')
    handler(null, event, callback)
  })

  router.post('/languagemenuoptions', async (req, res) => {
    const Language = req.body.Language

    const mem = JSON.stringify({
      twilio: {
        collected_data: {
          ask_questions: {
            answers: {
              Language: {
                answer: Language
              }
            }
          }
        }
      }
    })

    const event = { Memory: mem }

    const callback = (err, respond) => {
      if (err) res.send(err)
      res.send(respond)
    }

    const { handler } = require('./twilioFunctions/languagemenuoptions')
    handler(null, event, callback)
  })

  router.post('/menuoptions', async (req, res) => {
    const Menu = req.body.Menu
    const mem = JSON.stringify({
      twilio: {
        collected_data: {
          ask_questions: {
            answers: {
              Menu: {
                answer: Menu
              }
            }
          }
        }
      }
    })

    const event = { Memory: mem }

    const callback = (err, respond) => {
      if (err) res.send(err)
      res.send(respond)
    }

    const { handler } = require('./twilioFunctions/menuoptions')
    handler(null, event, callback)
  })

  router.post('/getNearestCasesPostalCode', async (req, res) => {
    const { body: { postalCode } } = req

    console.log(postalCode)

    // Pushing into Twilio format
    const mem = JSON.stringify({
      twilio: {
        collected_data: {
          ask_questions: {
            answers: {
              Language: {
                answer: 1
              },
              NCPostalCode: {
                answer: postalCode
              }
            }
          }
        }
      }
    })

    const event = {
      Memory: mem
    }
    const callback = (err, respond) => {
      if (err) res.send(err)
      res.send(respond)
    }
    const { handler } = require('./twilioFunctions/getNearestCasesPostalCode')
    handler(null, event, callback)
  })

  router.post('/nearestCases', async (req, res) => {
    const { body: { postalCode } } = req
    // Pushing into Twilio format
    const mem = JSON.stringify({
      twilio: {
        collected_data: {
          ask_questions: {
            answers: {
              NCPostalCode: {
                answer: postalCode
              }
            }
          }
        }
      }
    })

    const event = {
      Memory: mem
    }
    const callback = (err, respond) => {
      if (err) res.send(err)
      res.send(respond)
    }
    const { handler } = require('./twilioFunctions/nearestCases')
    handler(null, event, callback)
  })

  // New Cases Update Route
  router.post('/nearestCasesUpdates', async (req, res) => {
    const { body: { postalCode } } = req
    const mem = JSON.stringify({
      twilio: {
        collected_data: {
          ask_questions: {
            answers: {
              NCPostalCode: {
                answer: postalCode
              }
            }
          }
        }
      }
    })

    const event = {
      Memory: mem
    }
    const callback = (err, respond) => {
      if (err) res.send(err)
      res.send(respond)
    }
    const { handler } = require('./twilioFunctions/nearestCasesUpdates')
    handler(null, event, callback)
  })

  // New Cases Status Update Route => called by cron job & calls nearestCasesUpdates route
  router.post('/newCasesStatusUpdates', async (req, res) => {
    const callback = (err, respond) => {
      if (err) res.send(err)
      res.send(respond)
    }
    const { handler } = require('./twilioFunctions/newCasesStatusUpdates')
    handler(null, {}, callback)
  })
}
