const Post = require("../models/Post");
const User = require("../models/User");
const Notification = require("../models/Notification");

// CREATE POST
const createPost = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const friendCount = user.friends.length;
    let limit = 0;

    // Better logic
    if (friendCount === 0) {
      limit = 0;
    } else if (friendCount <= 10) {
      limit = friendCount;
    } else {
      limit = Infinity;
    }

    if (
      limit !== Infinity &&
      user.postCountToday >= limit
    ) {
      return res.status(400).json({
        message: "Daily posting limit reached",
      });
    }

    const post = await Post.create({
      user: req.user._id,
      caption: req.body.caption,
      media: req.body.media,
      mediaType: req.body.mediaType,
    });

    user.postCountToday += 1;
    await user.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL POSTS
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// LIKE / UNLIKE POST
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(
      req.params.id
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (
      !post.likes.includes(req.user._id)
    ) {
      post.likes.push(req.user._id);

      // Create notification
      if (
        post.user.toString() !==
        req.user._id.toString()
      ) {
        await Notification.create({
          user: post.user,
          message:
            `${req.user.name} liked your post`,
        });
      }

      await post.save();
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// COMMENT ON POST
const commentPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const comment = {
      user: req.user._id,
      text: req.body.text,
    };

    post.comments.push(comment);

    // Send notification to post owner
    if (
      post.user.toString() !==
      req.user._id.toString()
    ) {
      await Notification.create({
        user: post.user,
        message: `${req.user.name} commented on your post`,
      });
    }

    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// SHARE POST
const sharePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json({
      message: "Post shared successfully",
      sharedPost: post,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  likePost,
  commentPost,
  sharePost,
};