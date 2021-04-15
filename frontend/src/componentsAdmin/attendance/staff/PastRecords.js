import React, { useState, useEffect } from "react";
import Table from "../../../shared/tables/AttendanceTablesStaff";
import Search from "../../../shared/components/Search";
import axios from "../../../store/axios";
import moment from "moment";

const tableHeader = [
  { id: "userID", label: "Staff ID" },
  { id: "name", label: "Name" },
  { id: "date", label: "Date" },
  { id: "startTime", label: "Start" },
  { id: "endTime", label: "End" },
];

function PastRecords() {
  const [data, setdata] = useState([]);
  const [date, setdate] = useState(moment().format("YYYY-MM-DD"));
  const [name, setname] = useState("");
  const [storedata, setstoredata] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let teachers = await axios.get("/staff");
      let attendance = await axios.get(`/attendance/staff/${date}`);
      let allData = teachers.data?.map((res) => {
        let thisattendance = attendance.data.find(
          (i) => i.userID === res.userID
        );

        return {
          ...res,
          date: date,
          endTime: thisattendance?.endTime,
          startTime: thisattendance?.startTime,
        };
      });
      setdata(allData);
      setstoredata(allData);
    };
    return getData();
  }, [date]);

  const inputFields = [
    {
      type: "text",
      label: "Search by Name",
      name: "",
      value: name,
      onChange: setname,
    },
    {
      type: "date",
      label: "Search by Date",
      name: "",
      value: date,
      onChange: setdate,
    },
  ];

  const handelSearch = (e) => {
    e.preventDefault();
    if (name || date) {
      let newArray = storedata;
      if (name) {
        newArray = storedata.filter(
          (e) => e.name.includes(name) || e.surname.includes(name)
        );
      }

      if (date) {
        newArray = newArray.filter((e) => e.date === date);
      }
      setdate(newArray);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setdata(storedata);
    setname("");
    setdate(moment().format("YYYY-MM-DD"));
  };
  return (
    <div>
      <Search
        handleReset={handleReset}
        handleSearch={handelSearch}
        inputFields={inputFields}
      />
      <Table rows={data} headCells={tableHeader} />
    </div>
  );
}

export default PastRecords;
