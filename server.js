// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
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

/*const appdata = [
]

//gets soonest dated task that has high priority
const getMin = function(array){
    let date = 10000;
    let indexPrev = [];
    for(let i = 0; i < array.length; i++){
        curDate = parseInt(array[i].dueDate)
        curPrior = array[i].priority
        if(curDate < date){
            if(curPrior === "high"){
                if(indexPrev.length > 0){
                    for(let j = 0; j < indexPrev.length; j++){
                        array[indexPrev[j]].urgent = 0
                    }
                    indexPrev = []
                }
                date = curDate
                indexPrev.push(i)
            }
        }
        else if(curDate === date){
            if(curPrior === "high"){
                indexPrev.push(i)
            }
        }
        console.log("indexPrev")
        console.log(indexPrev)
    }
    console.log("date")
    console.log(date)
    return date
}

const remove = function(array){
    const index = 0
    if(index > -1){
        array.splice(index, 1)
    }
    console.log(array)
}*/