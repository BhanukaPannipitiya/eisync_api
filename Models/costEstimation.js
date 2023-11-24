const mongoose = require("mongoose");

const costEstimationSchema = new mongoose.Schema({
    id: {
      type: String, 
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