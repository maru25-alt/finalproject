import React from "react";

const Dashboard = React.lazy(() =>
  import("../../componentsAdmin/dashboard/Index")
);
const Settings = React.lazy(() =>
  import("../../componentsAdmin/settings/SettingsPage")
);
const Notifications = React.lazy(() =>
  import("../../shared/notifications/Notifications")
);

//message
const Messages = React.lazy(() =>
  import("../../componentsAdmin/chat/inbox/Index")
);
const GuadianMessages = React.lazy(() =>
  import("../../componentsAdmin/chat/messageParents/Index")
);
const StaffMessages = React.lazy(() =>
  import("../../componentsAdmin/chat/messageStaff/Index")
);
const StudentMessage = React.lazy(() =>
  import("../../componentsAdmin/chat/messageStudent/Index")
);
// const BillReminder = React.lazy(() =>
//   import("../../componentsAdmin/messages/BillReminder")
// );

//academics
const Calendar = React.lazy(() =>
  import("../../shared/calender/SchoolCalendar")
);
// const AddCalendarEvent = React.lazy(() =>
//   import("../../componentsAdmin/academics/Calendar/AddEventCalendar")
// );
// const EditCalendarEvent = React.lazy(() =>
//   import("../../componentsAdmin/academics/Calendar/EditCalendarEvent")
// );
const Classes = React.lazy(() =>
  import("../../componentsAdmin/academics/Classes/ClassesPage")
);
const Class = React.lazy(() =>
  import("../../componentsAdmin/academics/Classes/ClassDetails")
);
const AddClass = React.lazy(() =>
  import("../../componentsAdmin/academics/Classes/AddClass")
);
// const EditClass = React.lazy(() =>
//   import("../../componentsAdmin/academics/classes/EditClass")
// );
const Courses = React.lazy(() =>
  import("../../componentsAdmin/academics/Courses/CoursesPage")
);
const AddCourse = React.lazy(() =>
  import("../../componentsAdmin/academics/Courses/AddCourses")
);
const CourseDetails = React.lazy(() =>
  import("../../componentsAdmin/academics/Courses/CourseDetails")
);

const Departments = React.lazy(() =>
  import("../../componentsAdmin/academics/Departments/Departments")
);

const TimeTable = React.lazy(() =>
  import("../../componentsAdmin/academics/timetable/Timetable")
);

//students
const AllStudents = React.lazy(() =>
  import("../../componentsAdmin/students/all/AllStudents")
);
const Upgrade = React.lazy(() =>
  import("../../componentsAdmin/students/upgrading/Index")
);

const NewStudent = React.lazy(() =>
  import("../../componentsAdmin/students/create/CreateStudent")
);
const EditStudent = React.lazy(() =>
  import("../../componentsAdmin/students/edit/EditStudent")
);
const ProfileStudent = React.lazy(() =>
  import("../../componentsAdmin/students/view/Profile")
);

const Prefects = React.lazy(() =>
  import("../../componentsAdmin/students/prefects/Prefects")
);

//staff
const AddStaff = React.lazy(() =>
  import("../../componentsAdmin/staff/create/AddNewStaff")
);
const Staff = React.lazy(() =>
  import("../../componentsAdmin/staff/all/AllStaff")
);
const StaffProfile = React.lazy(() =>
  import("../../componentsAdmin/staff/profile/Profile")
);
const EditStaff = React.lazy(() =>
  import("../../componentsAdmin/staff/edit/EditProfie")
);

//teachers
const Teachers = React.lazy(() =>
  import("../../componentsAdmin/teachers/all/AllStaff")
);

const AddTeacher = React.lazy(() =>
  import("../../componentsAdmin/teachers/create/CreateStaff")
);
const TeacherProfile = React.lazy(() =>
  import("../../componentsAdmin/teachers/profile/Profile")
);
const EditTeacher = React.lazy(() =>
  import("../../componentsAdmin/teachers/edit/EditProfile")
);

const Fees = React.lazy(() =>
  import("../../componentsAdmin/finance/fees/Fees")
);
const SetFees = React.lazy(() =>
  import("../../componentsAdmin/finance/fees/setFee/SetFees")
);
const RecordPayment = React.lazy(() =>
  import("../../componentsAdmin/finance/fees/recordPayment/RecordPayment")
);
const FeesDebtors = React.lazy(() =>
  import("../../componentsAdmin/finance/fees/ViewDebtors")
);

const PaySlip = React.lazy(() =>
  import("../../componentsAdmin/finance/payrow/PaySlip")
);
const PayrowPay = React.lazy(() =>
  import("../../componentsAdmin/finance/payrow/PaySalary")
);
const SetPayrow = React.lazy(() =>
  import("../../componentsAdmin/finance/payrow/setsalary/Payrow")
);
const Payrow = React.lazy(() =>
  import("../../componentsAdmin/finance/payrow/Payrow")
);

