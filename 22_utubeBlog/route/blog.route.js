const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { handleAddBlog, handleAddComment,handleUpdateBlog } = require("../controllers/blog.controller");
const Blog = require("../models/blog.model");
const Comment = require("../models/comments.model");
const { getUser } = require("../utils/auth.utils");

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

router.get("/:id", async(req, res) => {
    const blog = await Blog.findById(req.params.id).populate('createdBy');
    const comments = await Comment.find({blogId:req.params.id}).populate('createdBy');
    return res.render("singleBlogs.ejs", {
      singleBlog: blog,
      user: req.user,
      comments
    });
});


router.post("/addBlog", upload.single('coverImageUrl'), handleAddBlog);
router.post("/updateBlog/:id", upload.single('coverImageUrl'), handleUpdateBlog);  
router.post("/addComment/:blogId", handleAddComment);


module.exports = router;
