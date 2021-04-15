import React from "react";
import { Link } from "react-router-dom";
import ClassIcon from "@material-ui/icons/Class";

function Card({ name, classCode }) {
  return (
    <Link to={`/academics/classes/${classCode}`} className="dashboard__card">
      <ClassIcon />
      <h4 className="card__digits">{name} </h4>
      <h5>
        <strong>{classCode}</strong>
      </h5>
    </Link>
  );
}

export default Card;
