const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema(
  {
    mobileNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    instaLink: {
      type: String,
    },
    fbLink: {
      type: String,
    },
    twitterLink: {
      type: String,
    },
    userOneID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const UserDetails = mongoose.model("userDetail", userDetailsSchema);

module.exports = UserDetails;
