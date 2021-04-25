const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const database = require("./database")
const homeRouter = require('./routes/home');
const aboutRouter = require('./routes/about');
const collectionRouter = require('./routes/collection');
const contactRouter = require('./routes/contact');

//insures that the .env file is only run in a development environment and not a production environment
if(process.env.NODE_ENV !== 'production'){
    //requires the the .env file configuration be run first hiding all info hidden via the .env file
    require('dotenv').config();
}

app.engine('handlebars', hbs({ext: 'handlebars', defaultLayout: 'defaultLayout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'handlebars');

app.use(express.static('public')); 

app.listen(3000, function(){
    console.log("Server Running...");
})

// app.use(database.query); 

app.use(homeRouter);
app.use(aboutRouter);
app.use(collectionRouter);
app.use(contactRouter);