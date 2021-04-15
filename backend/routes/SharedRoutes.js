import express from "express";
import { uploader } from "../middlewares/multer.js";
import StudentModel from "../models/StudentModel.js";
import AttendanceModel from "../models/AttendenceModel.js";
import CoursesModels from "../models/CoursesModel.js";
import ClassesModel from "../models/ClassesModel.js";
import Campus from "../models/CampusesModel.js";
import CalendarModel from "../models/CalenderModel.js";
import PrefectsModel from "../models/PrefectsModel.js";
import Sections from "../models/SectionModel.js";
import NotificationsModel from "../models/Activities.js";
import ScholarshipsModels from "../models/ScholarshipsModel.js";
import TeacherModels from "../models/TeacherModel.js";
import NonTeacherModels from "../models/NonTeacherModel.js";
import DepartmentsModels from "../models/DepartmentsModel.js";
import { changePassword, login } from "../middlewares/validate.js";
import { role } from "../middlewares/variables.js";
import moment from "moment";
import bcrypt from "bcrypt";

const dt = new Date();
const month = dt.getMonth();
const year = dt.getFullYear();
const route = express.Router();

route.get("/", async (req, res) => {
  res.send("shared rotes");
});
//$or : [{role: role.Teacher}, {role: role.NonTeacher}]
route.get("/staff", async (req, res) => {
  const data = await TeacherModels.find({
    $or: [{ role: role.Teacher }, { role: role.NonTeacher }],
  });
  res.json(data);
});

//search user
route.get("/users/search/:id", async (req, res) => {
  const data = await TeacherModels.find({
    $or: [
      { userID: req.params.id },
      { name: { $regex: req.params.id } },
      { surname: { $regex: req.params.id } },
    ],
  });
  res.json(data);
});

//staff count
route.get("/staff/count/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  const staff = await TeacherModels.findOne({
    role: role.Teacher,
    userID: req.params.id,
  });

  const notifications = await NotificationsModel.find({
    date: { $gte: new Date() },
  });

  let date = new Date();
  date.setDate(date.getDate() - 30);
  const attendance = await AttendanceModel.find({
    "users.userID": req.params.id,
    date: { $gte: date },
  });

  const docs = await CalendarModel.find({ date: { $gte: date } });

  return res.json({
    success: true,
    count: {
      courses: staff?.courses?.length,
      classes: staff?.classID,
      attendance: attendance?.length,
      notifications: notifications?.length,
      events: docs?.length,
    },
  });
});

//count
route.get("/student/count/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }

  const student = await StudentModel.findOne({
    role: role.Student,
    userID: req.params.id,
  });

  const notifications = await NotificationsModel.find({
    date: { $gte: new Date() },
  });

  let date = new Date();
  var daysInMonth = new Date(year, month + 1, 0).getDate();
  date.setDate(date.getDate() - daysInMonth);
  const attendance = await AttendanceModel.find({
    "users.userID": req.params.id,
    createdAt: { $gte: date },
  });

  const docs = await CalendarModel.find({ date: { $gte: date } });

  return res.json({
    success: true,
    count: {
      courses: student?.courses?.length,
      attendance: attendance?.length,
      notifications: notifications?.length,
      events: docs?.length,
    },
  });
});

route.get("/count/dashboard", async (req, res) => {
  const students = await StudentModel.countDocuments({ role: role.Student });
  const nonTeachers = await NonTeacherModels.countDocuments({
    role: role.Student,
  });
  const teachers = await TeacherModels.countDocuments({ role: role.Teacher });
  const classes = await ClassesModel.countDocuments();

  const prefects = await PrefectsModel.countDocuments();
  const courses = await CoursesModels.countDocuments();
  const departments = await DepartmentsModels.countDocuments();

  return res.json({
    classes,
    departments,
    prefects,
    teachers,
    nonTeachers,
    students,
    courses,
  });
});

