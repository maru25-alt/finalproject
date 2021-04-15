import React from "react";

const Dashboard = React.lazy(() =>
  import("../../componentsTeachers/dashboard/Index")
);

//profile
const EditProfile = React.lazy(() =>
  import("../../componentsTeachers/profile/edit/Index")
);
const Profile = React.lazy(() =>
  import("../../componentsTeachers/profile/profile/Index")
);
const Payrow = React.lazy(() =>
  import("../../componentsTeachers/finances/Payrow")
);

//messages
const Attendance = React.lazy(() =>
  import("../../componentsTeachers/attendance/Index")
);

//attendance
const Messages = React.lazy(() =>
  import("../../componentsTeachers/chat/Inbox")
);

//settings
const Settings = React.lazy(() =>
  import("../../componentsTeachers/settings/SettingsPage")
);

//notification
const Notifications = React.lazy(() =>
  import("../../shared/notifications/Notifications")
);

//academics
const Classes = React.lazy(() =>
  import("../../componentsTeachers/academics/class/Classes")
);
const ClassDetails = React.lazy(() =>
  import("../../componentsTeachers/academics/class/Class")
);
const ClassesAttendance = React.lazy(() =>
  import("../../componentsTeachers/academics/class/ClassAttendance")
);

// const Courses = React.lazy(() =>
//   import("../../componentsTeachers/academics/courses/Courses.js")
// );
const Courses = React.lazy(() => import("../../shared/courses/Classes"));
const CourseDetails = React.lazy(() =>
  import("../../componentsTeachers/academics/courses/CourseDetails")
);
const AddCourseNotes = React.lazy(() =>
  import("../../componentsTeachers/academics/courses/AddCourseNote")
);

const Calendar = React.lazy(() =>
  import("../../shared/calender/SchoolCalendar")
);

const Timetable = React.lazy(() =>
  import("../../componentsTeachers/academics/timetable/TimeTable")
);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    exact: true,
    component: Dashboard,
  },
  {
    path: "/chat",
    name: "Chat",
    exact: true,
    component: Messages,
  },
  {
    path: "/chat/:id",
    name: "Chat",
    exact: true,
    component: Messages,
  },
  {
    path: "/academics/classes",
    name: "Classes",
    component: Classes,
    exact: true,
  },
  {
    path: "/academics/classes/:id",
    name: "Class Details",
    component: ClassDetails,
  },
  {
    path: "/academics/classes/attendance/:id",
    name: "Class Attendance",
    component: ClassesAttendance,
    exact: true,
  },
  {
    path: "/academics/courses",
    name: "Courses",
    exact: true,
    component: Courses,
  },
  {
    path: "/academics/courses/:id/:classID",
    name: "Course Details",
    component: Courses,
  },
  {
    path: "/academics/courses/add/:id",
    name: "Add Notes Courses",
    component: AddCourseNotes,
  },
  {
    path: "/academics/calendar",
    name: "Calendar",
    exact: true,
    component: Calendar,
  },
  {
    path: "/academics/timetable",
    name: "Timetable",
    exact: true,
    component: Timetable,
  },
  // {
  //   path: "/academics/courses/:id",
  //   name: "Course Details",
  //   component: CourseDetails,
  // },
  {
    path: "/profile",
    exact: true,
    name: "Profile",
    component: Profile,
  },
  {
    path: "/profile/edit",
    name: "Edit Profile",
    component: EditProfile,
  },
  {
    path: "/payrow",
    name: "Payrow",
    component: Payrow,
  },
  {
    path: "/attendance",
    name: "Attendance",
    component: Attendance,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: Notifications,
  },
];

export default routes;
