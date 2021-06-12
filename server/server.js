const express = require('express');
const app = express();
const morgan = require("morgan");
const cors = require("cors");
// const hbs = require('express-handlebars');
const adminCollectionRouter = require('./routes/adminCollection');
const adminCreateRouter = require('./routes/adminCreate');
const adminUpdateRouter = require('./routes/adminUpdate');
const collectionRouter = require('./routes/collection');
// const homeRouter = require('./routes/home');
// const aboutRouter = require('./routes/about');
// const contactRouter = require('./routes/contact');

// app.engine('handlebars', hbs({ext: 'handlebars', defaultLayout: 'defaultLayout', layoutsDir: __dirname + '/views/layouts/'}));
// app.set('view engine', 'handlebars');

// app.use(express.static('public')); 

app.listen(3000, function(){
    console.log("Server Running..."); 
})

//allows for different domains to communicate
app.use(cors());

//Middleware: Puts the json data in a pages body in a req object
app.use(express.json());

//Middleware: Logging
app.use(morgan("dev"));

app.use(adminCollectionRouter);
app.use(adminCreateRouter);
app.use(adminUpdateRouter);
app.use(collectionRouter); 