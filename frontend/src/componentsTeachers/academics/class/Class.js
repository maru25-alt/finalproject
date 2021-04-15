import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import axios from "../../../store/axios";
import Loading from "../../../Loading";
import TableList from "../../../shared/tables/TableList";
import { useParams } from "react-router-dom";
import Attendances from "./ClassAttendance";

const tableHeader = [
  { id: "userID", name: "Student ID" },
  { id: "profileUrl", name: "Profile" },
  { id: "name", name: "Name" },
  { id: "middleName", name: "Middle Name" },
  { id: "surname", name: "Surname" },
  { id: "gender", name: "Gender" },
];

function Class() {
  const [classDetails, setclassDetails] = useState(null);
  const user = useSelector(selectUser);
  const [students, setstudents] = useState([]);
  const [loading, setloading] = useState(false);
  const [open, setopen] = useState(false);
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
      {loading && <Loading />}
      <h3>Class {id}</h3>
      <div className="d-flex justify-content-between  mb-3">
        <div className="content__container">
          <h6>Class Teacher: {classDetails?.teacherID}</h6>
          <h6>Class Prefect: {classDetails?.prefect || "-"}</h6>
          <h6>
            Number of Students:{" "}
            {students.length > 0 ? students.length : " No students"}
          </h6>
        </div>
        <div>
          <button onClick={() => setopen(true)} className="btn blue__btn">
            Attendances
          </button>
        </div>
      </div>
      <div className="content__container">
        {classDetails ? (
          <>
            <TableList
              noData="No students in this class"
              headCells={tableHeader}
              rows={students}
              noActions={true}
            />
          </>
        ) : (
          <h3>No Class Details yet </h3>
        )}
      </div>
      <Attendances open={open} setOpen={setopen} id={id} />
    </div>
  );
}

export default Class;
