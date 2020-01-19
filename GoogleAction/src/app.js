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

const QUESTION_INDEX = 0;
const CORRECT_INDEX = 1;
const WRONG_INDEX = [2,3,4];
const CORRECT_ANS = ["A","B","C","D"]

var correctAnswer;
var questionList;
var numCorrect;
var numAsked;

app.use(
    new Alexa(),
    new GoogleAssistant(),
    new JovoDebugger(),
    new FileDb(),
    new GoogleSheetsCMS()
);


function shuffleArray(a) { // Fisher-Yates shuffle, no side effects
    var i = a.length, t, j;
    a = a.slice();
    while (--i) t = a[i], a[i] = a[j = ~~(Math.random() * (i+1))], a[j] = t;
    return a;
}

// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
    LAUNCH() {
        var length = this.$cms.question.length;
        questionList = shuffleArray([...Array(length).keys()])
        numCorrect = 0;
        numAsked = 0;
        return this.toIntent('MockExam');
    },

    HelloWorldIntent() {
        this.ask('Here we go!');
    },

    MockExam() {
        
        // Start the question index
        this.$session.$data.questionIndex = questionList[0];
        questionList.shift()
        numAsked++;

        var choice = shuffleArray([0,1,2,3]);
        var correct = choice[0];
        var wrong = choice.slice(1, 4);

        var assign = ["a","b","c","d"];

//        assign[wrong[0]] = this.$cms.question[1][1]
/*
        var test = this.$cms.question[0][2];
        //this.tell(test);
        let speech = this.speechBuilder()
            .addText(this.$cms.question[1].Ques)
            .addText(this.$cms.question[1].Wrong1)
            .addText(this.$cms.question[1].Wrong3);
        console.log(this.$cms.question[0].Ques);
        //console.log(speech);
        this.tell(speech);
        for (var key in this.$cms.question[0]) {
            console.log(key + ' is ' + this.$cms.question[0][key]);
        }
        //this.tell(this.$cms.question);


        assign[correct] = this.$cms.question[1][1];
        assign[wrong[0]] = this.$cms.question[1][2];
        assign[wrong[1]] = this.$cms.question[1][3];
        assign[wrong[2]] = this.$cms.question[1][4];
*/

        // Grab all content from the question entry
        let questionIndex = this.$session.$data.questionIndex;

        assign[correct] = this.$cms.question[questionIndex].Correct;

        correctAnswer = CORRECT_ANS[correct];

        assign[wrong[0]] = this.$cms.question[questionIndex].Wrong1;
        assign[wrong[1]] = this.$cms.question[questionIndex].Wrong2;
        assign[wrong[2]] = this.$cms.question[questionIndex].Wrong3;

        var Askquestion = this.$cms.question[questionIndex].Ques;
  
        // Build the speech being sent to google assist
        let speech = this.speechBuilder()
            .addText('The question is ')
            .addBreak('300ms')
            .addText(Askquestion)
            .addBreak('300ms')
            .addText("Your choices are")
            .addBreak('300ms')
            .addText("A.")
            .addBreak('300ms')
            .addText(assign[0])
            .addText("B. ")
            .addBreak('300ms')
            .addText(assign[1])
            .addBreak('300ms')
            .addText("C. ")
            .addBreak('300ms')
            .addText(assign[2])
            .addBreak('300ms')
            .addText("D. ")
            .addBreak('300ms')
            .addText(assign[3])
            .addBreak('300ms');

        this.ask(speech);

        
        //this.tell(this.t('welcome.speech')); 
        //this.$cms.reply[1][1] = "No"
    
    },
    QuestionReply(){
        if (this.$inputs.letter.value.toLowerCase() == correctAnswer.toLowerCase()){
            if (questionList === undefined || questionList.length == 0){
                this.tell("You are correct! It is " +  this.$inputs.letter.value + " \nYou completed all the questions!");
                numCorrect++;
            } else {
                this.ask("You are correct! It is " +  this.$inputs.letter.value + " \nWould you like to continue?");
                numCorrect++;
            }

        } else {
            if (questionList === undefined || questionList.length == 0){
                this.tell("You are correct! It is " +  correctAnswer + " \nYou completed all the questions!");
            } else {
                this.ask("You were incorrect. It is " +  correctAnswer + " \nWould you like to continue?");
            }
  
        }

        
    },

    YesIntent() {
        return this.toIntent('MockExam');
    },

    NoIntent() {
        return this.toIntent('END');
    },

    END(){
        this.tell("Training is over. Your score is " + numCorrect + " / " + numAsked);
    },
});

module.exports.app = app;

