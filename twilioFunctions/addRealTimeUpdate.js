const axios = require('axios')
const Papa = require('papaparse')
const { format, parseISO } = require('date-fns')
const { frCA } = require('date-fns/locale')
const { messageTableDB } = require('../constants')

exports.handler = async function (context, event, callback) {
  try {
    const { data: updateTimeCsv } = await axios.get('https://health-infobase.canada.ca/src/data/covidLive/covid19-updateTime.csv')
    const { data: updateTime } = Papa.parse(updateTimeCsv, { header: true })
    const updateKey = (Array.isArray(updateTime) && updateTime.length > 0 && Object.keys(updateTime[0])[0]) || format(new Date(), 'YYY-MM-dd')
    const time = parseISO(updateKey)
    const { data: canadaDataCsv } = await axios.get('https://health-infobase.canada.ca/src/data/covidLive/covid19.csv')
    const { data: unFiltredCanadaData } = Papa.parse(canadaDataCsv, { header: true })
    const JSONCanada = {}
    unFiltredCanadaData.filter(d => d.date === format(time, 'dd-MM-YYY')).forEach(data => {
      const { numconf, prname } = data
      JSONCanada[prname] = { numconf }
    })

    const text = {
      french: `Au ${format(time, 'MMMM do hh:MM aaaa', { locale: frCA })}, ${JSONCanada.Ontario.numconf} cas confirmés en Ontario, ${JSONCanada['British Columbia'].numconf} cas en Colombie-Britannique,  ${JSONCanada.Alberta.numconf} cas en Alberta,  ${JSONCanada.Quebec.numconf} cas au Quebec, and  ${JSONCanada.Canada.numconf} cas confirmés au Canada.`,
      english: `As of ${format(time, 'MMMM do hh:MM aaa')}, ${JSONCanada.Ontario.numconf} confirmed cases in Ontario, ${JSONCanada['British Columbia'].numconf} cases in BC,  ${JSONCanada.Alberta.numconf} cases in Alberta,  ${JSONCanada.Quebec.numconf} Cases in Quebec, and  ${JSONCanada.Canada.numconf} confirmed cases in Canada.`
    }

    await messageTableDB.update({ Message: text.english }, {
      where: {
        Name: 'NewsUpdate',
        Language: 'English'
      }
    })

    await messageTableDB.update({ Message: text.french, BotType: 'Both' }, {
      where: {
        Name: 'NewsUpdate',
        Language: 'French'
      }
    })
    callback(null, text)
  } catch (e) {
    callback(e)
  }
}
