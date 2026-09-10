const Question = require("../models/Question");
const User = require("../models/User");
const Answer = require("../models/Answer");

// ASK QUESTION
const askQuestion = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    let limit = 1;

    switch (user.subscriptionPlan) {
      case "BRONZE":
        limit = 5;
        break;

      case "SILVER":
        limit = 10;
        break;

      case "GOLD":
        limit = Infinity;
        break;

      default:
        limit = 1;
    }

    if (
      limit !== Infinity &&
      user.questionCountToday >= limit
    ) {
      return res.status(400).json({
        message: "Daily question limit reached",
      });
    }

    const question = await Question.create({
      user: req.user._id,
      title: req.body.title,
      description: req.body.description,
    });

    user.questionCountToday += 1;
    await user.save();

    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE QUESTION
const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate("user", "name");

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    const answers = await Answer.find({
      question: req.params.id,
    }).populate("user", "name");

    res.json({
      question,
      answers,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL QUESTIONS
const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(questions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  askQuestion,
  getQuestions,
  getQuestionById,
};