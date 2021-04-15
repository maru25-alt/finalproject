import React from "react";

const Dashboard = React.lazy(() =>
  import("../../componentsStudents/dashboard/Index")
);
const Profile = React.lazy(() =>
  import("../../componentsStudents/profile/profile/Index")
);
const EditProfile = React.lazy(() =>
  import("../../componentsStudents/profile/edit/Index")
);
const Class = React.lazy(() =>
  import("../../componentsStudents/academics/Class/Index")
);
const Courses = React.lazy(() => import("../../shared/courses/Classes"));

const Calendar = React.lazy(() =>
  import("../../shared/calender/SchoolCalendar")
);
const Attendance = React.lazy(() =>
  import("../../componentsStudents/attendance/Index")
);
const TimeTable = React.lazy(() =>
  import("../../componentsStudents/academics/timetable/TimeTable")
);

const Messages = React.lazy(() =>
  import("../../componentsStudents/chats/inbox/Index")
);
const MessageAdmin = React.lazy(() =>
  import("../../componentsStudents/chats/messageAdmin/Index")
);
const MessageTeacher = React.lazy(() =>
  import("../../componentsStudents/chats/messageTeacher/Index")
);

const Notifications = React.lazy(() =>
  import("../../shared/notifications/Notifications")
);
const Settings = React.lazy(() =>
  import("../../componentsStudents/settings/Index")
);

//finamce
const FeesPayments = React.lazy(() =>
  import("../../componentsStudents/finances/Fees")
);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    exact: true,
    component: Dashboard,
  },
  {
    path: "/profile",
    name: "Profile",
    exact: true,
    component: Profile,
  },
  {
    path: "/profile/edit",
    name: "Edit Profile",
    component: EditProfile,
  },
  {
    path: "/academics/class",
    name: "Class",
    component: Class,
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
    path: "/academics/calendar",
    name: "Calendar",
    component: Calendar,
  },
  {
    path: "/academics/timetable",
    name: "Timetable",
    component: TimeTable,
  },
  {
    path: "/finance/fees",
    name: "Fees",
    exact: true,
    component: FeesPayments,
  },
  {
    path: "/attendance",
    name: "Attendance",
    component: Attendance,
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: Notifications,
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
    path: "/message/admin",
    name: "Messages",
    exact: true,
    component: MessageAdmin,
  },
  {
    path: "/message/teacher",
    name: "Messages",
    exact: true,
    component: MessageTeacher,
  },
  {
    path: "/message/:id",
    name: "Messages",
    component: Messages,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
];

export default routes;
