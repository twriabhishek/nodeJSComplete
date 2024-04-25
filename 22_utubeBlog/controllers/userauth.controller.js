const User = require("../models/user.model.js");
const authUser = require("../models/user.model.js");
const userDetails = require("../models/userDetails.model.js");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');

// Function to generate a random 6-digit OTP
function generateOTP() {
  // Generate a random number between 100000 and 999999 (inclusive)
  const otp = Math.floor(100000 + Math.random() * 900000);
  // Convert the number to a string
  return otp.toString();
}

const handleloginAuth = async (req, res) => {
  const { email, password } = req.body;

  // Check if any required field is missing or blank
  if (!email || !password || email.trim() === "" || password.trim() === "") {
    return res.status(404).json({ error: "All fields are required" });
  }

  try {
    try {
      const token = await User.matchPassword(email, password);
      // Send a success response
      return res.cookie("token", token).redirect("/");
    } catch (error) {
      return res.render("login.ejs", {
        error: "Incorrect Email or Password",
      });
    }
  } catch (error) {
    // Handle any errors
    console.error("Error occurred during signup:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handlesignupAuth = async (req, res) => {
  const { otppin } = req.body;

  const id = req.query.id;

  const user = jwt.verify(id, "secret");

  const fullName=user.fullName;
  const email=user.email;
  const password=user.password;
  const generatedOtp = user.otp;

  console.log(fullName, email, password, otppin, generatedOtp);



  // Check if any required field is missing or blank
  if (
    !fullName ||
    !email ||
    !password ||
    fullName.trim() === "" ||
    email.trim() === "" ||
    password.trim() === ""
  ) {
    return res.status(404).json({ error: "All fields are required" });
  }


  try {

    //Validate OTP here
    if(parseInt(otppin) != parseInt(generatedOtp)){
      console.log("inside otp section");
      return res.render("signup.ejs", {
        error: "Incorrect OTP",
      });
    }

    // Check if a user with the provided email already exists
    const existingUser = await authUser.findOne({ email });

    if (existingUser) {
      // If user exists, send a response indicating that the user already exists
      return res.status(400).json({ error: "User already exists" });
    }

    // If user doesn't exist, create a new user
    await authUser.create({ fullName, email, password });

    // Send a success response
    return res.redirect("/");
  } catch (error) {
    // Handle any errors
    console.error("Error occurred during signup:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handlelogoutAuth = async (req, res) => {
  try {
    const token = req.cookies.token; // Get the sessionId from the cookie
    if (!token) {
      return res.status(400).json({ error: "No session found" });
    }
    // Clear the session cookie
    res.clearCookie("token").redirect("/");
  } catch (error) {
    // Handle any errors
    console.error("Error occurred during logout:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handlecreateUpdate = async (req, res) => {
  const { fullName, email, mobileNumber, address, instaLink, fbLink, twitterLink } =
    req.body;

  // Extract user ID from params
  const userId = req.params.id;

  try {
    // Check if UserDetails entry exists for the given userId
    let userDetailsEntry = await userDetails.findOne({ userOneID: userId });

    if (!userDetailsEntry) {
      // If UserDetails entry does not exist, create a new entry
      userDetailsEntry = await userDetails.create({
        userOneID: userId,
        mobileNumber,
        address,
        instaLink,
        fbLink,
        twitterLink,
      });
    } else {
      // If UserDetails entry exists, update the existing entry
      await userDetails.findOneAndUpdate(
        { userOneID: userId },
        {
          mobileNumber: mobileNumber,
          address,
          instaLink,
          fbLink,
          twitterLink,
        }
      );
    }

    // Update profile image URL and full name in the User model
    await User.findByIdAndUpdate(userId, {
      profileImageUrl: `/userimage/${req.file.filename}`, // Assuming req.file.filename contains the updated profile image URL
      fullName,
    });

    // Redirect to user profile page or send a success response
    return res.redirect(`/api/v1/blog/profile/${userId}`);
  } catch (error) {
    // Handle any errors
    console.error("Error occurred during profile update:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handleGenerateOtp = async (req, res) => {
  const { fullName, email, password } = req.body;
  // console.log(fullName, email, password);

  // Check if any required field is missing or blank
  if (
    !fullName ||
    !email ||
    !password ||
    fullName.trim() === "" ||
    email.trim() === "" ||
    password.trim() === ""
  ) {
    return res.status(404).json({ error: "All fields are required" });
  }

  let testAccount = await nodemailer.createTestAccount();
  let transporter = await nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "alek94@ethereal.email",
      pass: "S2Vg1V8M5N4uFYYjWS",
    },
  });
  const otp = generateOTP();

  const data = {
    fullName:fullName,
    email:email,
    password:password,
    otp: otp
  }

  const identifier = jwt.sign(data, "secret")

  let message = {
    from: '"Abhishek Tiwari 👻" <at4913733@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Otp Verification", // Subject line
    text: `Your OTP is: ${otp}`,
  };

  let info = await transporter
    .sendMail(message)
    .then((info) => {
      console.log({
        preview: nodemailer.getTestMessageUrl(info),
        info: info.messageId,
      });

      return res.redirect(`/api/v1/auth/getotpvalue?id=${identifier}`);
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

module.exports = {
  handleloginAuth,
  handlesignupAuth,
  handlelogoutAuth,
  handlecreateUpdate,
  handleGenerateOtp,
};
