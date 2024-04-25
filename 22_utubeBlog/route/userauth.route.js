const express = require("express");
const router = express.Router();
const multer = require("multer");
const jwt = require('jsonwebtoken');
const path = require("path");
const {
  handleloginAuth,
  handlesignupAuth,
  handlelogoutAuth,
  handlecreateUpdate,
  handleGenerateOtp,
} = require("../controllers/userauth.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/userimage/`));
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
router.get("/login", (req, res) => {
  return res.render("login.ejs");
});

router.get("/signup", (req, res) => {
  return res.render("signup.ejs");
});

router.get("/getotpvalue", (req, res) => {
  // Retrieve query parameters from the URL
  const id = req.query.id;
  console.log(id);
  // const signup = jwt.verify(id, "secret");
  return res.render("otpVerification.ejs", {
    ids:id,
  });
});


router.post("/login", handleloginAuth);
router.post("/signup", handlesignupAuth);
router.get("/logout", handlelogoutAuth);

router.post(
  "/CUuserDetail/:id",
  upload.single("userphoto"),
  handlecreateUpdate
);

router.post("/getotp", handleGenerateOtp);

module.exports = router;
