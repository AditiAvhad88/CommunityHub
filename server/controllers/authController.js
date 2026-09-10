const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");
const generateOTP = require("../utils/generateOTP");

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const userExists = await User.findOne({
      email,
    });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (
      user &&
      (await bcrypt.compare(
        password,
        user.password
      ))
    ) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  try {
    const { email, phone } = req.body;

    const user = await User.findOne({
      $or: [
        { email: email },
        { phone: phone },
      ],
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.forgotPasswordDate) {
      const today =
        new Date().toDateString();

      const lastDate =
        new Date(
          user.forgotPasswordDate
        ).toDateString();

      if (today === lastDate) {
        return res.status(400).json({
          message:
            "You can use this option only one time per day.",
        });
      }
    }

    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    let newPassword = "";

    for (let i = 0; i < 8; i++) {
      newPassword +=
        characters.charAt(
          Math.floor(
            Math.random() *
              characters.length
          )
        );
    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    user.password =
      hashedPassword;

    user.forgotPasswordDate =
      new Date();

    await user.save();

    res.json({
      message:
        "Password reset successfully",
      newPassword,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// SEND OTP
const sendOTP = async (req, res) => {
  try {
    const { email, language } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const otp = generateOTP();

    user.otp = otp;
    user.otpExpiry =
      Date.now() + 5 * 60 * 1000;

    if (language) {
      user.language = language;
    }

    await user.save();

    // French users → Email OTP
    if (user.language === "fr") {
      await sendEmail(
        user.email,
        "CommunityHub OTP Verification",
        `Your OTP is ${otp}`
      );

      return res.json({
        message: "OTP sent to email",
      });
    }

    // Other languages → Mobile OTP simulation
    res.json({
      message: "OTP sent to mobile",
      otp,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// VERIFY OTP
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

console.log("Saved OTP:", user.otp);
console.log("Received OTP:", otp);
console.log("Expiry:", user.otpExpiry);
console.log("Current:", Date.now());
 if (
  String(user.otp) !== String(otp) ||
  user.otpExpiry < Date.now()
  ){
      return res.status(400).json({
        message:
          "Invalid or expired OTP",
      });
    }

    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    res.json({
      message:
        "OTP verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {

    const users = await User.find({})
  .select("name email points subscriptionPlan");

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// EXPORT FUNCTIONS
module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  sendOTP,
  verifyOTP,
  getAllUsers,
};