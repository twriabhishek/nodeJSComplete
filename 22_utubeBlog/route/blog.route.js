const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { handleAddBlog, handleAddComment } = require("../controllers/blog.controller");
const Blog = require("../models/blog.model");
const Comment = require("../models/comments.model");

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

router.get("/:id", async(req, res) => {
    const blog = await Blog.findById(req.params.id).populate('createdBy');
    const comments = await Comment.find({blogId:req.params.id}).populate('createdBy');
    console.log(comments);
    return res.render("singleBlogs.ejs", {
      singleBlog: blog,
      user: req.user,
      comments
    });
  });


router.post("/addBlog", upload.single('coverImageUrl'), handleAddBlog);  
router.post("/addComment/:blogId", handleAddComment);


module.exports = router;
