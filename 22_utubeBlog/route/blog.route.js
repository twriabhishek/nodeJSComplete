const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { handleAddBlog, handleAddComment,handleUpdateBlog, handleDeleteBlog } = require("../controllers/blog.controller");
const Blog = require("../models/blog.model");
const Comment = require("../models/comments.model");
const { getUser } = require("../utils/auth.utils");
const User = require("../models/user.model");
const UserDetails = require("../models/userDetails.model");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage })

router.get("/addBlog", (req, res) => {
  return res.render("addBlogs.ejs", {
    user: req.user,
  });
});


router.get("/myBlog", async(req, res) => {
    // console.log(req.cookies.token);
    const loginUser = getUser(req.cookies.token);
    // console.log(loginUser);
    const allBlogs = await Blog.find({createdBy:loginUser._id}).populate('createdBy');
    return res.render("myBlogs.ejs", {
      user: req.user,
      blogs: allBlogs,
    });
});



router.get("/update/:id", async(req, res) => {
    const blog = await Blog.findById(req.params.id).populate('createdBy');
    const comments = await Comment.find({blogId:req.params.id}).populate('createdBy');
    return res.render("updateBlog.ejs", {
      singleBlog: blog,
      user: req.user,
      comments
    });
});

router.get("/:id", async (req, res) => {
  let loggedInuser; // Declare loggedInuser outside of the if block
  if (req.user && req.user._id) {
      loggedInuser = await User.find({ _id: req.user._id });
  }
  const blog = await Blog.findById(req.params.id).populate('createdBy');
  const comments = await Comment.find({ blogId: req.params.id }).populate('createdBy');

  return res.render("singleBlogs.ejs", {
      singleBlog: blog,
      user: req.user,
      comments,
      loggedInuser,
  });
});


router.get("/profile/:id", async(req, res) => {
    const user = await User.findById(req.params.id);
    const userDetails = await UserDetails.find({userOneID:req.params.id});
    console.log("user",user);
    console.log("userDetails", userDetails);
    return res.render("profile.ejs", {
      user: req.user,
      userdetails: user,
      completeUserDetails:userDetails,
    });
});


router.get("/editprofile/:id", async(req, res) => {
    const user = await User.findById(req.params.id);
    const userDetail = await UserDetails.find({userOneID:req.params.id});
    return res.render("editProfile.ejs", {
      user: req.user,
      completeUserDetails:userDetail,
      userPer:user,
    });
});


router.post("/addBlog", upload.single('coverImageUrl'), handleAddBlog);
router.post("/updateBlog/:id", upload.single('coverImageUrl'), handleUpdateBlog);
router.post("/addComment/:blogId", handleAddComment);
router.post("/delete/:blogId", handleDeleteBlog);


module.exports = router;
