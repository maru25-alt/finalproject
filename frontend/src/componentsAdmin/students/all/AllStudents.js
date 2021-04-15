import React, { useState, useEffect } from "react";
import TableList from "../../../shared/tables/TableList";
import axios from "../../../store/axios";
import { errorAlert } from "../../../utils";
import { studentStatus } from "../../../data";
import Search from "../../../shared/components/Search";
import { useSelector } from "react-redux";
import { selectClasses } from "../../../store/slices/schoolSlice";

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

function AllStudents() {
  const [rows, setrows] = useState([]);
  const [id, setid] = useState("");
  const [name, setname] = useState("");
  const [classID, setclassID] = useState("");
  const classes = useSelector(selectClasses);
  const [gender, setgender] = useState("");
  const [status, setstatus] = useState("");
  const [storeData, setstoreData] = useState([]);

  useEffect(() => {
    axios.get("/students").then((res) => {
      setrows(res.data);
      setstoreData(res.data);
    });
  }, []);

  const classesOptions = classes.map((e) => {
    return {
      name: e.name,
      id: e.classCode,
    };
  });

  const inputFields = [
    {
      type: "text",
      value: id,
      label: "Search by Student ID",
      name: "Student ID",
      onChange: setid,
    },
    {
      type: "text",
      label: "Search by Name",
      value: name,
      name: "Name",
      onChange: setname,
    },
    {
      type: "select",
      options: classesOptions,
      label: "Search by Class",
      value: classID,
      name: "Class",
      onChange: setclassID,
    },
    {
      type: "select",
      options: [
        { id: "female", name: "Female" },
        { id: "male", name: "male" },
      ],
      label: "Search by Gender",
      value: gender,
      name: "Class",
      onChange: setgender,
    },
    {
      type: "select",
      options: studentStatus,
      label: "Search by Status",
      value: status,
      name: "Class",
      onChange: setstatus,
    },
  ];

  const handleDelete = (i) => {
    console.log(i, "selected");
    let ans = window.confirm(`Are sure you want to  delete selected user ${i}`);
    if (ans) {
      axios.delete(`/user/delete/${i}`).then((res) => {
        if (res.data.error) {
          errorAlert(res.data.error);
        }
        setrows(rows.filter((e) => e.userID !== i));
      });
    }
  };
  const handleDeleteAll = (selected) => {
    let ans = window.confirm(`Are sure you want to  delete selected users `);
    if (ans) {
      axios.delete(`/user/delete/all/${selected}`).then((res) => {
        if (res.data.error) {
          errorAlert(res.data.error);
        }
        let newArr = rows;
        selected.map((y) => newArr.filter((e) => e._userID !== y));
        setrows(newArr);
      });
    }
  };

  const handleWithdraw = (i) => {
    let ans = window.confirm(
      `Are you sure you want to withdraw this student ${i}`
    );
    console.log(ans);
    if (ans) {
      axios.put(`/students/update/${i}`, { withdraw: true }).then((res) => {
        console.log(res.data);
        if (res.data.error) {
          errorAlert(res.data.error);
        }
        setrows(rows.filter((e) => e.userID !== i));
      });
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    let newStudents = [];
    if (classID) {
      newStudents = storeData.filter((i) =>
        i.classID.toLowerCase().includes(classID.toLowerCase())
      );
    }
    if (name) {
      newStudents = newStudents.filter(
        (i) =>
          i.name.toLowerCase().includes(name.toLowerCase()) ||
          i.surname.toLowerCase().includes(name.toLowerCase())
      );
    }
    if (id) {
      newStudents = newStudents.filter((i) =>
        i.userID.toLowerCase().includes(id.toLowerCase())
      );
    }
    if (status) {
      newStudents = newStudents.filter((i) =>
        i.status.toLowerCase().includes(status.toLowerCase())
      );
    }
    if (gender) {
      newStudents = newStudents.filter((i) =>
        i.gender.toLowerCase().includes(gender.toLowerCase())
      );
    }
    setrows(newStudents);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setname("");
    setid("");
    setclassID("");
    setgender("");
    setstatus("");
    setrows(storeData);
  };

  return (
    <div>
      {/* <h3>All Students</h3> */}
      <Search
        title=""
        handleReset={handleReset}
        handleSearch={handleSearch}
        inputFields={inputFields}
      />
      <TableList
        rows={rows}
        headCells={headCells}
        handleDeleteAll={handleDeleteAll}
        handleDelete={handleDelete}
        handleWithdraw={handleWithdraw}
        isStudents={true}
        routes="/students"
      ></TableList>
    </div>
  );
}

export default AllStudents;
