import express from "express";
import ClassesModel from "../models/ClassesModel.js";
import { stringtoLowerCaseSpace } from "../middlewares/utils.js";
import StudentModel from "../models/StudentModel.js";
import { role } from "../middlewares/variables.js";
//import {createClass} from '../middlewares/validate.js'
const route = express.Router();

route.get("/", async (req, res) => {
  let students = await StudentModel.find({ role: role.Student });
  const docs = await ClassesModel.find().sort({
    createdAt: "desc",
  });

  let classData = docs.map((e) => {
    return {
      classCode: e.classCode,
      name: e.name,
      _id: e._id,
      academicYear: e.academicYear,
      prefect: e.prefect,
      teacherID: e.teacherID,
      students: students.filter((i) => i.classID === e.classCode).length,
    };
  });
  res.json(classData);
});

//get one by id
route.get("/teacher/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await ClassesModel.find({ teacherID: req.params.id })
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

//get one by id
route.get("/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await ClassesModel.findOne({ _id: req.params.id })
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

//get by classCode
route.get("/classCode/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await ClassesModel.findOne({ classCode: req.params.id })
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

//create
route.post("/create", async (req, res) => {
  let body = req.body;

  body = {
    ...body,
    name: body.name,
    classCode: stringtoLowerCaseSpace(body.name),
  };

  const classExist = await ClassesModel.findOne({
    classCode: body.classCode,
  });
  if (classExist) {
    return res.json({ success: false, error: "Course already exist" });
  }

  ClassesModel.create(body)
    .then((doc) => {
      res.json({ success: true, doc });
    })
    .catch((err) => {
      res.json({ success: false, message: err });
    });
});

//edit
route.put("/update/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  ClassesModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    {
      new: true,
    }
  )
    .then((doc) => {
      if (!doc) {
        return res.json({ success: false, error: "does not exists" });
      }
      return res.json({ success: true, doc });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

//delete
route.delete("/delete/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  ClassesModel.findOneAndRemove({
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
