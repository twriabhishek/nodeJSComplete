// const http = require('http');

const express = require('express');
const app = express();
const port = 8023;

app.get("/", (req, res)=>{
    res.send("Helllo from Home Page..");
});

app.get("/contact", (req, res)=>{
    res.send("Helllo from Contact Page..");
});

app.get("/about", (req, res)=>{
    res.send(`Hello ${req.query.name} and your age is ${req.query.age}`);
});


app.listen(port, ()=>{
    console.log(`Server is Listening on ${port}`);
})



//1)Express ek framework hai node js par
//2)Express internally http module ka hi use karta hai.
//3)Express ki help s hum code ko bahut clean likhtey hai aur internally sab kuch use kar leta hai.



// const myServer = http.createServer(app)

// myServer.listen(8023, ()=>{
//     console.log("Server is Listening on 8023 Port");
// })