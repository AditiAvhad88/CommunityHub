const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
  transferPoints,
  getLeaderboard,
  updateSubscription,
} = require("../controllers/userController");

const {
  protect,
} = require("../middleware/authMiddleware");

// Profile
router.get(
  "/profile",
  protect,
  getProfile
);

router.put(
  "/profile",
  protect,
  updateProfile
);

// Transfer Points
router.put(
  "/transfer",
  protect,
  transferPoints
);

// Leaderboard
router.get(
  "/leaderboard",
  protect,
  getLeaderboard
);

router.put(
  "/subscription",
  protect,
  updateSubscription
);

module.exports = router;