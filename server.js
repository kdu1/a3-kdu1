// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use(cookieParser());

/*app.get("/", function(request, response) {
  //console.log(request.cookies);
  //console.log('Signed Cookies: ', request.signedCookies);
  response.sendFile(__dirname + "/views/login.html");
});*/

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  console.log(request.cookies);
  console.log('Signed Cookies: ', request.signedCookies);
  response.sendFile(__dirname + "/views/index.html");
});


// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://kdu1:a3Password123@cluster0.zjyldku.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

