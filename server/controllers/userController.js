const User = require("../models/User");

// GET USER PROFILE
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const {
      name,
      phone,
      language,
    } = req.body;

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.language = language || user.language;

    await user.save();

    res.json({
      message: "Profile Updated Successfully",
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// TRANSFER POINTS
const transferPoints = async (req, res) => {
  try {
    const { receiverId, points } = req.body;

    const sender = await User.findById(req.user._id);
    const receiver = await User.findById(receiverId);

    if (!receiver) {
      return res.status(404).json({
        message: "Receiver not found",
      });
    }

    // User must have more than 10 points
    if (sender.points <= 10) {
      return res.status(400).json({
        message: "You need more than 10 points to transfer.",
      });
    }

    // Check sufficient balance
    if (sender.points < points) {
      return res.status(400).json({
        message: "Insufficient points",
      });
    }

    sender.points -= Number(points);
    receiver.points += Number(points);

    await sender.save();
    await receiver.save();

    res.json({
      message: "Points transferred successfully",
      senderPoints: sender.points,
      receiverPoints: receiver.points,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET LEADERBOARD
const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find({})
      .select("name email points subscriptionPlan")
      .sort({ points: -1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE SUBSCRIPTION PLAN
const updateSubscription = async (req, res) => {
  try {
    const { plan } = req.body;

    const validPlans = ["FREE", "BRONZE", "SILVER", "GOLD"];

    if (!validPlans.includes(plan)) {
      return res.status(400).json({
        message: "Invalid subscription plan",
      });
    }

    const user = await User.findById(req.user._id);

    user.subscriptionPlan = plan;

    await user.save();

    res.json({
      message: "Subscription updated successfully",
      subscriptionPlan: user.subscriptionPlan,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  transferPoints,
  getLeaderboard,
  updateSubscription,
};