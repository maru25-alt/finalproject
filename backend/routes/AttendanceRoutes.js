import express from "express";
import AttendanceModel from "../models/AttendenceModel.js";
import { role } from "../middlewares/variables.js";

const route = express.Router();

var start = new Date();
start.setHours(0, 0, 0, 0);

var end = new Date();
end.setHours(23, 59, 59, 999);

//get attendance
route.get("/", async (req, res) => {
  const docs = await AttendanceModel.find({
    createdAt: {
      $gte: start,
      $lt: end,
    },
  });

  res.json(docs);
});

//get user data
route.get("/:id", async (req, res) => {
  const docs = await AttendanceModel.find({
    userID: req.params.id,
  });

  res.json(docs);
});

//get students
route.get("/students/:date", async (req, res) => {
  let thisdate = new Date(req.params.date);
  let startTime = thisdate.setHours(0, 0, 0, 0);
  let endTime = thisdate.setHours(23, 59, 59, 999);
  const docs = await AttendanceModel.find({
    role: role.Student,
    createdAt: { $gte: startTime, $lt: endTime },
  });
  res.json(docs);
});

//get staff
route.get("/staff/:date", async (req, res) => {
  let thisdate = new Date(req.params.date);
  let startTime = thisdate.setHours(0, 0, 0, 0);
  let endTime = thisdate.setHours(23, 59, 59, 999);
  const docs = await AttendanceModel.find({
    $or: [{ role: role.Teacher }, { role: role.NonTeacher }],
    createdAt: { $gte: startTime, $lt: endTime },
  });
  res.json(docs);
});

// record start time
route.post("/start", async (req, res) => {
  //check whether already exist

  const isExist = await AttendanceModel.findOne({
    userID: req.body.userID,
    createdAt: {
      $gte: start,
      $lt: end,
    },
  });
  if (isExist) {
    return res.json({ success: false, error: "Already Registered" });
  }

  AttendanceModel.create({
    userID: req.body?.userID,
    role: req.body?.role,
    startLocation: req.body?.startLocation,
  })
    .then((doc) => {
      console.log(doc);
      res.json({ success: true, doc });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, error: err });
    });
});

//record end time
route.post("/end", async (req, res) => {
  //const now = new Date();
  //const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var today = new Date().toLocaleDateString(undefined, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  AttendanceModel.findOneAndUpdate(
    {
      userID: req.body.userID,
      endTime: null,
      createdAt: {
        $gte: start,
        $lt: end,
      },
    },
    {
      endTime: today,
      endLocation: req.body.endLocation,
    },
    {
      new: true,
    }
  )
    .then((doc) => {
      if (doc) {
        return res.json({ success: true, doc });
      } else {
        return res.json({
          success: false,
          error: "Already Recorded ",
        });
      }
    })
    .catch((err) => {
      return res.json({ success: false, error: err });
    });
});

export default route;
