import React from "react";
import CourseCard from "./CourseCard";

function Sidebar({ courses, user }) {
  return (
    <div className="sidebar">
      <h3 className="p-2">My Courses</h3>
      {courses.length > 0 ? (
        courses.map((course, index) => (
          <CourseCard
            key={index}
            name={course.course}
            code={course.code}
            classID={course.class}
            isTeacher={user === "teacher" ? true : false}
          />
        ))
      ) : (
        <div className="text-danger px-2">No Courses yet</div>
      )}
    </div>
  );
}

export default Sidebar;
