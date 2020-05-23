const express = require('express');
const mongoose = require('mongoose');
// to use dot environment.
require('dotenv/config');
const documentRoute = require('./routes/document');
const bodyParser = require('body-parser');
const app = express();

//DB Connection
mongoose.connect(
	process.env.DB_CONNECTION,
	{useUnifiedTopology: true, useNewUrlParser:true},
	() => {
		try{
			console.log('database ok')
		}catch(err){
			console.log({message:err})
		}
	});
// Parsing incoming request bodies in a middleware before handlers
app.use(bodyParser.json());
// documents handler
app.use('/documents',documentRoute);
app.get("/", (req, res) => {
	return res.json(1);
  });
// listen port 8080
app.listen(8080);
module.exports = app