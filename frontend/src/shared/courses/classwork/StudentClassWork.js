import React, { useState, useEffect } from "react";
import axios from "../../../store/axios";

function StudentClassWork({ user, id, classID }) {
  const [data, setdata] = useState([]);

  useEffect(() => {
    axios.get(`/coursesresults/student/${user?.userID}`).then((res) => {
      setdata(res.data.docs);
    });
  }, [user]);

  let newData = data.filter((e) => e.course === id);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Task</th>
            <th scope="col">Score </th>
            <th scope="col">Out of</th>
          </tr>
        </thead>
        <tbody>
          {newData &&
            newData.map((e, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{e.course || "-"}</td>
                <td>{e.score || "-"}</td>
                <td>{e.score || "-"}</td>
                <td>{e.totalScore || "-"}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentClassWork;
