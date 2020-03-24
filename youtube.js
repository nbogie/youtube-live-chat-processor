const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/youtube.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";

// Load client secrets from a local file.
fs.readFile("credentials.json", (err, content) => {
  if (err) return console.log("Error loading client secret file:", err);
  // Authorize a client with credentials, then call the Google Apps Script API.
  authorize(JSON.parse(content), listLiveChatMessages);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("Enter the code from that page here: ", code => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

// Make sure the client is loaded and sign-in is complete before calling this method.
function listLiveChatMessages(auth) {
  const youtubeAPI = google.youtube({ version: "v3", auth });

  return youtubeAPI.liveChatMessages
    .list({
      liveChatId:
        "Cg0KC2hPM0VXYkc4MzJZKicKGFVDTy1objlNSk91N3BPVWRHU2FiS0d2QRILaE8zRVdiRzgzMlk",
      part: "snippet,authorDetails"
    })
    .then(
      function(response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", JSON.stringify(response, null, 2));

        //        JSON.stringify(response.result.items, null, 2);
      },
      function(err) {
        console.error("Execute error", err);
      }
    );
}

// Make sure the client is loaded and sign-in is complete before calling this method.
function listActiveBroadcasts(auth) {
  const youtubeAPI = google.youtube({ version: "v3", auth });

  return youtubeAPI.liveBroadcasts
    .list({
      part: "snippet,contentDetails,status",
      broadcastStatus: "active",
      broadcastType: "all"
    })
    .then(
      function(response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", JSON.stringify(response, null, 2));

        //        JSON.stringify(response.result.items, null, 2);
      },
      function(err) {
        console.error("Execute error", err);
      }
    );
}

// Make sure the client is loaded and sign-in is complete before calling this method.
function listAllBroadcasts(auth) {
  const youtubeAPI = google.youtube({ version: "v3", auth });

  return youtubeAPI.liveBroadcasts
    .list({
      part: "snippet,contentDetails,status",
      broadcastStatus: "all",
      broadcastType: "all"
    })
    .then(
      function(response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", JSON.stringify(response, null, 2));

        //        JSON.stringify(response.result.items, null, 2);
      },
      function(err) {
        console.error("Execute error", err);
      }
    );
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function listLiveBroadcastByID(auth) {
  const youtubeAPI = google.youtube({ version: "v3", auth });

  return youtubeAPI.liveBroadcasts
    .list({
      part: "snippet,contentDetails,status",
      id: "hO3EWbG832Y" //TODO: this should be BROADCAST_ID
    })
    .then(
      function(response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", JSON.stringify(response, null, 2));

        //        JSON.stringify(response.result.items, null, 2);
      },
      function(err) {
        console.error("Execute error", err);
      }
    );
}

// Make sure the client is loaded and sign-in is complete before calling this method.
function listVideoById(auth) {
  const youtubeAPI = google.youtube({ version: "v3", auth });

  return youtubeAPI.videos
    .list({
      part: "snippet,contentDetails,statistics",
      id: "hO3EWbG832Y"
      //id: "ttGFes_WzDg"
    })
    .then(
      function(response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", JSON.stringify(response, null, 2));

        //        JSON.stringify(response.result.items, null, 2);
      },
      function(err) {
        console.error("Execute error", err);
      }
    );
}
