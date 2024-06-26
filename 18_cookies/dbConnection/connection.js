const mongoose = require("mongoose");

const connection = async () => {
  return await mongoose
    .connect("mongodb://127.0.0.1:27017/nodeTestShortUrl")
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.log("Error", err);
    });
};

module.exports = connection;