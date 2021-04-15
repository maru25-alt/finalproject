import express from "express";
import StudentModel from "../models/StudentModel.js";
import bcrypt from "bcrypt";
import { login, changePassword } from "../middlewares/validate.js";
import { stringtoLowerCaseSpace } from "../middlewares/utils.js";
import { role } from "../middlewares/variables.js";
import FeesPaymentModel from "../models/FeesPaymentModel.js";
const route = express.Router();

//get all students
route.get("/", async (req, res) => {
  const data = await StudentModel.find({ role: role.Student }).sort({
    createdAt: "desc",
  });
  res.json(data);
});

//get one student by id
route.get("/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await StudentModel.findOne({ userID: req.params.id, role: role.Student })
    .then((user) => {
      if (user) {
        return res.json({ user });
      } else {
        return res.json({ error: "Student does not exists" });
      }
    })
    .catch((err) => {
      return res.json({ error: "WRONG error" });
    });
});

//unpaid fees
route.get("/unpaidfees/:year/:term", async (req, res) => {
  const docs = await FeesPaymentModel.find({
    year: req.params.year,
    term: req.params.term,
  });
  const students = await StudentModel.find({ role: role.Student });
  let results = students.map((e) => {
    let fees = docs.filter((i) => i.userID === e.userID);
    let user = fees[0];
    let totalAmount = fees.reduce((t, v) => Number(t) + Number(v.amount), 0);
    return {
      userID: e.userID,
      name: e.name + " " + e.surname,
      classID: e.classID,
      amount: totalAmount || 0,
      year: user?.year || null,
      term: user?.term || null,
      status: e?.status,
    };
  });

  res.json(results);
});

//get studentCourses
route.get("/student/courses/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await StudentModel.findOne({ userID: req.params.id, role: role.Student })
    .then((user) => {
      if (user) {
        return res.json({ docs: user?.courses });
      } else {
        return res.json({ error: "Student does not exists" });
      }
    })
    .catch((err) => {
      return res.json({ error: "WRONG error" });
    });
});

//search students by id or name
route.get("/search/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await StudentModel.find({
    role: role.Student,
    $or: [
      {
        userID: req.params.id,
      },
      {
        name: { $regex: req.params.id },
      },
      {
        lastname: { $regex: req.params.id },
      },
    ],
  })
    .then((docs) => {
      if (docs) {
        return res.json({ docs });
      } else {
        return res.json({ error: "Student does not exists" });
      }
    })
    .catch((err) => {
      return res.json({ error: "WRONG error" });
    });
});

