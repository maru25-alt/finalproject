import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "../../../shared/components/Search";
import { schoolTerms } from "../../../data";
import { getYearsPast, errorAlert } from "../../../utils";
import axios from "../../../store/axios";
import Table from "./Table";

const tableHeader = [
  { id: "userID", name: "Student ID " },
  { id: "name", name: "Name" },
  { id: "fees", name: "Total Fees" },
  { id: "date", name: "Payment Date" },
  { id: "amount", name: " Amount Paid" },
];

function Fees() {
  const years = getYearsPast(20);
  const [year, setyear] = useState("");
  const [month, setmonth] = useState("");
  const [classID, setclassID] = useState("");
  const [classes, setclasses] = useState([]);
  const [show, setshow] = useState(false);
  const [data, setdata] = useState([]);

  useEffect(() => {
    axios.get(`/classes`).then((res) => {
      setclasses(res.data);
    });
  }, []);

  const inputFields = [
    {
      type: "select",
      label: "Search Class",
      name: "class",
      options: classes.map((i) => {
        return {
          id: i.classCode,
          name: i.name,
        };
      }),
      value: classID,
      onChange: setclassID,
    },
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
      label: "Search by Term",
      name: "month",
      options: schoolTerms,
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
    if (!classID) {
      return errorAlert("please select class");
    }
    setshow(true);
    let students = await axios.get(`students/class/${classID}`);
    let payrow = await axios.get(`/feespayment/${year}/${month}`);
    setdata(
      payrow.data.map((i) => {
        //console.log(i.userID);
        let selected = students.data.find((y) => y.userID === i.userID);
        return {
          ...i,
          userID: selected.userID,
          name: selected.name + " " + selected.surname,
          fees: i?.fees,
          date: i?.date,
          amount: i?.amount,
          _id: i?._id,
        };
      })
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        <Link className="mx-2" to="/finance/fees/payment">
          Record Payment
        </Link>
        <Link className="mx-2" to="/finance/fees/debtors">
          View Debtors
        </Link>
        <Link className="mx-2" to="/finance/fees/set">
          Set Fees
        </Link>
      </div>
      <div className="mb-3">
        <Search
          isReset={true}
          handleSearch={handleSearch}
          title="Search Student"
          inputFields={inputFields}
        />
      </div>
      {show && (
        <div className="content__container">
          <h3>
            Fees Payments for Class {classID} Term {month}
          </h3>
          <Table data={data} tableHeader={tableHeader} />
        </div>
      )}
    </div>
  );
}

export default Fees;
