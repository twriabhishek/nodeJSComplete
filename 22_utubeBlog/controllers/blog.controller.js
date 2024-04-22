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



const handleUpdateBlog = async (req, res) => {
  const { title, body, coverImageUrl } = req.body;
  const blogId = req.params.id;
  const createdUser = req.user._id;

  // Check if any required field is missing or blank
  if (!title || title.trim() === "") {
    return res.status(404).json({ error: "Title required" });
  }

  try {
    
    // Find the blog by ID
    const blog = await Blog.findById(blogId);
    // Check if the blog exists
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    // Check if the current user is the creator of the blog
    if (blog.createdBy.toString() !== createdUser) {
      return res.status(403).json({ error: "You are not authorized to update this blog" });
    }
    // Update the blog fields
    blog.title = title;
    blog.body = body;
    if (req.file.filename) {
      blog.coverImageUrl = `/uploads/${req.file.filename}`;
    }
    // Save the updated blog
    await blog.save();

    // Send a success response
    return res.redirect("/api/v1/blog/myBlog");
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

module.exports = { handleAddBlog, handleAddComment, handleUpdateBlog };
