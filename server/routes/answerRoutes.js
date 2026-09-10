const express = require("express");
const router = express.Router();

const {
  addAnswer,
  upvoteAnswer,
  deleteAnswer,
} = require(
  "../controllers/answerController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

router.post(
  "/:questionId",
  protect,
  addAnswer
);

router.put(
  "/:id/upvote",
  protect,
  upvoteAnswer
);

router.delete(
  "/:id",
  protect,
  deleteAnswer
);

module.exports = router;