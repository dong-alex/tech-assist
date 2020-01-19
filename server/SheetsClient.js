const { google } = require("googleapis");
const sampleClient = require("./sampleclient");

const SPREADSHEET_ID = "10oX-86DeSJPXBuIJdhJr_744ccdZAX5yrM6si_Jhj8E";

const sheets = google.sheets({
  version: "v4",
  auth: sampleClient.oAuth2Client
});

const scopes = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/spreadsheets"
];

async function runSample(spreadsheetId, range) {
  await sampleClient.authenticate(scopes);
  const res = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        ["Justin", "1/1/2001", "Website"],
        ["Node.js", "2018-03-14", "Fun"]
      ]
    }
  });
  return res.data;
}

module.exports = {
  runSample,
  client: sampleClient.oAuth2Client
};
