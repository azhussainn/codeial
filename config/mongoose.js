const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/codeial_development', { useNewUrlParser: true , useUnifiedTopology: true});


const db = mongoose.connection;


//on error in connecting to db;
db.on('error', console.error.bind(console, 
    'Error connecting to MongoDB'));

//once connected, it show it's connected.
db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

//exporting the file
module.exports = db;