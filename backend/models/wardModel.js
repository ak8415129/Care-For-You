const mongoose = require("mongoose");

const wardSchema = mongoose.Schema({
  cleanPoints: { type: Number, default: 4 },
  patientNumber: { type: Number, default: 0 },
  wardName: { type: String, require: true },
  wardNumber: { type: Number, default: 0 },
  workerNumber: { type: Number, default: 0 },
});

module.exports = mongoose.model("Ward", wardSchema);
