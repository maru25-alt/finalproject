import React, { useState, useEffect } from "react";
import axios from "../../store/axios";
import Table from "../tables/TableList";

const headCells = [
  {
    id: "userID",
    numeric: false,
    disablePadding: true,
    label: "Student ID",
  },
  { id: "photoUrl", numeric: false, disablePadding: false, label: "Photo" },
  { id: "name", numeric: false, disablePadding: false, label: "Name" },
  {
    id: "middlename",
    numeric: false,
    disablePadding: false,
    label: "Middle Name",
  },
  { id: "surname", numeric: false, disablePadding: false, label: "Lastname" },
  { id: "classID", numeric: false, disablePadding: false, label: "Class" },
  { id: "gender", numeric: false, disablePadding: false, label: "Gender" },
  {
    id: "dateofBirth",
    numeric: false,
    disablePadding: false,
    label: "Date of Birth",
  },
];

function Index({ classID }) {
  const [classDetails, setclassDetails] = useState({});
  const [students, setstudents] = useState([]);
  console.log(classID);

  useEffect(() => {
    const getData = async () => {
      await axios.get(`/classes/classCode/${classID}`).then((res) => {
        console.log(res.data);
        setclassDetails(res.data.docs);
      });
      await axios.get(`/students/class/${classID}`).then((res) => {
        if (res.data.error) {
          return 0;
        }
        setstudents(res.data.docs);
      });
    };
    getData();
  }, [classID]);

  return (
    <>
      <div className="content__container text-center">
        <h3>{classDetails?.name}</h3>
        {/* <h6>{classDetails?.classCode}</h6> */}
        <div>
          <strong>Class Teacher: {classDetails?.teacherID}</strong> <br />
          <strong>Class Prefect: {classDetails?.prefect}</strong>
        </div>
      </div>
      <div className="content__container">
        {/* <h3>Student's List</h3> */}
        <Table
          rows={students}
          headCells={headCells}
          noActions={true}
          isStudents={true}
        />
      </div>
    </>
  );
}

export default Index;
