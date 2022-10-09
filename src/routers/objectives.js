const express = require("express");
const router = new express.Router();
const moment = require("moment");

const Objectives = require("../models/objectives");
const auth = require("../middleware/auth");

//get all objectives api
router.get("/objectives", auth, async (req, res) => {
  try {
    console.log(req);
    const objectives = await Objectives.find({ googleId: req.body.googleId });
    res.send(objectives);
  } catch (e) {
    res.status(400).send(e);
  }
});

// add objective api
router.post("/objective", auth, async (req, res) => {
  try {
    req.body.endDate = moment()
      .quarter(moment().quarter())
      .endOf("quarter")
      .unix();
    console.log(req.body);
    const objective = new Objectives(req.body);
    await objective.save();
    res.status(201).send("Objective Created Successfully");
  } catch (e) {
    res.status(400).send(e);
  }
});

// //star or pin objective api
// router.put("/objective/pin/:objectiveId", auth, async (req, res) => {
//   try {
//     const id = req.params.objectiveId;
//     const objective = await Objectives.findOneAndUpdate({ _id: id }, [
//       { $set: { pin: { $eq: [false, "$pin"] } } },
//     ]);
//     const objectives = await Objectives.find({ googleId: req.body.googleId });
//     res.status(200).send(objectives);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

//get objective details api
// router.get('')

module.exports = router;