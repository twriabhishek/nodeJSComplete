const express = require("express");
const router = express.Router();
const {generateShortUrl, getRedirectUrl, getRedirectUrlClickDetails, getAllShortUrlId} = require('../controllers/url.controller');


router.post('/', generateShortUrl);
router.get('/getAllshortId', getAllShortUrlId);
router.get('/:url', getRedirectUrl);
router.get('/analytics/:url', getRedirectUrlClickDetails);

module.exports = router;