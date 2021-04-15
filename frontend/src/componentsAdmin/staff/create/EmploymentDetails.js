import React, { useState, useEffect } from "react";
//import { useSelector } from "react-redux";
import axios from "../../../store/axios";
import { schoolDepart } from "../../../data";
// import {
//   selectClasses,
//   selectCourses,
//   selectCampuses,
// } from "../../../store/slices/schoolSlice";

function EmploymentDetails(props) {
  const [positions, setpositions] = useState([]);

  useEffect(() => {
    axios.get("/payrow").then((res) => {
      console.log(res.data);
      setpositions(res.data);
    });
  }, []);

  let {
    role,
    setRole,
    department,
    setDepartment,
    qualification,
    setqualification,
    bank,
    setbank,
    accountNumber,
    setaccountNumber,
    register,
    errors,
  } = props;

  return (
    <div>
      <h3>Employment Details</h3>
      <div className="row mb-3">
        <div className="col-xs-12 col-sm-6  mb-3">
          <label className="form-label">Staff Role</label>
          <select
            ref={register({ required: true })}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            name="role"
            className="form-select"
            aria-label="Default select example"
          >
            <option defaultValue hidden>
              select
            </option>
            {positions &&
              positions.map((e) => (
                <option value={e?.code} key={e?._id}>
                  {e?.name}
                </option>
              ))}
          </select>
          {errors.role && (
            <span className=" form-error text-danger mb-2">
              Name is required
            </span>
          )}
        </div>
        <div className="col-xs-12 col-sm-6 mb-3">
          <label className="form-label">Departments</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            name="department"
            className="form-select"
            aria-label="Default select example"
          >
            <option defaultValue hidden>
              select
            </option>
            {schoolDepart.length > 0 ? (
              schoolDepart.map((e) => (
                <option key={e.id} value={e._d}>
                  {e.name}
                </option>
              ))
            ) : (
              <option disabled>No departments yet</option>
            )}
          </select>
        </div>
        <div className="col-xs-12 col-sm-6  mb-3">
          <label className="form-label">Bank</label>
          <input
            name="bank"
            value={bank}
            onChange={(e) => setbank(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="col-xs-12 col-sm-6  mb-3">
          <label className="form-label"> Account Number</label>
          <input
            name="accountNumber"
            value={accountNumber}
            onChange={(e) => setaccountNumber(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="col-xs-12 col-sm-6 mb-3">
          <label className="form-label">Qualification</label>
          <input
            name="lastschool"
            value={qualification}
            onChange={(e) => setqualification(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
      </div>
    </div>
  );
}

export default EmploymentDetails;
