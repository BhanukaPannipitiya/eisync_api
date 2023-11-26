const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const costEstimationSchema = new mongoose.Schema({
    id: {
      type: String, 
      default: uuidv4,
      required: true
    },
    fromDate: {
      type: Date
    },
    toDate: {
      type: Date
    },
    currencyType: {
      type: String
    },
    estimatedCost: {
      type: Number
    },
    isActive: {
      type: Boolean
    },
    createdDate: {
      type: Date
    },
    userId: {
      type: String
    }
  });

const CostEstimation = mongoose.model("CostEstimation", costEstimationSchema);
module.exports = CostEstimation;