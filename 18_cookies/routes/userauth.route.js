const express = require("express");
const router = express.Router();
const {handleloginAuth, handlesignupAuth,handlelogoutAuth} = require('../controllers/userauth.controller');


router.post('/login', handleloginAuth);
router.post('/signup', handlesignupAuth);
router.post('/logout', handlelogoutAuth);

module.exports = router;