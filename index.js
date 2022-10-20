const express = require("express");
require("dotenv").config();

const loginRouter = require("./src/routers/login");
const objectiveRouter = require("./src/routers/objectives");
const weeklyPlansRouter = require("./src/routers/weeklyPlans");
const upcomingTasksRouter = require("./src/routers/upcomingTasks");
const checksRouter = require("./src/routers/checks");

require("./src/db/mongoose").connect();
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3002;

const whitelist = ["http://localhost:3000", "https://master.dxprp2nht6771.amplifyapp.com"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(loginRouter);
app.use(objectiveRouter);
app.use(weeklyPlansRouter);
app.use(upcomingTasksRouter);
app.use(checksRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
