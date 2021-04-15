import React, { useState, useEffect } from "react";
import TableList from "../../../shared/tables/TableList";
import axios from "../../../store/axios";
import { useParams } from "react-router-dom";

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

function ClassDetails() {
  const [students, setstudents] = useState([]);
  const [classDetails, setclassDetails] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      let classData = await axios.get(`/classes/classCode/${id}`);
      setclassDetails(classData.data.docs);
      let studentsData = await axios.get(
        `/students/class/${classData.data.docs.classCode}`
      );
      if (studentsData.data.error) {
        setstudents([]);
      } else {
        setstudents(studentsData.data.docs);
      }
    };

    getData();
  }, [id]);

  return (
    <div>
      <div className="content__container mb-3">
        <h3>Class {id}</h3>
        <h6>
          <strong>Year {classDetails?.academicYear || "-"}</strong>
        </h6>
        <div className="d-flex mt-3 w-100 flex-wrap justify-content-around">
          <div className=" text-center">
            <h6>Students in Class</h6>
            <h5>
              {students?.length > 0 ? (
                students?.length
              ) : (
                <span className="text-danger">no students yet </span>
              )}
            </h5>
          </div>
          <div className=" text-center">
            <h6>Class Teacher</h6>
            <h5>
              {classDetails?.teacherID || (
                <span className="text-danger">not appointed </span>
              )}
            </h5>
          </div>
          <div className=" text-center">
            <h6>Class Prefect</h6>
            <h5>
              {classDetails?.prefect || (
                <span className="text-danger">not appointed </span>
              )}
            </h5>
          </div>
        </div>
      </div>

      <TableList
        rows={students}
        noActions={true}
        headCells={headCells}
        isStudents={true}
        routes="/students"
      ></TableList>
    </div>
  );
}

export default ClassDetails;
