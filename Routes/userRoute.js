const express = require("express");
const {
  AddAppliance,
  calculateTotalCost,
  getAllAppliances,
  saveEstimation,
  updateDeviceOnHours,
  createGoal,
  removeDevice,
  getAllEstimationsByUserId,
} = require("../Controller/applianceController");
const {
  createUser,
  loginUser,
  getUserEmailById,
} = require("../Controller/userController");
const router = express.Router();

router.post("/addAppliance", AddAppliance);
router.post("/calculateTotalCost", calculateTotalCost);
router.get("/getAllAppliances", getAllAppliances);
router.post("/saveEstimation", saveEstimation);
router.post("/createGoal", createGoal);
router.post("/updateDeviceOnHours", updateDeviceOnHours);
router.post("/removeDevice", removeDevice);
router.post("/loginUser", loginUser);
router.post("/createUser", createUser);
router.get("/getUserEmailById",getUserEmailById);
router.get("/getAllEstimationsByUserId",getAllEstimationsByUserId);

// router.post("/createUser", createUser);

module.exports = router;
