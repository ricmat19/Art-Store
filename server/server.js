const express = require('express');
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const adminCollectionRouter = require('./routes/adminCollection');
const adminCreateRouter = require('./routes/adminCreate');
const adminUpdateRouter = require('./routes/adminUpdate');
const collectionRouter = require('./routes/collection');

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