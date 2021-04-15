import React, { useState, useEffect } from "react";
import axios from "../../../store/axios";

function SearchStudent({ loading, userID, setuserID }) {
  const [staff, setstaff] = useState([]);

  useEffect(() => {
    axios.get("/staff").then((res) => {
      setstaff(res.data);
    });
  }, []);

  return (
    <div className="content__container mb-3">
      <h3>Search Staff</h3>
      <form action="">
        <div className="mb-3">
          <label className="form-label">Staff ID</label>
          <select
            value={userID}
            onChange={(e) => setuserID(e.target.value)}
            name="year"
            className="form-select"
          >
            <option hidden defaultValue>
              Choose...
            </option>
            {staff.length > 0 ? (
              staff.map((e) => (
                <option key={e.userID} value={e.userID}>
                  {e.name} {e.surname}
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
      </form>
    </div>
  );
}

export default SearchStudent;
