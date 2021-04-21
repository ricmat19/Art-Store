const express = require('express');
const app = express();
const path = require('path');
const hbs = require('express-handlebars');
const homeRouter = require('./routes/home');

app.engine('handlebars', hbs({ext: 'handlebars', defaultLayout: 'defaultLayout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.listen(3000, function(){
    console.log("Server Running...");
})

app.use('/', homeRouter);