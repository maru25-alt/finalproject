import React from "react";
import moment from "moment";

function Notification({ date, createdBy, message }) {
  return (
    <div className="notification">
      <div className="mb-2">
        <div className="float-right">{moment(date).fromNow()}</div>
        <h6>
          <strong>{createdBy}</strong>
        </h6>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
