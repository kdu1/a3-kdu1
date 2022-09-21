// server.js
// where your node app starts

// init project
const express = require("express")
const cookie = require("cookie-session")
const mongodb = require( 'mongodb' )
const hbs     = require( 'express-handlebars' ).engine
const app = express()

// http://expressjs.com/en/starter/static-files.html
app.use("/", express.static("public"))
app.use("/", express.static("views"))
//app.use(express.json())

app.engine( 'handlebars',  hbs() )
app.set(    'view engine', 'handlebars' )
app.set(    'views',       './views' )

const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = "mongodb+srv://kdu1:a3Password123@cluster0.zjyldku.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
client.connect(err => {
  const collection = client.db("test").collection("devices")
  // perform actions on the collection object
  client.close()
});


//var bodyParser = require('body-parser');

app.use( express.urlencoded({ extended:true }) )

app.use( cookie({
  name: 'session',
  keys: ['key1', 'key2']
}))


app.post( '/login', (req,res)=> {
  // express.urlencoded will put your key value pairs 
  // into an object, where the key is the name of each
  // form field and the value is whatever the user entered
  //console.log( req.body.password)
  // below is *just a simple authentication example* 
  // for A3, you should check username / password combos in your database
      let collection = null
      let data = null

      client.connect()
      .then( () => {
        // will only create collection if it doesn't exist
        return client.db( 'database1' ).collection( 'collection1' )
      })
      .then (__collection => {
        collection = __collection    
        hasUser = collection.find({'username' : req.body.username}).toArray()
        return hasUser
      })
      .then( /*__collection*/__hasUser => {
        // store reference to collection
        //collection = __collection
        if(__hasUser.length === 0){
            console.log("Account does not exist. Creating new account.") //TODO: Make visible to user
            //add account
            collection.insertOne( req.body )//.then( result => res.json( result )) //why does it jump to the JSON tho
        
        }
        //allTheItems = collection.find({ }).toArray()
        data = collection.find({ 'password' : req.body.password, 'username' : req.body.username}).toArray()

        return data
      })
      .then( allCollection =>{
        console.log(allCollection)
        console.log(req.body.username)
        console.log(req.body.password)

        if(allCollection.length != 0){
            req.session.login = true
            console.log("logged in")
            // since login was successful, send the user to the main content
            // use redirect to avoid authentication problems when refreshing
            // the page or using the back button, for details see:
            // https://stackoverflow.com/questions/10827242/understanding-the-post-redirect-get-pattern 
            res.redirect('/views/main.html')
        }
        else{
            req.session.login = false
            console.log("Incorrect password") //TODO: Make visible to user
            res.sendFile( __dirname + '/views/login.html' )
        }
      })

      app.use( (req,res,next) => {
          if( collection !== null ) {
            console.log("not null")
            next()
          }else{
            console.log("login failed")
            res.status( 503 ).send()
      }
      })
    //console.log("data")
    //console.log(data) //so this is null
    
  /*client.db('database1').collection('collection1').find({"username":req.body.username, "password":req.body.password}).then( info => { 
      // below is *just a simple authentication example* 
      // for A3, you should check username / password combos in your database
      if(info === null) {
        // define a variable that we can check in other middleware
        // the session object is added to our requests by the cookie-session middleware
        req.session.login = false
        console.log("login failed, account not found")
        res.sendFile( __dirname + '/views/login.html' )
      }else{
        console.log("logged in")
        req.session.login = true
        // since login was successful, send the user to the main content
        // use redirect to avoid authentication problems when refreshing
        // the page or using the back button, for details see:
        // https://stackoverflow.com/questions/10827242/understanding-the-post-redirect-get-pattern 
        res.redirect('/views/main.html')
      }
    })*/
/*
  if( req.body.password === 'test' ) {
    // define a variable that we can check in other middleware
    // the session object is added to our requests by the cookie-session middleware
    req.session.login = true
    console.log("logged in")
    // since login was successful, send the user to the main content
    // use redirect to avoid authentication problems when refreshing
    // the page or using the back button, for details see:
    // https://stackoverflow.com/questions/10827242/understanding-the-post-redirect-get-pattern 
    res.redirect('/views/main.html')
  }else{
    // password incorrect, redirect back to login page
    //where is it sending file to? Is it sending it to loginclient.js?
    console.log("login failed")
    //res.render('login', { msg:'login failed, please try again', layout:false })
    res.sendFile( __dirname + '/views/login.html' )
  }*/
})


// add some middleware that always sends unauthenicaetd users to the login page
app.use( function( req,res,next) {
  if( req.session.login === true )
    next()
  else
    console.log('unauthenticated users to login')
    res.sendFile( __dirname + '/views/login.html' )
    //res.render('login', { msg:'login failed, please try again', layout:false })
})


/*app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  console.log(req.body)
  res.end(JSON.stringify(req.body, null, 2))
})*/

/*app.get( '/', (req,res) => {
   console.log("in the message thing in the thing app get /")
   res.json( 'login', { msg:'message', layout:false })
})*/

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/login.html")
})


// add some middleware that always sends unautheticated users to the login page
app.use( function( req,res,next) {
  if( req.session.login === true )
    next()
  else
    console.log("not logged in")
   res.sendFile( __dirname + '/views/login.html' )
    //res.render('login', { msg:'login failed, please try again', layout:false })
})

app.get( '/views/main.html', ( req, res) => {
    console.log("success you have logged in")
    res.sendFile( __dirname + '/views/main.html' )
    //next()
    //res.render( 'main', { msg:'success you have logged in', layout:false })
})


//app.use( express.json() )


/*let collection = null

client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'database1' ).collection( 'collection1' )
  })
  .then( __collection => {
    // store reference to collection
    collection = __collection
    // blank query returns all documents
    return collection.find({"username":req.boy.username}, {"password":req.body.password}).toArray()
  })
  .then( console.log )

  app.use( (req,res,next) => {
  if( collection !== null ) {
    next()
  }else{
    res.status( 503 ).send()
  }
})

app.post( '/add', (req,res) => {
  // assumes only one object to insert
  collection.insertOne({"username":req.boy.username, "password":req.body.password}).then( result => res.json( result ) ).then( json => console.log( json ) )
})

// assumes req.body takes form { _id:5d91fb30f3f81b282d7be0dd } etc.
app.post( '/remove', (req,res) => {
  collection
    .deleteOne({ _id:mongodb.ObjectId( req.body._id ) })
    .then( result => res.json( result ) )
})

app.post( '/update', (req,res) => {
  collection
    .updateOne(
      { _id:mongodb.ObjectId( req.body._id ) },
      { $set:{ username:req.body.username } }
    )
    .then( result => res.json( result ) )
})*/
  
// route to get all docs
app.get( '/', (req,res) => {
  if( collection !== null ) {
    // get array and pass to res.json
    collection.find({"username":req.boy.username, "password":req.body.password}).toArray().then( result => res.json( result ) )
  }
})

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port)
})

app.listen( 3000 )
