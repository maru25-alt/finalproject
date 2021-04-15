import React, { useEffect, useState } from "react";
import Table from "../../../shared/tables/AttendanceTables";
import Search from "../../../shared/components/Search";
import axios from "../../../store/axios";
import moment from "moment";

const tableHeader = [
  { id: "userID", label: "Student ID" },
  { id: "name", label: "Name" },
  { id: "classID", label: "Class" },
  { id: "date", label: "Date" },
  { id: "startTime", label: "Start" },
  { id: "endTime", label: "End" },
];

function PastRecords() {
  const [data, setdata] = useState([]);
  const [date, setdate] = useState(moment().format("YYYY-MM-DD"));
  const [classID, setclassID] = useState("");
  const [classes, setclasses] = useState([]);
  const [storedata, setstoredata] = useState([]);
  // const classes = useSelector(selectClasses);

  useEffect(() => {
    axios.get("/classes").then((res) => {
      setclasses(res.data);
    });
  }, []);

  useEffect(() => {
    const getData = async () => {
      let studentsData = await axios.get("/students");
      let todayData = await axios.get(`/attendance/students/${date}`);
      let AllData = studentsData.data.map((e) => {
        let attendance = todayData.data.find((i) => i.userID === e.userID);
        return {
          ...e,
          startTime: attendance?.startTime,
          endTime: attendance?.endTime,
          date: date,
        };
      });
      setdata(AllData);
      setstoredata(AllData);
    };
    return getData();
  }, [date]);

  const classesOptions = classes.map((e) => {
    return {
      name: e.name,
      id: e.classCode,
    };
  });

  const inputFields = [
    {
      type: "select",
      options: classesOptions,
      label: "Search by Class",
      name: "class",
      value: classID,
      onChange: setclassID,
    },
    {
      type: "date",
      label: "Search by Date",
      name: "date",
      value: date,
      onChange: setdate,
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    if (classID || date) {
      let newArray = storedata;
      if (classID) {
        newArray = storedata.filter((e) => e.classID === classID);
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
    setdate(moment().format("YYYY-MM-DD"));
  };

  return (
    <div>
      <Search
        handleReset={handleReset}
        handleSearch={handleSearch}
        inputFields={inputFields}
      />
      <Table rows={data} headCells={tableHeader} />
    </div>
  );
}

export default PastRecords;
