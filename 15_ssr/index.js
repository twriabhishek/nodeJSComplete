const express = require('express');
const connection = require('./dbConnection/connection.js');
const urlRoute = require('./routes/url.route.js');
const staticRoute = require('./routes/static.route.js');
const path = require('path');

const app = express();
const PORT = 8023;

//Make connection
connection();


// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));


//Use Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//Routes
app.use("/api/v1/url", urlRoute);
app.use("/", staticRoute);

app.listen(PORT, ()=>{
    console.log(`Server is listening on PORT: ${PORT}`);
})