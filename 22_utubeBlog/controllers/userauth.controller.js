const User = require("../models/user.model.js");
const authUser = require("../models/user.model.js");

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
  const { fullName, email, password } = req.body;

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

module.exports = { handleloginAuth, handlesignupAuth, handlelogoutAuth };
