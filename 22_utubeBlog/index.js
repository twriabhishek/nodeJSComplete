const express = require('express');
const connection = require('./dbConnection/connection.js');
const userauthRoute = require('./route/userauth.route.js');
const blogRoute = require('./route/blog.route.js');
const {checkForAuthentication} = require('./middlewares/auth.middleware.js');
const cookieParser = require('cookie-parser');
const Blog = require('./models/blog.model.js');
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
app.use(cookieParser());
app.use(checkForAuthentication);


//Routes
app.use("/api/v1/auth", userauthRoute);
app.use("/api/v1/blog", blogRoute);
app.use(express.static(path.resolve('./public')));



app.get('/', async(req, res)=>{
    const allBlogs = await Blog.find({}).populate('createdBy');
    res.render("home.ejs", {
        user: req.user,
        blogs: allBlogs,
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is listening on PORT: ${PORT}`);
})