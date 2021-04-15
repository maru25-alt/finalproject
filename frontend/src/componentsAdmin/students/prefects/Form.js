import React from "react";
import { useForm } from "react-hook-form";

function Form({
  handleAdd,
  loading,
  setposition,
  position,
  name,
  setname,
  userID,
  setuserID,
}) {
  const { register, handleSubmit, errors } = useForm();

  return (
    <form className="row" action="">
      <div className=" mb-3">
        <label className="col-sm-3 col-form-label">Name</label>
        <div className="col-sm-9">
          <input
            type="text"
            value={name}
            ref={register({ required: true })}
            onChange={(e) => setname(e.target.value)}
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
      <div className=" mb-3">
        <label className="col-sm-3 col-form-label">Student ID</label>
        <div className="col-sm-9">
          <input
            type="text"
            ref={register({ required: true })}
            className="form-control"
            value={userID}
            onChange={(e) => setuserID(e.target.value)}
            name="userId"
          />
          {errors.userId && (
            <span className=" form-error text-danger mb-2">
              This field is required
            </span>
          )}
        </div>
      </div>
      <div className=" mb-3">
        <label className="col-sm-3 col-form-label">Position</label>
        <div className="col-sm-9">
          <select
            ref={register({ required: true })}
            name="position"
            onChange={(e) => setposition(e.target.value)}
            className="form-select"
          >
            <option defaultValue hidden>
              Choose...
            </option>
            <option value="Headgirl">Head Girl</option>
            <option value="Headboy">Head Boy</option>
            <option value="Vice Headgirl">Vice Headgirl</option>
            <option value="Vice Headboy">Vice Headboy</option>
            <option value="Senior Prefect">Senior Prefect</option>
            <option value="Prefect">Prefect </option>
            <option value="other">Other </option>
          </select>
          {errors.position && (
            <span className=" form-error text-danger mb-2">
              This field is required
            </span>
          )}
        </div>
      </div>
      <div className="row mb-3">
        <div className="offset-sm-3">
          <button
            disabled={loading}
            onClick={handleSubmit(handleAdd)}
            className="btn blue__btn "
          >
            {loading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            Add
          </button>
        </div>
      </div>
    </form>
  );
}

export default Form;
