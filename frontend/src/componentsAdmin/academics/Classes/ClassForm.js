import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "../../../store/axios";
import { getYearsPast } from "../../../utils";

function ClassForm(props) {
  const { register, handleSubmit, errors } = useForm();
  let {
    name,
    setname,
    academic,
    setacademic,
    prefect,
    setprefect,
    teacher,
    loading,
    isEdit,
    handleAddClass,
    setteacher,
  } = props;

  const [prefects, setprefects] = useState([]);
  const [teachers, setteachers] = useState([]);
  const years = getYearsPast(10);

  useEffect(() => {
    axios.get("/prefects").then((res) => {
      setprefects(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/teachers").then((res) => {
      setteachers(res.data);
    });
  }, []);

  return (
    <form onSubmit={handleSubmit(handleAddClass)} action="">
      <div className="row mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Academic Year
        </label>
        <div className="col-sm-10">
          <select
            name="academic-calendar"
            className="form-select"
            value={academic}
            onChange={(e) => setacademic(e.target.value)}
          >
            <option defaultValue hidden>
              Choose...
            </option>
            {years ? (
              years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))
            ) : (
              <option>No academics years yet</option>
            )}
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Class Name
        </label>
        <div className="col-sm-10">
          <input
            value={name}
            onChange={(e) => setname(e.target.value)}
            type="text"
            ref={register({ required: true })}
            className="form-control"
            name="name"
          />
          {errors.name && (
            <span className=" form-error text-danger mb-2">
              This field is required
            </span>
          )}
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Class Teacher
        </label>
        <div className="col-sm-10">
          <select
            value={teacher}
            onChange={(e) => setteacher(e.target.value)}
            id="teacher"
            className="form-select"
          >
            <option defaultValue hidden>
              Choose...
            </option>
            {teachers.length > 0 ? (
              teachers.map((e) => (
                <option key={e.userID} value={e.userID}>
                  {e.name} {e.surname}
                </option>
              ))
            ) : (
              <option disabled>No registered teachers yet</option>
            )}
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Class Prefect
        </label>
        <div className="col-sm-10">
          <select
            id="campus"
            className="form-select"
            value={prefect}
            onChange={(e) => setprefect(e.target.value)}
          >
            <option defaultValue hidden>
              Choose...
            </option>
            {prefects?.length > 0 ? (
              prefects.map((e) => (
                <option key={e?._id} value={e?.userID}>
                  {e?.name}
                </option>
              ))
            ) : (
              <option disabled>No prefects yet</option>
            )}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="offset-sm-2">
          <button disabled={loading} type="submit" className="btn blue__btn">
            {loading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            {isEdit ? "Save Changes" : "Add"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default ClassForm;
