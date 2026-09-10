const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPosts,
  likePost,
  commentPost,
  sharePost,
} = require("../controllers/postController");

const { protect } = require("../middleware/authMiddleware");

// Create Post
router.post("/", protect, createPost);

// Get All Posts
router.get("/", getAllPosts);

// Like / Unlike Post
router.put("/:id/like", protect, likePost);

// Comment on Post
router.post("/:id/comment", protect, commentPost);

// Share Post
router.post("/:id/share", protect, sharePost);

module.exports = router;