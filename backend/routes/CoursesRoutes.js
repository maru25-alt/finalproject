import express from "express";
import CoursesModel from "../models/CoursesModel.js";
import { stringtoLowerCase } from "../middlewares/utils.js";

const route = express.Router();

route.get("/", async (req, res) => {
  const doc = await CoursesModel.find();
  res.json(doc);
});

//get one by id
route.get("/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await CoursesModel.findOne({ _id: req.params.id })
    .then((docs) => {
      if (docs) {
        return res.json({ success: true, docs });
      } else {
        return res.json({ success: false, error: "Does not exists" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({ success: false, error: "Server error" });
    });
});

//get by coursecode
route.get("/courseCode/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await CoursesModel.findOne({ code: req.params.id })
    .then((docs) => {
      if (docs) {
        return res.json({ success: true, docs });
      } else {
        return res.json({ success: false, error: "Does not exists" });
      }
    })
    .catch((err) => {
      return res.json({ success: false, error: "Server error" });
    });
});

//return teacher courses
route.get("/teacher/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await CoursesModel.find({ "classes.teacher": req.params.id })
    .then((docs) => {
      return res.json({ success: true, docs });
    })
    .catch((err) => {
      console.log(err);
      return res.json({ success: false, error: "Server error" });
    });
});

//student  courses
route.get("/class/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await CoursesModel.find({ "classes.class": req.params.id })
    .then((docs) => {
      return res.json({ success: true, docs });
    })
    .catch((err) => {
      console.log(err);
      return res.json({ success: false, error: "Server error" });
    });
});

//search
route.get("search/:teacher/:name", async (res, req) => {
  const doc = await CoursesModel.find({
    teacher: req.params?.teacher,
    name: req.params?.name,
  });
  res.json(doc);
});

//create
route.post("/create", async (req, res) => {
  let body = req.body;
  body = {
    ...body,
    code: stringtoLowerCase(body.name),
    name: stringtoLowerCase(body.name),
  };

  const departExist = await CoursesModel.findOne({
    name: body.name,
    code: body.code,
  });
  if (departExist) {
    return res.json({ success: false, error: "Course already exist" });
  }

  CoursesModel.create(body)
    .then((doc) => {
      console.log(doc);
      res.json({ success: true, doc });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, message: err });
    });
});

//edit
route.put("/update/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  CoursesModel.findOneAndUpdate(
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
        return res.json({ success: false, error: "doex not exists" });
      }
      return res.json({ success: true, doc });
    })
    .catch((err) => {
      res.json({ success: false, message: err });
    });
});

//delete
route.delete("/delete/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  CoursesModel.findOneAndRemove({
    _id: req.params.id,
  })
    .then((doc) => {
      res.json({ success: true, doc });
    })
    .catch((err) => {
      res.status(500).json({ success: false, error: err });
    });
});

export default route;
