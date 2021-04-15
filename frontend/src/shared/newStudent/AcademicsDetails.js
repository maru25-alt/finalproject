import React, { useState, useEffect } from "react";
import axios from "../../store/axios";

function AcademicsDetails(props) {
  const [classes, setclasses] = useState([]);
  const [scholarship, setscholarship] = useState([]);

  useEffect(() => {
    axios.get("/classes").then((res) => {
      setclasses(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/scholarships").then((res) => {
      setscholarship(res.data);
    });
  }, []);

  let {
    register,
    errors,
    autoID,
    setautoID,
    userID,
    setuserID,
    classID,
    setclass,
    status,
    setstatus,
    schoolarship,
    setschoolarship,
    lastSchool,
    setlastSchool,
    reasonforTransfer,
    isEdit,
    setreasonforTransfer,
  } = props;

  return (
    <div>
      <h3>Academics Details</h3>
      <div class="row mb-3">
        {!isEdit && (
          <>
            <div className="col-xs-12 col-sm-6">
              <label htmlFor="name" className="form-label">
                Auto Generate ID
              </label>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={() => setautoID(!autoID)}
                  id="flexSwitchCheckChecked"
                  checked={autoID}
                />
              </div>
            </div>
            {!autoID && (
              <div className="col-xs-12 col-sm-6 ">
                <label className="form-label">Student ID</label>
                <input
                  name="userID"
                  value={userID}
                  onChange={(e) => setuserID(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
            )}
          </>
        )}
      </div>
      <div class="row mb-3">
        <div className="col-xs-12 col-sm-6 col-md-4">
          <label className="form-label">Class</label>
          <select
            ref={register({ required: true })}
            value={classID}
            onChange={(e) => setclass(e.target.value)}
            name="class"
            className="form-select"
            aria-label="Default select example"
          >
            <option defaultValue hidden>
              select
            </option>
            {classes.length > 0 ? (
              classes.map((e) => (
                <option key={e.classCode} value={e.classCode}>
                  {e.name}
                </option>
              ))
            ) : (
              <option disabled>No data yet</option>
            )}
          </select>
          {errors.class && (
            <span className=" form-error text-danger mb-2">
              This field is required
            </span>
          )}
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <label className="form-label">Status</label>
          <select
            ref={register({ required: true })}
            name="status"
            value={status}
            onChange={(e) => setstatus(e.target.value)}
            className="form-select"
            aria-label="Default select example"
          >
            <option defaultValue hidden>
              select
            </option>
            <option value="border">Border </option>
            <option value="day">Day </option>
          </select>
          {errors.status && (
            <span className=" form-error text-danger mb-2">
              This field is required
            </span>
          )}
        </div>
        <div className="col-xs-12 col-sm-6  col-md-4">
          <label className="form-label">Scholarship</label>
          <select
            value={schoolarship}
            onChange={(e) => setschoolarship(e.target.value)}
            name="scholarship"
            className="form-select"
            aria-label="Default select example"
          >
            <option defaultValue hidden>
              select
            </option>
            {scholarship.length > 0 ? (
              scholarship.map((e) => (
                <option key={e._id} value={e._id}>
                  {e.name}
                </option>
              ))
            ) : (
              <option disabled>No data yet</option>
            )}
          </select>
        </div>
      </div>
      <div class="row mb-3">
        <div className="col-xs-12 col-sm-6 col-md-4">
          <label className="form-label">Last School Attended</label>
          <input
            name="lastschool"
            value={lastSchool}
            onChange={(e) => setlastSchool(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Name last school attended if any"
          />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-4">
          <label className="form-label">Reason for Leaving Last School</label>
          <textarea
            name="reason"
            value={reasonforTransfer}
            onChange={(e) => setreasonforTransfer(e.target.value)}
            rows={4}
            className="form-control"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default AcademicsDetails;
