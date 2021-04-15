import React from "react";
import { NavLink } from "react-router-dom";

function CourseCard({ name, code, classID, isTeacher }) {
  return (
    <NavLink
      activeStyle={{ backgroundColor: "red !important", color: "red" }}
      className="course__link"
      to={`/academics/courses/${code}/${classID}`}
    >
      <strong>{name}</strong>

      {isTeacher && <h5>{classID}</h5>}
    </NavLink>
  );
}

export default CourseCard;
