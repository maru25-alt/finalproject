import express from "express";
import TaskModel from "../models/TimetableModel.js";

const route = express.Router();

route.get("/", async (req, res) => {
  const data = await TaskModel.find();
  res.json(data);
});

//get one by id
route.get("/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await TaskModel.findOne({ _id: req.params.id })
    .then((doc) => {
      if (doc) {
        return res.json({ success: true, doc });
      } else {
        return res.json({ success: false, error: "Does not exists" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({ success: false, error: "Server error" });
    });
});

//get one by id
route.get("/class/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await TaskModel.find({ classID: req.params.id })
    .then((docs) => {
      return res.json({ success: true, docs });
    })
    .catch((err) => {
      return res.json({ success: false, error: "Server error" });
    });
});

route.get("/teacher/:id", async (req, res) => {
  await TaskModel.find({ teacherID: req.params.id })
    .then((docs) => {
      return res.json({ success: true, docs });
    })
    .catch((err) => {
      return res.json({ success: false, error: "Server error" });
    });
});

//create task
route.post("/create", async (req, res) => {
  let body = req.body;
  let isExist = await TaskModel.findOne({
    classID: body.classID,
    period: body.period,
    day: body.day,
  });

  if (isExist) {
    await TaskModel.findOneAndUpdate(
      {
        _id: isExist._id,
      },
      { deadline: req.body.deadline },
      {
        new: true,
      }
    )
      .then((doc) => {
        res.json({ success: true, doc });
      })
      .catch((err) => {
        res.json({ success: false, message: err });
      });
  } else {
    await TaskModel.create(body)
      .then((doc) => {
        console.log(doc);
        res.json({ success: true, doc });
      })
      .catch((err) => {
        res.json({ success: false, message: err });
      });
  }
});

//change dateline
route.put("/changeDeadline:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  TaskModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { deadline: req.body.deadline },
    {
      new: true,
    }
  )
    .then((doc) => {
      console.log(doc);
      res.json({ success: true, doc });
    })
    .catch((err) => {
      res.json({ success: false, message: err });
    });
});

//edit task
route.put("/update/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  TaskModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    {
      new: true,
    }
  )
    .then((doc) => {
      console.log(doc);
      if (!doc) {
        return res.json({ success: false, error: "does not exists" });
      }
      return res.json({ success: true, doc });
    })
    .catch((err) => {
      res.json({ success: false, message: err });
    });
});

//delete task
route.delete("/delete/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  TaskModel.findOneAndRemove({
    _id: req.params.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

export default route;
