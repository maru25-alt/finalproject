import React from "react";

const Dashboard = React.lazy(() =>
  import("../../componentsNonTeachers/dashboard/Index")
);

//profile
const EditProfile = React.lazy(() =>
  import("../../componentsNonTeachers/profile/EditProfile")
);

const Profile = React.lazy(() =>
  import("../../componentsNonTeachers/profile/Profile")
);

//messages
const Attendance = React.lazy(() =>
  import("../../componentsNonTeachers/attendance/Attendance")
);

//attendance
const Messages = React.lazy(() =>
  import("../../componentsNonTeachers/chat/Inbox")
);

//settings
const Settings = React.lazy(() =>
  import("../../componentsNonTeachers/settings/Settings")
);

//notification
const Notifications = React.lazy(() =>
  import("../../shared/notifications/Notifications")
);

const Calendar = React.lazy(() =>
  import("../../shared/calender/SchoolCalendar")
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
    name: "Chat Messages",
    component: Messages,
  },
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
    path: "/attendance",
    name: "Attendance",
    component: Attendance,
  },
  {
    path: "/academics/calendar",
    name: "School Calendar",
    component: Calendar,
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
