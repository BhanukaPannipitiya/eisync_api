const mongoose = require("mongoose");

const applianceSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  deviceType: {
    type: String,
  },
  power: {
    type: Number,
  },
  voltage: {
    type: Number,
  },
  onHours: {
    type: Number,
  },
  deviceModel: {
    type: String,
  },
  deviceBrand: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
  createdOn: {
    type: Date,
  },
  userId: {
    type: String,
  },
});

const Appliance = mongoose.model("Appliance", applianceSchema);

module.exports = Appliance;
