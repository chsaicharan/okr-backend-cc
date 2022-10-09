const express = require("express");
const router = new express.Router();

const UpcomingTasks = require("../models/upcoming_tasks");
const auth = require("../middleware/auth");

router.post("/upcomingTask", auth, async (req, res) => {
  try {
    const upcomingTask = new UpcomingTasks(req.body);
    await upcomingTask.save();
    res.status(201).send("Upcoming Task Created Successfully");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/upcomingTask", auth, async (req, res) => {
  try {
    const upcomingTasks = await UpcomingTasks.find({
      objectiveId: req.body.objectiveid,
    });
    res.send(upcomingTasks);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/upcomingTask", auth, async (req, res) => {
  try {
    await UpcomingTasks.deleteOne({ _id: req.body.id });
    res.status(200).send("Upcoming Task Deleted Successfully");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
