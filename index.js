//insures that the .env file is only run in a development environment and not a produciton environment
if(process.env.NODE_ENV !== 'production'){
    //requires the the .env file configuration be run first hiding all info hidden via the .env file
    require('dotenv').config();
}

const http = require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('index.html', function(error, data){
        if(error){
            res.writeHead(404);
            res.write('Error:File Not Found');
        }else{
            res.write(data); 
        }
        res.end();
    });
});

server.listen(port, function(){
    console.log("Server Running...");
})