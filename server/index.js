const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      massive = require('massive');

require('dotenv').config(); // configure dotenv at the top of your file so you can access your variables
const app = express();
const port = process.env.PORT || 3000; // this is useful for when you deploy your app, process.env.PORT will get a value from your hosting server and replace 3000 which is being used only in development

app.use(bodyParser.json()); // This needs to be at the top as well. Any endpoints before this will not be affected by this middleware. This middleware is important because this is what puts the body of information from a request on req.body. Without it, there is no req.body
app.use(cors());

// Basic set up of a connection string:
// postgres://username:password@host:port/databasename

// this invocation is setting up our database connection. When the promise is resolved in the .then, we are getting a database object that we can use throughout our app
massive( process.env.CONNECTION_STRING ).then(dbObject => {

  // app.set is adding this data to an object on the app object. It's a key value pair. db will be the property name, dbObject will be the value
  app.set('db', dbObject)

}).catch(err => console.log(err)) // good practice for handling errors


app.get('/api/getAll', (req, res) => {
  if(req.query.id) { // because queries are optional, it's good to check if there are even a part of the request
    req.app.get('db').searchUsers(+req.query.id).then(user => {
      res.status(200).send(user)
    })
  } else {
    req.app.get('db').getAll().then(users => {
      res.status(200).send(users)
    })
  }
})

app.post('/api/newUser', (req, res) => {
  let { name, age } = req.body; // object destructuring
  req.app.get('db').createNewUser([name, age]).then(user => { // when invoking the createNewUser function, if there is more than one argument, they need to be inside an array. Otherwise the array is unnecessary. 
    res.status(200).json('It worked!')
  })
})



app.listen(port, () => console.log(`listening on port ${port}`));

