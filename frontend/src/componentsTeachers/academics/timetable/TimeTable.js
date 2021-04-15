import React, { useState, useEffect } from "react";
import Table from "../../../shared/timetable/Timeble";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import axios from "../../../store/axios";

function TimeTable() {
  const [data, setdata] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    const getData = async () => {
      await axios.get(`/timetable/teacher/${user?.userID}`).then((res) => {
        setdata(res.data.docs);
      });
    };
    getData();
  }, [user]);

  return (
    <div>
      <div className="content__container">
        <div className="">
          <h3>My Timetable</h3>
        </div>
        <Table data={data} />
      </div>
    </div>
  );
}

export default TimeTable;
