const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  name: { type: String, required: true },
  review: { type: String, required: true },
  wardId: { type: String, required: true },
  rating: { type: Number, default: 2, min: 1, max: 5 },
  sentiment: { type: String, required: true },
  votedIds: { type: [String], default: [] },
  createdAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model("review", reviewSchema);
