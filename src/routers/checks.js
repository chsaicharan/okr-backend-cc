const express = require("express");
const router = new express.Router();

const Checks = require("../models/checks");
const auth = require("../middleware/auth");

router.post("/checks", auth, async (req, res) => {
  try {
    const check = new Checks(req.body);
    await check.save();
    // res.status(201).send("Check Created Successfully");
    const checks = await Checks.find({
        objectiveId: req.body.objectiveId,
      });
      console.log(checks,'post');
      res.send(checks);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/checks/:objectiveId", auth, async (req, res) => {
  try {
    const { objectiveId } = req.params
    const checks = await Checks.find({
      objectiveId: objectiveId,
    });
    res.send(checks);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/check", auth, async (req, res) => {
  try {
    const checkId = req.body.checkId;
    await Checks.findOneAndUpdate(
      { _id: checkId },
      { status: req.body.status }
    );
    const checks = await Checks.find({
      objectiveId: req.body.objectiveId,
    });
    res.send(checks);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
