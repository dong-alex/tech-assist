'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');
const { GoogleSheetsCMS } = require('jovo-cms-googlesheets');

const app = new App();

app.use(
    new Alexa(),
    new GoogleAssistant(),
    new JovoDebugger(),
    new FileDb(),
    new GoogleSheetsCMS()
);


// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
    LAUNCH() {
        return this.toIntent('MockInterview');
    },

    HelloWorldIntent() {
        this.ask('Here we go!');
    },

    MockInterview() {
    	
    	var cars = ["Saab", "Volvo", "BMW"];	
    	var randomItem = cars[Math.floor(Math.random()*cars.length)];
        //this.tell(randomItem);
        var speaking = this.$cms.reply[1][0] + " " + this.t('welcome.speech');
        this.ask(speaking);	
        this.$cms.reply[1][1] = "No"
    },
});

module.exports.app = app;
