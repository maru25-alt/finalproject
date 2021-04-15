import React from "react";
import moment from "moment";

function Attendance() {
  return (
    <div className="card">
      <div className="row">
        <div className="col-6">
          <h3>Attendance</h3>
          <div className="d-flex justify-content-between">
            <button className="btn blue__btn">START</button>
            <button className="btn outlined__btn">DISMISS</button>
          </div>
        </div>
        <div className="col-6">
          <h6>
            <strong>{moment().format("dddd D MMMM YYYY")}</strong>
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