//search students by id or name
route.get("/search/:id/:name/:classID", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await StudentModel.find({
    role: role.Student,
    $or: [
      {
        userID: { $regex: req.params.userID },
      },
      {
        name: { $regex: req.params.name },
      },
      {
        classID: req.params.classID,
      },
    ],
  })
    .then((docs) => {
      if (docs) {
        return res.json({ docs });
      } else {
        return res.json({ error: "Student does not exists" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({ error: "WRONG error" });
    });
});

//get all parents
route.get("/parents", async (req, res) => {
  await StudentModel.find({ role: role.Student })
    .then((user) => {
      if (user) {
        let results = user.map((a) => a.guadian);
        var merged = [].concat.apply([], results);
        return res.json({ docs: merged });
      } else {
        return res.json({
          error: "No parents details available",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({ error: "WRONG error" });
    });
});

//search parents
route.get("/parents/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await StudentModel.findOne({ userID: req.params.id })
    .then((user) => {
      if (user.guadian?.lenght > 0) {
        return res.json({ docs: user.guadian });
      } else {
        return res.json({
          error: "No parents details available",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({ error: "WRONG error" });
    });
});

//get students in class
route.get("/class/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await StudentModel.find({ classID: req.params.id, role: role.Student })
    .then((user) => {
      if (user.length > 0) {
        return res.json({ docs: user });
      } else {
        return res.json({ error: "No Students in this class" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({ error: "Server error" });
    });
});

//get students by gender, section , dormitory

//create student
route.post("/create", async (req, res) => {
  let body = req.body;
  console.log(body);

  const studentExist = await StudentModel.findOne({
    $and: [
      {
        email: body.email,
        name: body.name,
        surname: body.surname,
        role: role.Student,
      },
    ],
  });
  if (studentExist) {
    return res.json({ error: "Student already exist" });
  }

  //calculate student num
  const currentYear = new Date().getFullYear();
  const number = await StudentModel.countDocuments({ role: role.Student });
  let studentId = "BK" + currentYear + (number + 1);

  //check if userid exist
  const studentIDexist = await StudentModel.findOne({ userID: studentId });
  if (studentIDexist) {
    studentId = "BK" + currentYear + (number + 2);
  }

  bcrypt.hash(studentId, 10, (err, hash) => {
    if (err) {
      return res.json({ error: "something went wrong" });
    }
    const userData = {
      ...body,
      password: hash,
      userID: studentId,
    };
    StudentModel.create(userData)
      .then((user) => {
        return res.json({ student: user });
      })
      .catch((e) => {
        console.log(e);
        return res.json({ error: "something went wrong" });
      });
  });
});

//login
route.post("/signin", async (req, res) => {
  let body = req.body;
  body = {
    ...body,
    role: stringtoLowerCaseSpace(body.role),
  };
  const { error } = login.validate(body);
  if (error) {
    return res.send({ error: error.details[0].message });
  }

  StudentModel.findOne({
    userID: body.userID,
    role: body.role,
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          return res.json({ student: user });
        } else {
          return res.json({ error: "Wrong Password or Student ID" });
        }
      } else {
        return res.json({ error: "Wrong Password or Student ID" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

//update profile pic

//change password
route.put("/changePassword/:id", async (req, res) => {
  const { error } = changePassword.validate(req.body);
  if (error) {
    return res.json({ error: error.details[0].message });
  }
  StudentModel.findOne({ userID: req.params.id }).then((user) => {
    if (user) {
      if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
        bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
          if (err) {
            return res.json({ error: err });
          }
          StudentModel.findOneAndUpdate(
            {
              studentID: req.params.id,
            },
            { password: hash },
            {
              new: true,
            }
          )
            .then((doc) => {
              return res.json({
                success: true,
                message: "Password successfully changed",
              });
            })
            .catch((e) => {
              return res.json({ error: e + "e" });
            });
        });
      } else {
        return res.json({ error: "Wrong old password" });
      }
    } else {
      return res.json({ error: "Student does not exist" });
    }
  });
});

//update info
//address, nextof kin , classes, courses
//change password
route.put("/update/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  StudentModel.findOneAndUpdate(
    {
      userID: req.params.id,
    },
    req.body,
    {
      new: true,
    }
  )
    .then((doc) => {
      if (!doc) {
        return res.json({ error: "doex not exists" });
      }
      return res.json({ student: doc });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

//change students class
route.post("/upgrade/class", async (req, res) => {
  const { currentlass, nextclass } = req.body;

  StudentModel.updateMany(
    {
      role: role.Student,
      classID: currentlass,
    },
    { classID: nextclass },
    {
      new: true,
    }
  )
    .then((doc) => {
      if (!doc) {
        return res.json({ error: "doex not exists" });
      }
      return res.json({ student: doc });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

//change student dormitories
route.post("/upgrade/dormitories", async (req, res) => {
  const { currentdormitory, nextdormitory } = req.body;

  StudentModel.updateMany(
    {
      role: role.Student,
      dormitoryID: currentdormitory,
    },
    { dormitoryID: nextdormitory },
    {
      new: true,
    }
  )
    .then((doc) => {
      if (!doc) {
        return res.json({ success: false, error: "doex not exists" });
      }
      return res.json({ success: true, student: doc });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

//change student campus
route.post("/upgrade/campus", async (req, res) => {
  const { currentcampus, nextcampus } = req.body;

  StudentModel.updateMany(
    {
      role: role.Student,
      campusID: currentcampus,
    },
    { campusID: nextcampus },
    {
      new: true,
    }
  )
    .then((doc) => {
      if (!doc) {
        return res.json({ success: false, error: "doex not exists" });
      }
      return res.json({ success: true, student: doc });
    })
    .catch((err) => {
      res.json({ success: false, error: err });
    });
});

//delete student
route.delete("/delele/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  StudentModel.findOneAndRemove({
    userID: req.params.id,
  })
    .then((doc) => {
      if (!doc) {
        return;
      }
      return res.json({
        success: true,
        message: ` ${req.params.id} is successfully DELETED`,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
export default route;
