// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

const axios = require('axios')

var bodyParser = require('body-parser')
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/similarweb', function(request, response) {
  console.log(request.query)
  
  var API_URL = `https://api.similarweb.com/v1/website/` + request.query.url + `/global-rank/global-rank?api_key=14059f6bb1d14db28f7fcdef0d761802`
  console.log(API_URL)
  
  return axios.get(API_URL).then(function(response){
    console.log(response.data)
    return response.data;
  }).then(function(json){
    return response.json(json)
  })
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
