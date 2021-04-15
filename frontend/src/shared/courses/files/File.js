import React from "react";
import moment from "moment";
import { getImgSrc } from "../../../utils";
import GetAppIcon from "@material-ui/icons/GetApp";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

function File({ title, date, description, file, user, handleDelete, id }) {
  return (
    <div className="file__container d-flex justify-content-between">
      <div>
        <h5>
          <strong>{title}</strong>
        </h5>

        <div>
          <small>{moment(date).format("DD / MM/ YYYY")}</small>
        </div>
        <p>{description}</p>
        <div className="file ">
          <a rel="noreferrer" target="_blank" href={`${getImgSrc(file)}`}>
            <span className="d-flex justify-content-between">
              {file}
              <GetAppIcon />
            </span>
          </a>
        </div>
      </div>
      <div className="">
        {user === "teacher" && (
          <button onClick={() => handleDelete(id)} className="btn">
            <HighlightOffIcon />
          </button>
        )}
      </div>
    </div>
  );
}

export default File;
