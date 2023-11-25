const express = require("express");
const {
  AddAppliance,
  createUser,
  getAllAppliances,
  calculateTotalCost,
  saveEstimation,
  createGoal,
} = require("../Controller/applianceController");
const router = express.Router();

router.post("/addAppliance", AddAppliance);
router.post("/calculateTotalCost", calculateTotalCost);
router.get("/getAllAppliances", getAllAppliances);
router.post("/saveEstimation", saveEstimation);
router.post("/createGoal", createGoal);

// router.post("/createUser", createUser);

module.exports = router;
