import React from "react";
import { Link } from "react-router-dom";

function CourseCard({ classData }) {
  return (
    <div className="content__container">
      <Link to={`/academics/courses/${classData?.id}`}>
        <h1>{classData?.name}</h1>
      </Link>
    </div>
  );
}

export default CourseCard;