route.get("/count", async (req, res) => {
  const today = moment().startOf("day");
  const day = moment().get("date");

  const getBirthday = (arr, m, d) => {
    return arr.filter(
      (e) =>
        moment(e.dateofBirth || 0).get("month") === m &&
        moment(e.dateofBirth || 0).get("date") === d
    );
  };

  const students = await StudentModel.countDocuments({ role: role.Student });

  const femaleStudents = await StudentModel.countDocuments({
    role: role.Student,
    gender: "female",
  });
  const maleStudents = await StudentModel.countDocuments({
    role: role.Student,
    gender: "male",
  });

  const studentsData = await StudentModel.find({
    role: role.Student,
  }).exec();

  //non teachers
  const nonTeachers = await NonTeacherModels.countDocuments({
    role: role.NonTeacher,
  });
  const femaleNonTeachers = await NonTeacherModels.countDocuments({
    role: role.NonTeacher,
    gender: "female",
  });
  const maleNonTeachers = await NonTeacherModels.countDocuments({
    role: role.NonTeacher,
    gender: "male",
  });

  const NonTeachersData = await NonTeacherModels.find({
    role: role.NonTeacher,
  }).exec();

  const yesterdayBirthdayStudents = getBirthday(studentsData, month, day - 1)
    .length;

  const todayBirthdayStudents = getBirthday(studentsData, month, day).length;

  const tomorrowBirthdayStudents = getBirthday(studentsData, month, day + 1)
    .length;

  const todayRegisteredStudents = await StudentModel.countDocuments({
    role: role.Student,
    createdAt: {
      $gte: today.toDate(),
      $lte: moment(today).endOf("day").toDate(),
    },
  });
  const yesterdayRegisteredStudents = await StudentModel.countDocuments({
    role: role.Student,
    createdAt: {
      $gte: today.subtract(1, "days").toDate(),
      $lte: moment(today).subtract(1, "days").endOf("day").toDate(),
    },
  });

  const teachers = await TeacherModels.countDocuments({ role: role.Teacher });
  const femaleTeachers = await TeacherModels.countDocuments({
    role: role.Teacher,
    gender: "female",
  });
  const maleTeachers = await TeacherModels.countDocuments({
    role: role.Teacher,
    gender: "male",
  });

  const teachersData = await TeacherModels.find({
    role: role.Teacher,
  }).exec();

  const todayBirthdayStaff = getBirthday(teachersData, month, day).length;

  const yesterdayBirthdayStaff = getBirthday(teachersData, month, day - 1)
    .length;

  const tomorrowBirthdayStaff = getBirthday(teachersData, month, day + 1)
    .length;
  const campuses = await Campus.countDocuments();
  const classes = await ClassesModel.countDocuments();
  const prefects = await PrefectsModel.countDocuments();
  const sections = await Sections.countDocuments();
  const courses = await CoursesModels.countDocuments();
  const departments = await DepartmentsModels.countDocuments();
  const scholarships = await ScholarshipsModels.countDocuments();

  res.json({
    todayBirthdayStudents,
    todayBirthdayStaff,
    yesterdayBirthdayStaff,
    tomorrowBirthdayStaff,
    yesterdayBirthdayStudents,
    todayRegisteredStudents,
    yesterdayRegisteredStudents,
    tomorrowBirthdayStudents,
    campuses,
    scholarships,
    classes,
    courses,
    sections,
    departments,
    prefects,
    students,
    femaleStudents,
    maleStudents,
    nonTeachers,
    femaleNonTeachers,
    maleNonTeachers,
    femaleTeachers,
    maleTeachers,
    teachers,
    teachersData,
  });
});

