import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "../../../shared/components/Search";
import axios from "../../../store/axios";
import { monthYear } from "../../../data";
import { getYearsPast, errorAlert } from "../../../utils";
import Table from "./Table";
import ViewTransactions from "./ViewStaffTransactions";

const tableHeader = [
  { id: "userID", name: "Staff ID " },
  { id: "name", name: "Name" },
  { id: "salary", name: "Salary" },
  { id: "date", name: "Paid Date" },
  { id: "amount", name: "Paid Amount" },
];

function Payrow() {
  const [month, setmonth] = useState("");
  const [year, setyear] = useState("");
  const [staff, setstaff] = useState("");
  const years = getYearsPast(20);
  const [data, setdata] = useState([]);
  const [show, setshow] = useState(false);
  const [open, setOpen] = useState(false);
  const [transactions, settransactions] = useState([]);
  const [selectedStaff, setselectedStaff] = useState([]);

  useEffect(() => {
    axios.get("/staff").then((res) => {
      setstaff(res.data);
    });
  }, []);

  const inputFields = [
    {
      type: "select",
      label: "Search by Year",
      name: "year",
      options: years.map((i) => {
        return {
          id: i,
          name: i,
        };
      }),
      value: year,
      onChange: setyear,
    },
    {
      type: "select",
      label: "Search by Month",
      name: "month",
      options: monthYear,
      value: month,
      onChange: setmonth,
    },
  ];

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!year) {
      return errorAlert("please select year");
    }
    if (!month) {
      return errorAlert("please select month");
    }
    setshow(true);
    let payrow = await axios.get(`/salary/${year}/${month}`);
    setdata(
      staff.map((i) => {
        //console.log(i.userID);
        let userPayrow = payrow.data.find((y) => y.userID === i.userID);
        return {
          ...i,
          userID: i.userID,
          name: i.name + " " + i.surname,
          salary: userPayrow?.salary,
          date: userPayrow?.date,
          amount: userPayrow?.amount,
          _id: userPayrow?._id,
        };
      })
    );
  };

  const handleView = async (id) => {
    setOpen(true);
    await axios.get(`/salary/user/${id}`).then((res) => {
      settransactions(res.data);
      let user = staff.find((i) => i.userID === id);
      setselectedStaff(user);
    });
  };
  const handleDelete = (id) => {};

  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        <Link className="mx-2" to="/finance/payrow/pay">
          Pay Salary
        </Link>
        <Link className="mx-2" to="/finance/payrow/set">
          Set Payrow
        </Link>
      </div>

      <div className="mb-3">
        <Search
          isReset={true}
          title="Search Payrow List"
          handleSearch={handleSearch}
          inputFields={inputFields}
        />
      </div>
      {show && (
        <div className="content__container">
          <h3>
            Salary for {monthYear[month]?.name} {year}
          </h3>
          <Table
            handleDelete={handleDelete}
            handleEdit={handleView}
            data={data}
            tableHeader={tableHeader}
          />
        </div>
      )}

      <ViewTransactions
        open={open}
        setOpen={setOpen}
        transactions={transactions}
        id={""}
        name={selectedStaff?.name + " " + selectedStaff?.surname}
      />
    </div>
  );
}

export default Payrow;
