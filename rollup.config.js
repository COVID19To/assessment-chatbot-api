import resolve from '@rollup/plugin-commonjs'
// to do: allow multiple entry and multipe output
export default [
  {
    input: 'twilioFunctions/addRealTimeUpdate',
    output: {
      file: 'functions/addRealTimeUpdate.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/addPhoneNoToSheet.js',
    output: {
      file: 'functions/addPhoneNoToSheet.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/nearestHospital.js',
    output: {
      file: 'functions/nearestHospital.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/triage1.js',
    output: {
      file: 'functions/triage1.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/Questions1.js',
    output: {
      file: 'functions/Questions1.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/safetytips.js',
    output: {
      file: 'functions/safetytips.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/selfisolation.js',
    output: {
      file: 'functions/selfisolation.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/newsupdate.js',
    output: {
      file: 'functions/newsupdate.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/triage4.js',
    output: {
      file: 'functions/triage4.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/triage3.js',
    output: {
      file: 'functions/triage3.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/triage2.js',
    output: {
      file: 'functions/triage2.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/Questions2.js',
    output: {
      file: 'functions/Questions2.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/Questions3.js',
    output: {
      file: 'functions/Questions3.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/Questions4.js',
    output: {
      file: 'functions/Questions4.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/greetings.js',
    output: {
      file: 'functions/greetings.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/collectfallback.js',
    output: {
      file: 'functions/collectfallback.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/fallback.js',
    output: {
      file: 'functions/fallback.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/goodbye.js',
    output: {
      file: 'functions/goodbye.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/getHospitalPostalCode.js',
    output: {
      file: 'functions/getHospitalPostalCode.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  // {
  //   input: 'twilioFunctions/possibleTest.js',
  //   output: {
  //     file: 'functions/possibleTest.js',
  //     format: 'cjs'
  //   },
  //   plugins: [resolve()]
  // },
  {
    input: 'twilioFunctions/menu.js',
    output: {
      file: 'functions/menu.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/menuoptions.js',
    output: {
      file: 'functions/menuoptions.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/languagemenu.js',
    output: {
      file: 'functions/languagemenu.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/languagemenuoptions.js',
    output: {
      file: 'functions/languagemenuoptions.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/getNearestCasesPostalCode.js',
    output: {
      file: 'functions/getNearestCasesPostalCode.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/nearestCases.js',
    output: {
      file: 'functions/nearestCases.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/nearestCasesUpdates.js',
    output: {
      file: 'functions/nearestCasesUpdates.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  },
  {
    input: 'twilioFunctions/getSubscriberData.js',
    output: {
      file: 'functions/getSubscriberData.js',
      format: 'cjs'
    },
    plugins: [resolve()]
  }
]
