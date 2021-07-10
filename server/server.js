const express = require('express');
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const {generateUploadURL} = require("./s3");
const adminCollectionRouter = require('./routes/adminCollection');
const adminCreateRouter = require('./routes/adminCreate');
const adminUpdateRouter = require('./routes/adminUpdate');
const collectionRouter = require('./routes/collection');
const contactRouter = require('./routes/contact');

app.listen(3000, function(){
    console.log("Server Running..."); 
})

//allows for different domains to communicate
app.use(cors());

app.use(express.urlencoded({extended: false}));

//Middleware: Puts the json data in a pages body in a req object, parses the data
app.use(express.json());

//Middleware: Logging
app.use(morgan("dev"));

app.get('/s3URL', (req, res) =>{
    const url = generateUploadURL();
    res.send({url});
})

app.use(adminCollectionRouter);
app.use(adminCreateRouter);
app.use(adminUpdateRouter);
app.use(collectionRouter);  
app.use(contactRouter);