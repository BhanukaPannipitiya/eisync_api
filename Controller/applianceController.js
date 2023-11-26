const Appliance = require("../Models/appliance");
const CostEstimation = require("../Models/costEstimation");
const Goal = require("../Models/goal");

exports.AddAppliance = async (req, res) => {
  console.log("first", req.body);
  const appliance = new Appliance({
    deviceType: req.body.deviceType,
    power: req.body.power,
    voltage: req.body.voltage,
    onHours: req.body.onHours,
    deviceModel: req.body.deviceModel,
    deviceBrand: req.body.deviceBrand,
    isActive: true, // Remove quotes
    createdOn: Date.now(),
    userId: req.body.userId,
  });

  console.log("first", appliance);
  const savedAppliance = await appliance.save();

  res.json(savedAppliance);
};

//create a endpoint to get all appliances
exports.getAllAppliances = async (req, res) => {
  const appliances = await Appliance.find();
  res.json(appliances);
};

//create a endpoint to calculate total cost
exports.calculateTotalCost = async (req, res) => {
  try {
    const { devices, fixedUnits, fixPrice } = req.body;

    // Calculate the total cost for each device
    const deviceTotalCosts = devices.map((device) => {
      const powerInKilowatts = device.power / 1000;
      const energyConsumed = powerInKilowatts * device.activeHour;

      // Find the applicable unit price based on the total units consumed
      const applicableUnitPrice = fixedUnits.find(
        (unit) => energyConsumed >= unit.from && energyConsumed <= unit.to
      );

      // If a matching unit price is found, use it; otherwise, use a default of 0
      const unitPrice = applicableUnitPrice
        ? applicableUnitPrice.costPerUnit
        : 0;

      // Calculate the total cost for the device, including fixed charges if any
      const totalCost = energyConsumed * unitPrice + parseFloat(fixPrice || 0);

      return totalCost;
    });

    // Calculate the overall total bill
    const totalBill = deviceTotalCosts.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    res.json({ totalBill });
  } catch (error) {
    console.error("Error calculating total cost:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//to save estimations
exports.saveEstimation = async (req, res) => {
  try {
    const {
      fromDate,
      toDate,
      currencyType,
      estimatedCost,
      isActive,
      createdDate,
      userId,
    } = req.body;

    // Create a new CostEstimation instance
    const newEstimation = new CostEstimation({
      fromDate,
      toDate,
      currencyType,
      estimatedCost,
      isActive,
      createdDate,
      userId,
    });

    // Save to the database
    await newEstimation.save();

    res.status(201).json({ message: "Estimation saved successfully" });
  } catch (error) {
    console.error("Error saving estimation:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new goal
exports.createGoal = async (req, res) => {
  try {
    const {
      goalName,
      startDate,
      endDate,
      goalAmount,
      isActive,
      status,
      alertOverUsage,
      userId,
    } = req.body;

    const goal = new Goal({
      goalName,
      startDate,
      endDate,
      goalAmount,
      isActive,
      status,
      alertOverUsage,
      userId,
    });

    const savedGoal = await goal.save();
    res.json(savedGoal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
