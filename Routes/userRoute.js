const express = require("express");
const {
  createUser,
  loginUser,
  updateDeviceOnHours,
  removeDevice,
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

// router.post("/createUser", createUser);

module.exports = router;
