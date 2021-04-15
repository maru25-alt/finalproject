import React from "react";
import moment from "moment";

function Date() {
  return (
    <div className="">
      <h4>{moment().format("dddd D MMMM YYYY")}</h4>
    </div>
  );
}

export default Date;
