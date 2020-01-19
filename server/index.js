const express = require("express");
const fs = require("fs");
const speech = require("@google-cloud/speech");

const app = express();
const port = 8000;

const client = new speech.SpeechClient();

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
    const [response] = await client.recognize(request);
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
