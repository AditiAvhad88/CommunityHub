const express = require("express");
const {
  protect,
} = require("../middleware/authMiddleware");
const router = express.Router();

const {
  registerUser,
  loginUser,
  forgotPassword,
  sendOTP,
  verifyOTP,
  getAllUsers,
} = require("../controllers/authController");

router.post(
  "/register",
  registerUser
);

router.post(
  "/login",
  loginUser
);

router.post(
  "/forgot-password",
  forgotPassword
);

router.post(
  "/send-otp",
  sendOTP
);

router.post(
  "/verify-otp",
  verifyOTP
);

router.get(
  "/users",
  protect,
  getAllUsers
);

module.exports = router;