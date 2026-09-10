const express = require("express");
const router = express.Router();

const {
  sendFriendRequest,
  acceptRequest,
  getFriends,
  getPendingRequests,
} = require("../controllers/friendController");

const { protect } = require("../middleware/authMiddleware");

// ==========================
// GET FRIEND LIST
// ==========================

// Used by Friends.jsx
router.get(
  "/",
  protect,
  getFriends
);

// Used by Home.jsx Dashboard
router.get(
  "/list",
  protect,
  getFriends
);

// ==========================
// SEND FRIEND REQUEST
// ==========================
router.post(
  "/send",
  protect,
  sendFriendRequest
);

// ==========================
// ACCEPT FRIEND REQUEST
// ==========================
router.put(
  "/accept/:id",
  protect,
  acceptRequest
);

// ==========================
// GET PENDING REQUESTS
// ==========================
router.get(
  "/requests",
  protect,
  getPendingRequests
);

module.exports = router;