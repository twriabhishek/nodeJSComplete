const http = require('http');



function myHandler(req, res){
    console.log("Welcome in server!");
    res.end("Hello buddy I am talking from server");
}


const server = http.createServer(myHandler)

server.listen((8023), ()=>{
    console.log("Server is listening on port 8023");
})