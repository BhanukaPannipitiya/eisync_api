const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true
    },
    goalName: {
      type: String
    },
    startDate: {
      type: Date 
    },
    endDate: {
      type: Date
    },
    goalAmount: {
      type: Number
    },
    isActive: {
      type: Boolean
    },
    status: {
      type: String
    },
    userId: {
      type: String
    }
  });

const Goal = mongoose.model("Goal", goalSchema);