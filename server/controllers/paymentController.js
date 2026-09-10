const User = require("../models/User");
const Subscription = require("../models/Subscription");

const activatePlan = async (req, res) => {
  try {
    const { userId, plan } = req.body;

    const hour = new Date().getHours();

    if (hour < 10 || hour >= 11) {
      return res.status(400).json({
        message:
          "Payments allowed only between 10 AM and 11 AM IST",
      });
    }

    let amount = 0;

    if (plan === "BRONZE")
      amount = 100;

    if (plan === "SILVER")
      amount = 300;

    if (plan === "GOLD")
      amount = 1000;

    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + 1);

    await Subscription.create({
      userId,
      plan,
      amount,
      expiryDate: expiry,
      paymentStatus: "SUCCESS",
    });

    await User.findByIdAndUpdate(
      userId,
      {
        subscriptionPlan: plan,
      }
    );

    res.status(200).json({
      message:
        `${plan} plan activated successfully`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  activatePlan,
};