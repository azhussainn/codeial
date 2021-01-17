const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//read post requests
app.use(express.urlencoded({extended:true}));

//use cookie parser
app.use(cookieParser());

//setting static files
app.use(express.static('./assets'));

//setting view layout
app.use(expressLayouts);

//extract style and script from sub-pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use express router
app.use('/', require("./routes/index"))

//setting up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
})