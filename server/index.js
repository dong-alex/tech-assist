const express = require("express");
const fs = require("fs");
var cors = require("cors");
const speech = require("@google-cloud/speech");
const axios = require("axios");
const { runSample, client } = require("./SheetsClient");

const app = express();
app.use(cors());
const port = 8000;
const SPREADSHEET_ID = "10oX-86DeSJPXBuIJdhJr_744ccdZAX5yrM6si_Jhj8E";
const GOOGLE_BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}`;
const API_KEY = "AIzaSyC9ovMWO6Iobe5mZWozI67Qq1iBWQdOnTM";
const speechClient = new speech.SpeechClient();
const scopes = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/spreadsheets"
];
async function transcribe() {
  console.log("Transcription started");
  const fileName = "./test-record.flac"; // TODO - pull file that is given from somewhere

  // Reads a local audio file and converts it to base64
  const file = fs.readFileSync(fileName);
  const audioBytes = file.toString("base64");

  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
  const audio = {
    content: audioBytes
  };
  const config = {
    encoding: "FLAC", // TODO - need a different encoding
    languageCode: "en-US",
    audioChannelCount: 2, // dependant on the Mac versions
    enableSeparateRecognitionPerChannel: true
  };
  const request = {
    audio: audio,
    config: config
  };

  try {
    const [response] = await speechClient.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join("\n");
    console.log(`Transcription: ${transcription}`);
  } catch (err) {
    console.log(err);
  }
}

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/speech", (req, res) => {
  transcribe().then(transcription => {
    return res.send(transcription);
  });
});

app.get("/submit", (req, res) => {
  console.log("posting");
  axios
    .get(`${GOOGLE_BASE_URL}&fields=sheets.properties?key=${API_KEY}`)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/test", (req, res) => {
    runSample(SPREADSHEET_ID, "A3:A4").then((res) => {console.log(res)})
      .catch(console.error);
  // runSample(SPREADSHEET_ID, "A3:A5")
  //   .then(response => {
  //     console.log(response);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
