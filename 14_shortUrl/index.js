const express = require('express');
const connection = require('./dbConnection/connection.js');
const urlRoute = require('./routes/url.route.js');

const app = express();
const PORT = 8023;

//Make connection
connection();


//Use Middleware
app.use(express.json());


//Routes
app.use("/api/v1/url", urlRoute);

app.listen(PORT, ()=>{
    console.log(`Server is listening on PORT: ${PORT}`);
})