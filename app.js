const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
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
// listen
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
module.exports = app