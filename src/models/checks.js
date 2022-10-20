const mongoose = require("mongoose");

const checksSchema = new mongoose.Schema({
  check: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 250,
  },
  status: {
    type: Number,
    required: true,
  },
  objectiveId: {
    type: String,
    required: true,
  },
});

const Checks = new mongoose.model("Checks", checksSchema);

module.exports = Checks;
