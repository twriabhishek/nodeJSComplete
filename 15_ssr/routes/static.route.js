const express = require('express');
const URL = require("../models/url.model.js");
const router = express.Router();

router.get('/', async(req, res)=>{
    const allShortUrls = await URL.find({}, '_id shortId redirectUrl visitHistory');
    return res.render("home", {
    urls: allShortUrls,
  });
})

module.exports = router;