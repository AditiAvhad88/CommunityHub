const Answer = require("../models/Answer");
const User = require("../models/User");
const Notification = require("../models/Notification");
const Question = require("../models/Question");

// =======================
// Add Answer
// =======================
const addAnswer = async (req, res) => {
  try {
    // Find Question
    const question = await Question.findById(req.params.questionId);

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    // Create Answer
    const answer = await Answer.create({
      question: question._id,
      user: req.user._id,
      answer: req.body.answer,
    });

    // Give 5 points to answer creator
    await User.findByIdAndUpdate(req.user._id, {
      $inc: {
        points: 5,
      },
    });

    // Notify question owner (only if another user answered)
    if (question.user.toString() !== req.user._id.toString()) {
      await Notification.create({
        user: question.user,
        message: `${req.user.name} answered your question.`,
      });
    }

    res.status(201).json(answer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// Upvote Answer
// =======================
const upvoteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);

    if (!answer) {
      return res.status(404).json({
        message: "Answer not found",
      });
    }

    if (answer.upvotes.includes(req.user._id)) {
      return res.status(400).json({
        message: "You already upvoted this answer",
      });
    }

    answer.upvotes.push(req.user._id);

    await answer.save();

    // Give bonus after 5 upvotes
    if (answer.upvotes.length === 5) {
      await User.findByIdAndUpdate(answer.user, {
        $inc: {
          points: 5,
        },
      });
    }

    res.json(answer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// Delete Answer
// =======================
const deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);

    if (!answer) {
      return res.status(404).json({
        message: "Answer not found",
      });
    }

    // Only owner can delete
    if (answer.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized to delete this answer",
      });
    }

    await Answer.findByIdAndDelete(req.params.id);

    // Deduct 5 points
    await User.findByIdAndUpdate(req.user._id, {
      $inc: {
        points: -5,
      },
    });

    res.json({
      message: "Answer deleted and 5 points deducted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addAnswer,
  upvoteAnswer,
  deleteAnswer,
};