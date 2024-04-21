const Blog = require("../models/blog.model.js");
const Comment = require('../models/comments.model.js');
const authUser = require("../models/user.model.js");

const handleAddBlog = async (req, res) => {
  const { title, body, coverImageUrl } = req.body;

  // Check if any required field is missing or blank
  if (!title || title.trim() === "") {
    return res.status(404).json({ error: "Title required" });
  }

  try {
    // If user doesn't exist, create a new user
    const blog = await Blog.create({
      title,
      body,
      createdBy: req.user._id,
      coverImageUrl: `/uploads/${req.file.filename}`,
    });

    // Send a success response
    return res.redirect("/");
  } catch (error) {
    // Handle any errors
    console.error("Error occurred during signup:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


const handleAddComment = async(req, res) => {
  const { content } = req.body;

  // Check if any required field is missing or blank
  if (!content || content.trim() === "") {
    return res.status(404).json({ error: "Content required" });
  }

  try {
    // If user doesn't exist, create a new user
    const comment = await Comment.create({
      content,
      blogId: req.params.blogId,
      createdBy: req.user._id,
    });

    // Send a success response
    return res.redirect(`/api/v1/blog/${req.params.blogId}`);
  } catch (error) {
    // Handle any errors
    console.error("Error occurred during signup:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { handleAddBlog, handleAddComment };
