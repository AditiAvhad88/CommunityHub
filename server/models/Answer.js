const mongoose = require("mongoose");

const answerSchema =
  mongoose.Schema(
    {
      question: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },

      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      answer: {
        type: String,
        required: true,
      },

      upvotes: [
        {
          type:
            mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Answer",
    answerSchema
  );