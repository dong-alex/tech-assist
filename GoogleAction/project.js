// ------------------------------------------------------------------
// JOVO PROJECT CONFIGURATION
// ------------------------------------------------------------------

module.exports = {
    alexaSkill: {
       nlu: 'alexa',
    },
    googleAction: {
      nlu: 'dialogflow',
      dialogflow: {
        projectId: 'hacked2020-algos-658cc',
        keyFile: './hacked2020customintent.json'
      }
    },
    endpoint: '${JOVO_WEBHOOK_URL}',
};
 