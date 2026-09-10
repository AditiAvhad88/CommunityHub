const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

const buyPlan = async (req, res) => {
  try {
    const { plan } = req.body;

    const user = await User.findById(
      req.user._id
    );

    // IST Time
    const now = new Date();

    const istHour =
      (now.getUTCHours() + 5) % 24;

    const istMinute =
      (now.getUTCMinutes() + 30) % 60;

    const currentHour =
      istMinute >= 60
        ? istHour + 1
        : istHour;

    // Payment only between 10 and 11 AM
    /*

if (
  currentHour < 10 ||
  currentHour >= 11
) {
  return res.status(400).json({
    message:
      "Payments are allowed only between 10:00 AM and 11:00 AM IST",
  });
}

*/
    let price = 0;

    switch (plan) {
      case "BRONZE":
        price = 100;
        break;

      case "SILVER":
        price = 300;
        break;

      case "GOLD":
        price = 1000;
        break;

      default:
        return res.status(400).json({
          message: "Invalid Plan",
        });
    }

    // Fake Payment Success
    user.subscriptionPlan = plan;

    const expiry = new Date();
    expiry.setMonth(
      expiry.getMonth() + 1
    );

    user.subscriptionExpiry =
      expiry;

    user.questionCountToday = 0;

    await user.save();

    // Send Invoice Email
    await sendEmail(
      user.email,
      "Subscription Purchased",
      `
Hello ${user.name},

Subscription Plan: ${plan}
Amount Paid: ₹${price}
Valid Till: ${expiry.toDateString()}

Thank you for purchasing.
CommunityHub Team
`
    );

    res.json({
      message:
        "Subscription Purchased Successfully",
      plan,
      amount: price,
      validTill: expiry,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  buyPlan,
};