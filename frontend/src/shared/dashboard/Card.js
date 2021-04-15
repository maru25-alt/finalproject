import React from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

function Card({ icon, name, value, route }) {
  return (
    <Link to={route} className="dashboard__card">
      <h4 className="card__digits">
        {" "}
        {value && <CountUp end={value}></CountUp>}
      </h4>
      {icon}
      <h5>
        <strong>{name}</strong>
      </h5>
    </Link>
  );
}

export default Card;
