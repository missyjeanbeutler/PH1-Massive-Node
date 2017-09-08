# Topics To Cover
A list of topics that will be covered in today's lecture.

## What is Massive.js
- When creating a basic server...
  - npm init -y (creates our package.json)
  - create server folder
  - in server folder, create index.js
  - npm install --save body-parser express cors massive dotenv
- Massive.js allows you to connect to your database so you can retrieve data and manipulate data
- Syntax 
  `const massive = require('massive');`
  ```js
  massive( process.env.CONNECTION_STRING ).then(db => {
    app.set('db', db)
  })
  ```
  - when adding connection string to .env file, DO NOT FORGET to add .env to your gitignore!
- Create a db folder at the root of your project
  - naming it db is important, massive is looking for a folder named db
  - all sql statements go here
  - If you get the error 
  `req.app.get(...).someSqlQuery() is not a function`
    This is usually one of two things...
    Your spelling between the function someSqlQuery (or whatever it is that you're invoking) and the sql file are not the same.
    or
    Nodemon is not being run from the same folder that contains the db folder.
    This last option is also a problem for dotenv, your variables will be undefined if you run nodemon from a different location from where your dotenv is

## Seed files  
- Drop table if exists [name]; create table if not exists [name]; insert into [name]...
- Run in .then where DB instance is created on startup  

## Getting Data from DB with Endpoints
```js 
req.app.get('db').theGetAllDataFunctionYouHave().then(theDataFromYourDatabase => {
  res.status(200).send(theDataFromYourDatabase)
})
  ```
## Inserting Data to DB with Endpoints
- $1, $2, etc... are parameters in your sql files
- Put the value in the invocation of the function as an argument/s
  - more than one argument needs to be in an array
  `req.app.get('db').theGetAllDataFunctionYouHave([argument1, argument2...])...`

## Req.Query
- Params are not options
- Queries are optional
- Syntax
  - /?key=value & for chaining
  - Use + for spaces (params is %20) 
  - When checking if there is req.query, can't do if(req.query) because the object always exists. You must check for a specific property on the query object.
