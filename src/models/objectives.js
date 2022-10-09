const mongoose = require("mongoose");
const moment = require("moment");

const keyResultsSchema = new mongoose.Schema({
  keyResult: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 250,
  },
  confidence: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
});

const objectiveSchema = new mongoose.Schema({
  objective: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 250,
  },
  googleId: {
    type: String,
    required: true,
  },
  startDate: {
    type: Number,
    default: moment().unix(),
    required: true,
  },
  endDate: {
    type: Number,
    required: true,
  },
  keyResults: [keyResultsSchema],
  status: {
    type: Number,
    default: 0,
  },
  pin: {
    type: Boolean,
    default: false,
  },
  progress: {
    type: Number,
    default: 0,
  },
});

objectiveSchema.path("keyResults").validate(function (v) {
  return v.length > 0 && v.length <= 5;
});

const Objectives = new mongoose.model("Objectives", objectiveSchema);

module.exports = Objectives;
