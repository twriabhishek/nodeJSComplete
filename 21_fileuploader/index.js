const express = require('express');
const path = require('path');
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

const app = express();
const PORT = 8023;


// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));


//Use Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false  }))


app.get('/', (req, res)=>{
    return res.render("homepage");
})

app.post('/upload', upload.single('images'), (req, res)=>{
    return res.redirect("/");
})

app.listen(PORT, ()=>{
    console.log(`Server is listening on PORT: ${PORT}`);
})