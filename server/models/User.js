const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

   language: {
  type: String,
  enum: [
    "en",
    "hi",
    "es",
    "pt",
    "zh",
    "fr"
  ],
  default: "en"
},

    points: {
      type: Number,
      default: 0,
    },

    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Subscription
    subscriptionPlan: {
      type: String,
      enum: [
        "FREE",
        "BRONZE",
        "SILVER",
        "GOLD",
      ],
      default: "FREE",
    },

    subscriptionExpiry: {
      type: Date,
    },

    // Daily Limits
    postCountToday: {
      type: Number,
      default: 0,
    },

    questionCountToday: {
      type: Number,
      default: 0,
    },

    // Forgot Password
    forgotPasswordDate: {
  type: Date,
},

otp: {
  type: String,
},

otpExpiry: {
  type: Date,
},
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.model(
    "User",
    userSchema
  );