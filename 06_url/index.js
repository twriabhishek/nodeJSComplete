const http = require('http');
const url = require('url');

const server=http.createServer((req, res)=>{
    console.log("Welcome in the world of server!");
    const myUrl = url.parse(req.url);
    console.log(myUrl);
    res.end("Welcome from the side of server!");
})

server.listen(8023, () => {
    console.log("Server is listening on port 8023");
});