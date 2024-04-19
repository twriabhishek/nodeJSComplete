const authUser = require("../models/user.model.js");
const { setUser, deleteUser } = require("../utils/auth.utils.js");
const { v4: uuidv4 } = require("uuid");

const handleloginAuth = async (req, res) => {
  const { email, password } = req.body;

  // Check if any required field is missing or blank
  if (!email || !password || email.trim() === "" || password.trim() === "") {
    return res.status(404).json({ error: "All fields are required" });
  }

  try {
    const User = await authUser.findOne({ email, password });

    if (!User) {
      return res
        .status(400)
        .json({ error: "User Not exist with the given credentials" });
    }
    const sessionId = uuidv4();
    setUser(sessionId, User);
    res.cookie("uid", sessionId);

    // Send a success response
    return res.status(200).json("Logged in Successfully");
  } catch (error) {
    // Handle any errors
    console.error("Error occurred during signup:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handlesignupAuth = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if any required field is missing or blank
  if (
    !name ||
    !email ||
    !password ||
    name.trim() === "" ||
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
    await authUser.create({ name, email, password });

    // Send a success response
    return res.status(201).json("User created successfully");
  } catch (error) {
    // Handle any errors
    console.error("Error occurred during signup:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handlelogoutAuth = async (req, res) => {
  try {
    const sessionId = req.cookies.uid; // Get the sessionId from the cookie

    if (!sessionId) {
      return res.status(400).json({ error: "No session found" });
    }

    // Remove the session associated with the sessionId
    deleteUser(sessionId);

    // Clear the session cookie
    res.clearCookie("uid");

    // Send a success response
    return res.status(200).json("Logged out Successfully");
  } catch (error) {
    // Handle any errors
    console.error("Error occurred during logout:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { handleloginAuth, handlesignupAuth, handlelogoutAuth };
