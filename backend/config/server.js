const port = 3003;

const bodyParser = require("body-parser");
const express = require("express");
const server = express();
//const allowCors = require('./cors')
 


server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(bodyParser.text());
 
 
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

 

server.listen(port, function () {
  console.log(`BACKEND is running on port ${port}.`);
});

module.exports = server;
