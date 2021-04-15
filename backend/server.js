import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

//import routes
import AcademicYear from "./routes/CurrentYearRoutes.js";
import ActivitiesModel from "./routes/ActivitesRoutes.js";
import StudentRoutes from "./routes/StudentRoutes.js";
import PayrowRoutes from "./routes/PayrowRoutes.js";
import AttendanceRoutes from "./routes/AttendanceRoutes.js";
import ChatRoutes from "./routes/ChatRoutes.js";
import CoursesRoutes from "./routes/CoursesRoutes.js";
import CourseChatRoutes from "./routes/CourseChatRoutes.js";
import CourseResults from "./routes/CourseResults.js";
import ClassesRoutes from "./routes/ClassesRoutes.js";
import CampusRoutes from "./routes/CampusRoutes.js";
import CalendarRoutes from "./routes/CalendarRoutes.js";
import PrefectsRoutes from "./routes/PrefectsRoutes.js";
import FilesRoutes from "./routes/FilesRoutes.js";
import NextofKinRoutes from "./routes/NextofKinRoutes.js";
import NoticeBoardRoutes from "./routes/NoticeBoardRoutes.js";
import NotificationRoutes from "./routes/NotificationRoutes.js";
import NotificationMessageRoutes from "./routes/NotificationMessageRoutes.js";
import TaskRoutes from "./routes/TaskRoutes.js";
import Transactions from "./routes/TransactionsRoutes.js";
import TeacherRoutes from "./routes/TeacherRoutes.js";
import TimeTableRoutes from "./routes/TimetableRoutes.js";
import SchoolRoutes from "./routes/SchoolRoutes.js";
import PaymentPlanRoutes from "./routes/PaymentPlanRoutes.js";
import SharedRoutes from "./routes/SharedRoutes.js";
import StaffPay from "./routes/StaffPayRoutes.js";
import ScholarshipRoutes from "./routes/ScholarshipRoutes.js";
import SalaryRoutes from "./routes/SalaryRoutes.js";
import DepartmentsRoutes from "./routes/DepartmentRoutes.js";
import UploadsRoutes from "./routes/Uploads.js";
import BankingRoutes from "./routes/BankingRoutes.js";
import FeesRoutes from "./routes/FeesRoutes.js";
import NonTeachersRoutes from "./routes/NonTeachersRoutes.js";
import FeesPaymentRoutes from "./routes/FeesPaymentRoutes.js";
import YearGroupRoutes from "./routes/YeargroupRoutes.js";

import path from "path";
const __dirname = path.resolve(path.dirname(""));

const app = express();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/consumerPhotos"));
app.use(express.static("./public"));

//routes
app.get("/", (req, res) => {
  res.send("welcome to D-system api");
});

app.use("/api/students", StudentRoutes);
app.use("/api/attendance", AttendanceRoutes);
app.use("/api/academicyear", AcademicYear);
app.use("/api/activities", ActivitiesModel);
app.use("/api/chats", ChatRoutes);
app.use("/api/classes", ClassesRoutes);
app.use("/api/courses", CoursesRoutes);
app.use("/api/courseschat", CourseChatRoutes);
app.use("/api/coursesresults", CourseResults);
app.use("/api/campuses", CampusRoutes);
app.use("/api/calendar", CalendarRoutes);
app.use("/api/files", FilesRoutes);
app.use("/api/nextofkin", NextofKinRoutes);
app.use("/api/notice", NoticeBoardRoutes);
app.use("/api/notifications", NotificationRoutes);
app.use("/api/messagenotifications", NotificationMessageRoutes);
app.use("/api/staff", NonTeachersRoutes);
app.use("/api/tasks", TaskRoutes);
app.use("/api/transactions", Transactions);
app.use("/api/teachers", TeacherRoutes);
app.use("/api/timetable", TimeTableRoutes);
app.use("/api", SharedRoutes);
app.use("/api/scholarships", ScholarshipRoutes);
app.use("/api/staffpay", StaffPay);
app.use("/api/salary", SalaryRoutes);
app.use("/api/school", SchoolRoutes);
app.use("/api/prefects", PrefectsRoutes);
app.use("/api/paymentplan", PaymentPlanRoutes);
app.use("/api/payrow", PayrowRoutes);
app.use("/upload", UploadsRoutes);
app.use("/api/departments", DepartmentsRoutes);
app.use("/api/banking", BankingRoutes);
app.use("/api/fees", FeesRoutes);
app.use("/api/feespayment", FeesPaymentRoutes);
app.use("/api/yeargroup", YearGroupRoutes);

app.listen(PORT, () => {
  return console.log(`listening on port ${PORT}`);
});
