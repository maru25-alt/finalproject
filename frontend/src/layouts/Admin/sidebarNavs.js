import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Admin Dashboard",
    to: "/",
    icon: (
      <CIcon
        name="cil-speedometer"
        customClasses="c-sidebar-nav-icon sidebarIcon"
      />
    ),
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Students",
    route: "/students",
    icon: (
      <CIcon
        name="cil-people"
        customClasses="c-sidebar-nav-icon  sidebarIcon"
      />
    ),
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "All Students",
        to: "/students",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Registration New",
        to: "/students/new",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Prefects",
        to: "/students/prefects",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Teachers",
    route: "/teachers",
    icon: (
      <CIcon
        name="cil-people"
        customClasses="c-sidebar-nav-icon  sidebarIcon"
      />
    ),
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "All Teachers",
        to: "/teachers",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Add New Teacher",
        to: "/teachers/new",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Staff",
    route: "/staff",
    icon: (
      <CIcon
        name="cil-people"
        customClasses="c-sidebar-nav-icon  sidebarIcon"
      />
    ),
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "All Staff",
        to: "/staff",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Add Staff",
        to: "/staff/new",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Academics",
    route: "/academics",
    icon: (
      <CIcon
        name="cil-paperclip"
        customClasses="c-sidebar-nav-icon sidebarIcon"
      />
    ),
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Classes",
        to: "/academics/classes",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Courses",
        to: "/academics/courses",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Departments",
        to: "/academics/departments",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Timetable",
        to: "/academics/timetable",
      },
      {
        _tag: "CSidebarNavItem",
        name: "School Calendar",
        to: "/academics/calendar",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Attendance",
    route: "/attendance",
    icon: (
      <CIcon name="cil-notes" customClasses="c-sidebar-nav-icon sidebarIcon" />
    ),
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: `Student's Attendance`,
        to: "/attendance/students",
      },
      {
        _tag: "CSidebarNavItem",
        name: `Staff's Attendance`,
        to: "/attendance/staff",
      },
    ],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Finance",
    route: "/finance",
    icon: (
      <CIcon name="cil-notes" customClasses="c-sidebar-nav-icon sidebarIcon" />
    ),
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: " Fees",
        to: "/finance/fees",
      },
      {
        _tag: "CSidebarNavItem",
        name: " Payrow",
        to: "/finance/payrow",
      },
    ],
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Message",
    route: "/messages",
    icon: (
      <CIcon
        name="cil-chat-bubble"
        customClasses="c-sidebar-nav-icon sidebarIcon"
      />
    ),
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Inbox",
        to: "/chat",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Message Students",
        to: "/messages/students",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Message Staff",
        to: "/messages/staff",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Message Guadian",
        to: "/messages/guadian",
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Notice Board",
    to: "/notifications",
    icon: (
      <CIcon name="cil-bell" customClasses="c-sidebar-nav-icon sidebarIcon" />
    ),
  },
  {
    _tag: "CSidebarNavItem",
    name: "Reports",
    to: "/reports",
    icon: (
      <CIcon
        name="cil-settings"
        customClasses="c-sidebar-nav-icon sidebarIcon"
      />
    ),
  },
  {
    _tag: "CSidebarNavItem",
    name: "Account Settings",
    to: "/settings",
    icon: (
      <CIcon
        name="cil-settings"
        customClasses="c-sidebar-nav-icon sidebarIcon"
      />
    ),
  },
];

export default _nav;
