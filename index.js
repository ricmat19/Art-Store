const express = require('express');
const app = express();
const path = require('path');
const hbs = require('express-handlebars');
const homeRouter = require('./routes/home');
const aboutRouter = require('./routes/about');
const comicRouter = require('./routes/comic');
const comicsRouter = require('./routes/comics');
const contactRouter = require('./routes/contact');
const personalWorkRouter = require('./routes/personal-work');
const personalWorksRouter = require('./routes/personal-works');
const printRouter = require('./routes/print');
const printsRouter = require('./routes/prints');

app.engine('handlebars', hbs({ext: 'handlebars', defaultLayout: 'defaultLayout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.listen(3000, function(){
    console.log("Server Running...");
})

app.use(homeRouter);
app.use(aboutRouter);
app.use(comicRouter);
app.use(comicsRouter);
app.use(contactRouter);
app.use(personalWorkRouter);
app.use(personalWorksRouter);
app.use(printRouter);
app.use(printsRouter);