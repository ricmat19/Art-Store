const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const db = require("./database");
const adminRouter = require('./routes/admin');
const homeRouter = require('./routes/home');
const aboutRouter = require('./routes/about');
const collectionRouter = require('./routes/collection');
const contactRouter = require('./routes/contact');

app.engine('handlebars', hbs({ext: 'handlebars', defaultLayout: 'defaultLayout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'handlebars');

app.use(express.static('public')); 

app.listen(3000, function(){
    console.log("Server Running..."); 
})

app.use(adminRouter);
app.use(homeRouter);
app.use(aboutRouter);
app.use(collectionRouter);
app.use(contactRouter);