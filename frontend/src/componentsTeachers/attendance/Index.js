import React, { useState, useEffect } from "react";
import Table from "../../shared/tables/Table";
import axios from "../../store/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";

const tableHeader = [
  { id: "createdAt", name: "Date" },
  { id: "startTime", name: "Start Time" },
  // { id: "startLocation", name: "Start Location" },
  { id: "endTime", name: "End Time" },
  //{ id: "endLocation", name: "End Location" },
];

function Index() {
  const [data, setdata] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    axios.get(`/attendance/${user?.userID}`).then((res) => {
      console.log(res.data);
      setdata(res.data);
    });
  }, [user]);

  return (
    <div>
      <h3 className="mb-3">My Attendance History</h3>
      <Table noActions={true} data={data} tableHeader={tableHeader} />
    </div>
  );
}

export default Index;
