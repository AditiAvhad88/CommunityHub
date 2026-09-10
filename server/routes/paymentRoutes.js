const express = require("express");
const router = express.Router();

const {
  activatePlan,
} = require(
  "../controllers/paymentController"
);

router.post(
  "/activate-plan",
  activatePlan
);

module.exports = router;