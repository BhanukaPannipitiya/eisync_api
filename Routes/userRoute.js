const express = require("express");
const { AddAppliance, createUser } = require("../Controller/applianceController");
const router = express.Router();

router.post("/addAppliance", AddAppliance);

// router.post("/createUser", createUser);

module.exports = router;
