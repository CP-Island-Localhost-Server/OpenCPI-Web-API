require('dotenv').config()
const express = require('express');
const fs = require('fs');
const crypto = require('crypto');

const database = require('./database.js');
const tokens = require("./tokens.js");
const { debug } = require('console');

const app = express()
const port = 3100

database.createDBTablesAndExstentions();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json()) 

app.use((req, res, next) => {
  console.log("url: "+req.url);
  var body = undefined;
  if (req.body != undefined)
  {
    body = JSON.stringify(req.body);
  }
  console.log("body: "+body);
  console.log("headers: "+req.rawHeaders);
  next();
});

app.get('/jgc/v5/client/:client_id/configuration/site', (req, res) => {
  fs.readFile('./json_blobs/website_configuration.json', (err, json) => {
    let obj = JSON.parse(json);
    res.json(obj);
  });
});

app.post('/jgc/v5/client/:client_id/api-key', (req, res) => {
  res.header("api-key", "aqnA9p/GHYcMJnHGPld3WUYS6xVbbkaizQIgUOXxUTV1ty0kGcIvQkRHMBiO89jAF+h6Bp6jWCj0KDdy71nsYSAhDpDV/5Y9AYDhQ/2efdB5XCWilW5q2g==");
  res.send({"data":null,"error":null});
});

app.post('/registration/text', (req, res) => {
  fs.readFile('./json_blobs/tos.json', (err, json) => {
    let obj = JSON.parse(json);
    res.json(obj);
  });
});

//TODO: implement validation for password
app.post('/jgc/v5/client/:client_id/validate', (req, res) => {
  console.log("HELLO?!?!");
  var sucess = {};
  sucess.data = null;
  sucess.error = null;
  res.json(sucess);
});

app.post('/jgc/v5/client/:client_id/guest/register', (req, res) => {
  var username = req.body.profile.username;
  var password = req.body.password;
  var firstName = req.body.profile.firstName;
  var parentEmail = req.body.profile.parentEmail;
  var userID = crypto.hash('sha256', crypto.randomBytes(64));

  var accessToken = tokens.generateJwtToken(userID, parentEmail);
  var refreshToken = tokens.generateRefreshToken();

  //save the token?

  database.createUser(username, password, firstName, parentEmail, userID, refreshToken);

  var data = {};
  data.message = 'User registered successfully'
  data.accessToken = accessToken;
  data.refreshToken = refreshToken;
  console.log("token: "+accessToken)
  console.log("refresh: "+refreshToken)

  /*data.idToken = idToken;
  data.refreshToken = refreshToken;
  data.userID = userID;*/

  /*data.etag = crypto.randomBytes(64);
  data.profile = req.body.profile;
  data.marketing = [];

  var token = {};
  token.access_token = accessToken;
  token.refresh_token = refreshToken;
  token.swid = crypto.randomBytes(64);

  data.token = token;

  var displayName = {};
  displayName.displayName = username;
  displayName.moderatedStatusDate = null;
  displayName.proposedDisplayName = username;
  displayName.proposedStatus = "fine"

  data.displayName = displayName;*/

  res.status(201).json(data)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})