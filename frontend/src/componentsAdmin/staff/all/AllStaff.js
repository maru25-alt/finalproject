import React, { useState, useEffect } from "react";
import TableList from "../../../shared/tables/TableList";
import axios from "../../../store/axios";
import { errorAlert } from "../../../utils";
import Search from "../../../shared/components/Search";

const headCells = [
  {
    id: "userID",
    numeric: false,
    disablePadding: true,
    label: "Student ID",
  },
  {
    id: "photoUrl",
    numeric: false,
    disablePadding: false,
    label: "Photo",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "middlename",
    numeric: false,
    disablePadding: false,
    label: "Middle Name",
  },
  {
    id: "surname",
    numeric: false,
    disablePadding: false,
    label: "Lastname",
  },
  {
    id: "dateofBirth",
    numeric: false,
    disablePadding: false,
    label: "Date of Birth",
  },
];

function AllStudents() {
  const [rows, setrows] = useState([]);
  const [name, setname] = useState("");
  const [userID, setuserID] = useState("");
  const [storeData, setstoreData] = useState([]);

  useEffect(() => {
    axios.get("/nonteachers").then((res) => {
      setrows(res.data);
      setstoreData(res.data);
    });
  }, []);

  const inputFields = [
    {
      type: "text",
      label: "Search by Name",
      name: "",
      value: name,
      onChange: setname,
    },
    {
      type: "text",
      label: "Search by UserID",
      name: "",
      value: userID,
      onChange: setuserID,
    },
  ];

  const handleDelete = (id) => {
    let ans = window.confirm(`Are sure you want to delete user ${id}`);
    if (ans) {
      axios.delete(`/nonteachers/delete/${id}`).then((res) => {
        if (res.data.error) {
          errorAlert(res.data.error);
        }
        setrows(rows.filter((i) => i.userID !== id));
      });
    }
  };

  const handleDeleteAll = (selected) => {
    let ans = window.confirm(`Are sure you want to  delete selected users `);
    if (ans) {
      axios.delete(`/nonteachers/delete/all/${selected}`).then((res) => {
        if (res.data.error) {
          errorAlert(res.data.error);
        }
        let newArr = rows;
        selected.map((y) => newArr.filter((e) => e._userID !== y));
        setrows(newArr);
      });
    }
  };

  const handleWithdraw = (id) => {
    let ans = window.confirm(
      `Are you sure you want to withdraw this student ${id}`
    );
    console.log(ans);
    if (ans) {
      axios.put(`/nonteachers/update/${id}`, { withdraw: true }).then((res) => {
        console.log(res.data);
        if (res.data.error) {
          errorAlert(res.data.error);
        }
        setrows(rows.filter((e) => e.userID !== id));
      });
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setrows(storeData);
    setname("");
    setuserID("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let newStaff = [];
    if (name) {
      newStaff = storeData.filter(
        (i) =>
          i.name.toLowerCase().includes(name.toLowerCase()) ||
          i.surname.toLowerCase().includes(name.toLowerCase())
      );
    }
    if (userID) {
      newStaff = storeData.filter((i) =>
        i.userID.toLowerCase().includes(userID.toLowerCase())
      );
    }
    setrows(newStaff);
  };

  return (
    <div>
      <h3>All Staff Members</h3>
      <div className="content__container mb-5">
        <Search
          inputFields={inputFields}
          handleSearch={handleSearch}
          handleReset={handleReset}
        />
      </div>
      <TableList
        rows={rows}
        headCells={headCells}
        handleDeleteAll={handleDeleteAll}
        handleDelete={handleDelete}
        handleWithdraw={handleWithdraw}
        routes="/staff"
      ></TableList>
    </div>
  );
}

export default AllStudents;
