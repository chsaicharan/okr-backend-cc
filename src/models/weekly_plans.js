const mongoose = require("mongoose");
const moment = require("moment");

const weeklyPlansSchema = new mongoose.Schema({
  weeklyPlan: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 250,
  },
  objectiveId: {
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
    default: moment().endOf("week").unix(),
  },
  status: {
    type: Boolean,
    default: false,
  },
});

const WeeklyPlans = new mongoose.model("WeeklyPlans", weeklyPlansSchema);

module.exports = WeeklyPlans;