//attendance
const StudentsAttendanceHistory = React.lazy(() =>
  import("../../componentsAdmin/attendance/students/PastRecords")
);

const StaffAttendanceHistory = React.lazy(() =>
  import("../../componentsAdmin/attendance/staff/PastRecords")
);

//reports
const Reports = React.lazy(() =>
  import("../../componentsAdmin/reports/Profile")
);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    exact: true,
    component: Dashboard,
  },
  {
    path: "/attendance/students",
    name: "Attendance Students",
    exact: true,
    component: StudentsAttendanceHistory,
  },
  {
    path: "/reports",
    name: "Reports",
    exact: true,
    component: Reports,
  },
  {
    path: "/attendance/staff",
    name: "Attendance Staff",
    exact: true,
    component: StaffAttendanceHistory,
  },
  {
    path: "/academics/calendar",
    name: "Calendar",
    exact: true,
    component: Calendar,
  },
  {
    path: "/academics/classes",
    name: "Classes",
    exact: true,
    component: Classes,
  },
  {
    path: "/academics/timetable",
    name: "Timetable",
    exact: true,
    component: TimeTable,
  },
  {
    path: "/academics/classes/new",
    name: "New Class ",
    component: AddClass,
  },
  {
    path: "/academics/classes/:id",
    name: "Class Details",
    component: Class,
  },
  {
    path: "/academics/courses",
    name: "Courses",
    exact: true,
    component: Courses,
  },
  {
    path: "/academics/courses/new",
    name: "New Courses",
    component: AddCourse,
  },
  {
    path: "/academics/departments",
    name: "Depatments",
    component: Departments,
  },
  {
    path: "/academics/courses/:id",
    name: " Courses Details",
    component: CourseDetails,
  },
  {
    path: "/students",
    name: "Students",
    exact: true,
    component: AllStudents,
  },
  {
    path: "/students/new",
    name: "New Student",
    component: NewStudent,
  },
  {
    path: "/students/edit/:id",
    name: "Edit Student",
    component: EditStudent,
  },
  {
    path: "/students/profile/:id",
    name: "Profile Student",
    component: ProfileStudent,
  },
  {
    path: "/students/prefects",
    name: "Prefects",
    component: Prefects,
  },

  {
    path: "/students/upgrade",
    name: "Upgrade",
    component: Upgrade,
  },
  {
    path: "/staff",
    name: "All Staff ",
    exact: true,
    component: Staff,
  },
  {
    path: "/staff/new",
    name: "New Staff ",
    component: AddStaff,
  },
  {
    path: "/staff/edit/:id",
    name: "Edit Staff ",
    component: EditStaff,
  },
  {
    path: "/staff/profile/:id",
    name: "Profile Staff ",
    component: StaffProfile,
  },
  {
    path: "/teachers",
    name: "All Teachers ",
    exact: true,
    component: Teachers,
  },
  {
    path: "/teachers/new",
    name: "New Teacher ",
    component: AddTeacher,
  },
  {
    path: "/teachers/edit/:id",
    name: "Edit Teacher ",
    component: EditTeacher,
  },
  {
    path: "/teachers/profile/:id",
    name: "Profile Teacher ",
    component: TeacherProfile,
  },
  {
    path: "/finance/fees",
    name: "Fees",
    exact: true,
    component: Fees,
  },
  {
    path: "/finance/fees/set",
    name: "Set Fees",
    component: SetFees,
  },
  {
    path: "/finance/fees/debtors",
    name: "Set Fees",
    component: FeesDebtors,
  },
  {
    path: "/finance/fees/payment",
    name: "Set Fees",
    component: RecordPayment,
  },
  {
    path: "/finance/payrow",
    name: "Payrow Details",
    exact: true,
    component: Payrow,
  },
  {
    path: "/finance/payrow/payslip/:id",
    name: "PaySlip ",
    component: PaySlip,
  },
  {
    path: "/finance/payrow/set",
    name: "Set Payrow ",
    component: SetPayrow,
  },
  {
    path: "/finance/payrow/pay",
    name: " Payrow Payment",
    component: PayrowPay,
  },
  {
    path: "/chat",
    exact: true,
    name: "Messages",
    component: Messages,
  },
  {
    path: "/chat/:id",
    name: "Chat Messages",
    component: Messages,
  },
  {
    path: "/messages/students",
    exact: true,
    name: "Student Messages",
    component: StudentMessage,
  },
  {
    path: "/messages/staff",
    name: "Staff Messages",
    exact: true,
    component: StaffMessages,
  },
  {
    path: "/messages/guadian",
    name: "Guadian Messages",
    exact: true,
    component: GuadianMessages,
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: Notifications,
  },
  {
    path: "/settings",
    name: "Acoount Settings",
    component: Settings,
  },
];

export default routes;
