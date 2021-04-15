import React, { useState } from "react";
import {
  selectYearGroup,
  selectClasses,
} from "../../../store/slices/schoolSlice";
import { useSelector } from "react-redux";
import axios from "../../../store/axios";

function Search({
  classID,
  setclass,
  loading,
  term,
  setterm,
  academicYear,
  setacademicYear,
  course,
  setcourse,
  handleSearch,
}) {
  const classes = useSelector(selectClasses);
  //const courses = useSelector(selectCourses);
  const yearGroup = useSelector(selectYearGroup);
  const [courses, setcourses] = useState();

  const handleSelectClass = async (e) => {
    setclass(e);
    setcourse("");
    await axios.get(`courses/class/${e}`).then((res) => {
      setcourses(
        res.data.docs.map((i) => {
          return {
            code: i.code,
            name: i.name,
          };
        })
      );
    });
  };

  return (
    <form className="content__container col-8 mb-5">
      <div className="mb-3">
        <label htmlFor="name" className="col-form-label">
          Select Task
        </label>
        <div className="">
          <select
            name="academic-calendar"
            className="form-select"
            value={classID}
            onChange={(e) => handleSelectClass(e.target.value)}
          >
            <option defaultValue hidden>
              Choose...
            </option>
            {classes.length > 0 ? (
              classes.map((e) => (
                <option key={e._id} value={e.classCode}>
                  {e.name}
                </option>
              ))
            ) : (
              <option disabled>No classes yet</option>
            )}
          </select>
        </div>
      </div>
      <div className="">
        <div>
          <button
            onClick={handleSearch}
            disabled={loading || !classID}
            type="submit"
            className="btn blue__btn"
          >
            {loading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            {"Search"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default Search;