route.post("/upload", uploader.single("photo"), (req, res) => {
  console.log(req.file);
  try {
    console.log(req.file.filename);
    res.send({ path: `${req.file.filename}` });
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
});

//get student's class details
route.get("/student/classDetails/:id", (req, res) => {
  let userID = req.params.id;
  if (!userID) {
    return res.json({ success: false, error: "User ID is required" });
  }
  //get user
  const user = StudentModel.findOne({ userID });
  if (!user) {
    return res.json({ success: false, error: "Student Does not exists" });
  }
  const classID = user?.classID;
  if (classID) {
    const classDetails = ClassesModel.findOne({ classCode: classID });
    return res.json({ success: true, class: classDetails });
  }
});

//find user by id
route.get("/user/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await StudentModel.findOne({ userID: req.params.id })
    .then((user) => {
      if (user) {
        return res.json({ success: true, user });
      } else {
        return res.json({ success: false, error: "User does not exists" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({ success: false, error: "WRONG error" });
    });
});

//signin user
route.post("/signin", async (req, res) => {
  let body = req.body;

  const { error } = login.validate(body);
  if (error) {
    return res.send({ error: error.details[0].message, success: false });
  }

  StudentModel.findOne({
    userID: body.userID,
  })
    .then(async (user) => {
      console.log(user);
      if (!user) {
        return res.json({ error: "Wrong Password or  ID", success: false });
      }
      //console.log(user);
      let correctPassword = bcrypt.compareSync(body.password, user.password);
      console.log(correctPassword);
      if (!correctPassword) {
        return res.json({ error: "Wrong Password or  ID", success: false });
      }

      return res.json({ success: true, user });
    })
    .catch((err) => {
      console.log(err);
      return res.json({ error: "Something when wrong", success: false });
    });
});

//upload profile
route.post("/update/profile/:id", async (req, res) => {
  StudentModel.findOneAndUpdate(
    {
      userID: req.params.id,
    },
    req.body,
    { new: true }
  )
    .then((user) => {
      if (user) {
        return res.json({ success: true, user });
      } else {
        return res.json({ error: "something when wrong", success: false });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.json({ error: "something when wrong", success: false });
    });
});

//change password
route.post("/change/password/:id", async (req, res) => {
  const { error } = changePassword.validate(req.body);
  if (error) {
    return res.json({ success: false, error: error.details[0].message });
  }
  StudentModel.findOne({ userID: req.params.id }).then((user) => {
    if (user) {
      if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
        bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
          if (err) {
            console.log("err");
            return res.json({ success: false, error: err });
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
              console.log("e");
              return res.json({ success: false, error: e + "e" });
            });
        });
      } else {
        return res.json({ success: false, error: "Wrong old password" });
      }
    } else {
      return res.json({ success: false, error: "User  does not exist" });
    }
  });
});

//forget password
route.post("/forgetpassword", async (req, res) => {
  const studentIDexist = await StudentModel.findOne({
    userID: req.body.userID,
  });

  if (!studentIDexist) {
    return res.json({ error: "Wrong userID" });
  }

  const token = crypto.randomBytes(20).toString("hex");

  await StudentModel.findOneAndUpdate(
    {
      userID: req.body.userID,
    },
    {
      resetPassowrdToken: token,
      resetPasswordExpires: Date.now() + 3600000,
    },
    {
      new: true,
    }
  );

  const mailOptions = {
    from: "rudomaru25@email.com",
    to: req.body.email,
    subject: "Link to reset Password",
    html:
      "<!DOCTYPE html>" +
      "<html><head><title>Appointment</title>" +
      "</head><body>" +
      " <p> You are receiving this because you (or someone else) has requested the reset of your password . \n\n Please click on the following link or paste into your browser within one hour of receiving the it.  </p>" +
      "<a href='" +
      process.env.FRONT_END +
      "/password/reset/" +
      token +
      "'>" +
      process.env.FRONT_END +
      "/password/reset/" +
      token +
      "} </a>" +
      " <br/> <br/>" +
      " <p> If you did not request this , please ignore this email and your password will remain unchanged. </p>" +
      "</body></html>",
  };

  transport.sendMail(mailOptions, (error, data) => {
    if (error) {
      console.log(error);
      return res.send({ error: error.response });
    }
    return res.json(data);
  });
});

//reset password
route.post("/resetpassword", async (req, res) => {
  const isExist = await StudentModel.findOne({
    resetPassowrdToken: req.body.token,
    resetPasswordExpires: {
      $gte: Date.now(),
    },
  });

  if (!isExist) {
    return res.json({ error: "Reset Code expired" });
  }
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, error: err });
    }
    StudentModel.findByIdAndUpdate(
      { _id: isExist._id },
      {
        password: hash,
      },
      {
        new: true,
      }
    ).then((respons) => {
      console.log(respons);
      return res.json({
        success: true,
        user: respons,
      });
    });
  });
});

route.delete("/user/delete/:id", (req, res) => {
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
