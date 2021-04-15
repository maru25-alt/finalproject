import React from "react";

function Search({ classes, classID, setclassID, onSearch }) {
  return (
    <div className="content__container mb-5">
      <div className="mb-3">
        <label htmlFor="">Select Class</label>
        <select
          value={classID}
          name="class"
          onChange={(e) => setclassID(e.target.value)}
          className="form-select form-select-sm py-2"
        >
          <option hidden defaultValue>
            Select
          </option>
          {classes &&
            classes.map((option) => (
              <option key={option._id} value={option.classCode}>
                {option.name}
              </option>
            ))}
        </select>
      </div>
      <div className="mb-3">
        <button onClick={() => onSearch()} className="btn blue__btn">
          Search
        </button>
      </div>
    </div>
  );
}

export default Search;
