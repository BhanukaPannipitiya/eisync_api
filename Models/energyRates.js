const mongoose = require("mongoose");

const energyRatesSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true
    },
    fixedCharge: {
      type: Number
    },
    fromUnit: {
      type: Number
    },
    toUnit: {
      type: Number  
    },
    charge: {
      type: Number
    },
    order: {
      type: Number
    },
    costEstimationId: {
      type: String
    }
  });

const EnergyRates = mongoose.model("EnergyRates", energyRatesSchema);