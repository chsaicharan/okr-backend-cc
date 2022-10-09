const mongoose = require("mongoose");

const upcomingTasksSchema = new mongoose.Schema({
  upcomingTask: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 250,
  },
  objectiveId: {
    type: String,
    required: true,
  },
});

const UpcomingTasks = new mongoose.model("UpcomingTasks", upcomingTasksSchema);

module.exports = UpcomingTasks;
