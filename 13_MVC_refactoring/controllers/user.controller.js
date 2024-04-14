const User = require('../models/user.model.js');

const getAllUser = async (req, res) => {
    try {
      const allUsers = await User.find({});
      return res.status(200).send(allUsers);
    } catch (error) {
      console.error("Error Fetching user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
}

const getUserById = async (req, res) => {
    try {
      const userId = Number(req.params.id);
      const user = await User.findOne({ id: userId });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).send(user);
    } catch (error) {
      console.error("Error Fetching user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
}

const createUser = async (req, res) => {
    try {
      const allUsers = await User.find({});
      const createdid = allUsers.length + 1;
  
      if (
        !req.body.first_name ||
        !req.body.last_name ||
        !req.body.email ||
        !req.body.gender ||
        !req.body.job_title
      ) {
        return res.status(400).send({ msg: "All field are required" });
      }
      const result = await User.create({
        id: createdid,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        job_title: req.body.job_title,
      });
      return res.status(201).send({ message: "Successfully created" });
    } catch (error) {
      console.error("Error Creating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
}

const updateUserById = async (req, res) => {
    try {
      const { first_name, last_name, email, gender, job_title } = req.body;
      const userId = Number(req.params.id);
      const ExistingUser = await User.findOne({ id: userId });
  
      if (!ExistingUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      ExistingUser.first_name = first_name;
      ExistingUser.last_name = last_name;
      ExistingUser.email = email;
      ExistingUser.gender = gender;
      ExistingUser.job_title = job_title;
  
      await ExistingUser.save();
      return res.status(200).json({ message: "Data Updated Successfully" });
    } catch (error) {
      console.error("Error Updating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
}

const deleteUser = async (req, res) => {
    try {
      const userId = Number(req.params.id);
      const user = await User.findOne({ id: userId });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      await User.deleteOne({ id: userId });
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {getAllUser, getUserById, createUser, updateUserById, deleteUser};