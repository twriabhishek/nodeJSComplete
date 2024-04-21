const express = require("express");
const router = express.Router();
const {handleloginAuth, handlesignupAuth,handlelogoutAuth} = require('../controllers/userauth.controller');



router.get('/login', (req, res)=>{
    return res.render("login.ejs");
});

router.get('/signup', (req, res)=>{
    return res.render("signup.ejs");
});



router.post('/login', handleloginAuth);
router.post('/signup', handlesignupAuth);
router.get('/logout', handlelogoutAuth);

module.exports = router;