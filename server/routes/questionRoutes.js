const express = require("express");
const router = express.Router();

const {
  askQuestion,
  getQuestionById,
  getQuestions,
} = require("../controllers/questionController");

const {
  protect,
} = require("../middleware/authMiddleware");

router.get("/", getQuestions);

router.get("/:id", getQuestionById);

router.post("/", protect, askQuestion);

module.exports = router;
