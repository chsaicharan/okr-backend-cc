const express = require("express");
const router = new express.Router();

const WeeklyPlans = require("../models/weekly_plans");
const auth = require("../middleware/auth");

router.post("/weeklyplan", auth, async (req, res) => {
  try {
    const weeklyPlan = new WeeklyPlans(req.body);
    await weeklyPlan.save();
    res.status(201).send("Weekly Plan Created Successfully");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/weeklyplan", auth, async (req, res) => {
  try {
    const weeklyPlans = await WeeklyPlans.find({
      objectiveId: req.body.objectiveId,
    });
    res.send(weeklyPlans);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/weeklyplan", auth, async (req, res) => {
    try {
        await WeeklyPlans.deleteOne({ _id: req.body.id })
        res.status(200).send('Weekly Plan Deleted Successfully')
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;
