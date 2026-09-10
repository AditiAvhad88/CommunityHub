const express = require("express");

const router =
  express.Router();

const {
  buyPlan,
} = require(
  "../controllers/subscriptionController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

router.post(
  "/buy",
  protect,
  buyPlan
);

module.exports = router;