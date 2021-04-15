import React from "react";
import Calendar from "../../../shared/calender/CalenderView";

function SchoolCalendar() {
  return (
    <div>
      <div className="d-flex   justify-content-between mb-3">
        <h3>School Calendar</h3>
        <div>
          <button className="btn blue__btn mx-2">View All Events</button>
          <button className="btn blue__btn mx-2">Add Events</button>
        </div>
      </div>
      <Calendar />
    </div>
  );
}

export default SchoolCalendar;
