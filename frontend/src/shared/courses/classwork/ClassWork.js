import React from "react";
import axios from "../../../store/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import StudentWork from "./StudentClassWork";
import TeacherWork from "./TeacherClassWork";

function ClassWork({ courseID, classID }) {
  const user = useSelector(selectUser);

  return (
    <div>
      {user?.role === "student" ? (
        <StudentWork user={user} courseID={courseID} classID={classID} />
      ) : (
        <TeacherWork user={user} id={courseID} classID={classID} />
      )}
    </div>
  );
}

export default ClassWork;
