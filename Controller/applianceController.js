const Appliance = require("../Models/appliance");
const CostEstimation = require("../Models/costEstimation");
const Goal = require("../Models/goal");

exports.AddAppliance = async (req, res) => {
  console.log("Request Body:", req.body);

  const appliance = new Appliance({
    deviceType: req.body.deviceType,
    power: req.body.power,
    voltage: req.body.voltage,
    onHours: req.body.onHours,
    deviceModel: req.body.deviceModel,
    deviceBrand: req.body.deviceBrand,
    isActive: true, // Remove quotes
    createdOn: new Date(),
    deviceONStatus: req.body.deviceONStatus, // Include the deviceONStatus field
    userId: req.body.userId,
  });

  console.log("Created Appliance:", appliance);

  try {
    const savedAppliance = await appliance.save();
    console.log("Saved Appliance:", savedAppliance);
    res.json(savedAppliance);
  } catch (error) {
    console.error("Error saving appliance:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//create a endpoint to get all appliances
exports.getAllAppliances = async (req, res) => {
  try {
    // Assuming you have a userId parameter in the query
    const { id } = req.query;
    console.log("userId", id);

    // Fetch appliances based on the userId
    const appliances = await Appliance.find({ userId: id });
    console.log("appliances", appliances);
    // Send the appliances as a JSON response
    res.json(appliances);
  } catch (error) {
    // Handle errors, such as database errors
    console.error("Error fetching appliances:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllActiveAppliances = async (req, res) => {
  try {
    const { id } = req.query;
    console.log("Hitted at getAllActiveAppliances");

    const activeAppliances = await Appliance.find({
      userId: id,
      deviceONStatus: true,
    });

    const activeDeviceCount = activeAppliances.length;

    // Calculate total power consumption
    let totalPower = 0;
    activeAppliances.forEach((appliance) => {
      totalPower += appliance.power;
    });

    console.log("Active Device Count:", activeDeviceCount);
    console.log("Total Power Consumption:", totalPower);

    res.json({ activeDeviceCount, totalPower });
  } catch (error) {
    console.error("Error fetching appliances:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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
      totalCost,
      isActive,
      createdDate,
      userId,
    } = req.body;
    console.log("Request Body:", req.body);
    // Create a new CostEstimation instance
    const newEstimation = new CostEstimation({
      fromDate,
      toDate,
      currencyType,
      estimatedCost: totalCost,
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

//get estimations by id
exports.getAllEstimationsByUserId = async (req, res) => {
  try {
    const { userId } = req.params; // Assuming userId is a parameter in the URL

    // Fetch all estimations for the given userId
    const estimations = await CostEstimation.find({ userId });
    console.log("estimations", estimations);
    res.status(200).json(estimations);
  } catch (error) {
    console.error("Error fetching estimations:", error.message);
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

//update device onHours
exports.updateDeviceOnHours = async (req, res) => {
  try {
    const { deviceId, onHours } = req.body;

    // Find the appliance by deviceId
    const appliance = await Appliance.findById(deviceId);

    if (!appliance) {
      return res.status(404).json({ error: "Device not found" });
    }

    // Update the onHours field
    appliance.deviceONStatus = onHours;

    // Save the updated appliance
    const updatedAppliance = await appliance.save();
    console.log(updatedAppliance);

    res.json(updatedAppliance);
  } catch (error) {
    console.error("Error updating device onHours:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//remove appliance or deactivate by setting isActive to false
exports.removeDevice = async (req, res) => {
  try {
    const { deviceId } = req.body;

    // Find the appliance by deviceId
    const appliance = await Appliance.findById(deviceId);

    if (!appliance) {
      return res.status(404).json({ error: "Device not found" });
    }

    // If you want to deactivate the device, set isActive to false
    appliance.isActive = false;

    // Save the updated appliance
    const updatedAppliance = await appliance.save();

    res.json(updatedAppliance);
  } catch (error) {
    console.error("Error deactivating device:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
