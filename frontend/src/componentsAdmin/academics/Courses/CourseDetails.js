import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../store/axios";
import Table from "../../../shared/tables/Table";

const tableHeader = [
  { id: "class", name: "Class" },
  { id: "teacher", name: "Teacher" },
];

function CourseDetails() {
  const [courseDetails, setcoursesDetails] = useState([]);
  const [classes, setclasses] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/courses/courseCode/${id}`).then((res) => {
      setcoursesDetails(res.data?.docs);
      setclasses(res.data.docs?.classes);
    });
  }, [id]);

  return (
    <div>
      <div className="content__container mb-5">
        <h5>Course : {courseDetails?.name}</h5>
        <h5>Department : {courseDetails?.department || "-"}</h5>
        <h5>Head Teacher : {courseDetails?.teacherID || "-"}</h5>
      </div>
      <div className="content__container mb-4">
        <h3>Classes</h3>
        <Table noActions={true} tableHeader={tableHeader} data={classes} />
      </div>
    </div>
  );
}

export default CourseDetails;
