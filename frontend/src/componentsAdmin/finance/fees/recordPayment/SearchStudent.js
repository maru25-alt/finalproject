import React, { useEffect, useState } from "react";
import axios from "../../../../store/axios";
import { schoolTerms } from "../../../../data";
import { getYearsPast } from "../../../../utils";

function SearchStudent({
  setclassID,
  classID,
  setstudentID,
  studentOptions,
  studentID,
  loading,
  term,
  setterm,
  year,
  setyear,
}) {
  const [classes, setclasses] = useState([]);
  const years = getYearsPast(10);

  useEffect(() => {
    axios.get("/classes").then((res) => {
      setclasses(res.data);
    });
  }, []);

  return (
    <div className="content__container mb-3">
      <h3>Search Student</h3>
      <form action="">
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Academic Year</label>
          <div className="col-sm-9">
            <select
              value={year}
              onChange={(e) => setyear(e.target.value)}
              name="years"
              className="form-select"
            >
              <option hidden defaultValue>
                Choose...
              </option>
              {years &&
                years.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Term</label>
          <div className="col-sm-9">
            <select
              value={term}
              onChange={(e) => setterm(e.target.value)}
              name="years"
              className="form-select"
            >
              <option hidden defaultValue>
                Choose...
              </option>
              {schoolTerms &&
                schoolTerms.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Class</label>
          <select
            value={classID}
            onChange={(e) => setclassID(e.target.value)}
            name="year"
            className="form-select"
          >
            <option hidden defaultValue>
              Choose...
            </option>
            {classes.length > 0 ? (
              classes.map((e) => (
                <option key={e.classCode} value={e.classCode}>
                  {e.name}
                </option>
              ))
            ) : (
              <option disabled>No data</option>
            )}
          </select>
        </div>
        {loading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {studentOptions?.length > 0 && term && year && (
          <div className="mb-3">
            <label className="form-label">Student</label>
            <select
              value={studentID}
              onChange={(e) => setstudentID(e.target.value)}
              name="students"
              className="form-select"
            >
              <option hidden defaultValue>
                Choose...
              </option>
              {studentOptions?.length > 0 ? (
                studentOptions.map((e) => (
                  <option key={e.userID} value={e.userID}>
                    {e.name} {e.surname} - {e.userID}
                  </option>
                ))
              ) : (
                <option disabled> No data</option>
              )}
            </select>
          </div>
        )}
      </form>
    </div>
  );
}

export default SearchStudent;
