import axios from "axios";
import React, { useState, useEffect } from "react";

const speech = require("@google-cloud/speech");
const fs = require("fs");
const auth = require('google-auth-library');

const initializeClient = async () => {
  const keyPath = "../../../../oauth2.keys.json";
  let keys = { redirect_uris: [""] }
  if (fs.existsSync(keyPath)) {
    keys = require(keyPath).web;
  }

  /**
   * Create a new OAuth2 client with the configured keys.
   */
  const oauth2client = new auth.OAuth2(keys.client_id, keys.client_secret, keys.redirect_uris[0]);
  // redirect user to authUrl and wait for them coming back to callback_uri

  // in callback_uri handler, get the auth code from query string and obtain a token:
  const tokenResponse = await oauth2client.getToken(code);
  oauth2client.setCredentials(tokenResponse.tokens);

  const client = new speech.SpeechClient({ auth: oauth2client });
  return client;
}


const useGoogleService = async () => {

  let client;

  const translateSpeechToText = async () => {
    // The name of the audio file to transcribe
    const fileName = "./test-record.flac";

    // Reads a local audio file and converts it to base64
    const file = fs.readFileSync(fileName);
    const audioBytes = file.toString("base64");

    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    const audio = {
      content: audioBytes
    };
    const config = {
      encoding: "FLAC",
      languageCode: "en-US",
      audioChannelCount: 2,
      enableSeparateRecognitionPerChannel: true
    };
    const request = {
      audio: audio,
      config: config
    };

    // Detects speech in the audio file
    try {
      const [response] = await client.recognize(request);
      const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join("\n");
      console.log(`Transcription: ${transcription}`);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    translateSpeechToText
  };
};

export default useGoogleService;
