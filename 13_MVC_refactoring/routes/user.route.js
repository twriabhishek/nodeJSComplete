const express = require("express");
const router = express.Router();
const {getAllUser, getUserById, createUser, updateUserById, deleteUser} = require('../controllers/user.controller')

router.get("/", getAllUser);

router.get("/:id", getUserById);

router.post("/", createUser);

router.put("/:id", updateUserById);

router.delete("/:id", deleteUser);

module.exports = router;