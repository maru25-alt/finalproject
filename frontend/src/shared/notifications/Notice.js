import React, { useState } from "react";
import moment from "moment";
import Chip from "@material-ui/core/Chip";
import { IconButton } from "@material-ui/core";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

function Notice({
  description,
  createdBy,
  date,
  title,
  createdAt,
  isEdit,
  handleEdit,
  handleDelete,
  id,
}) {
  const colors = ["#2ad7c5", "#ffa201", "#f939a1"];

  let bgColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className="notice d-flex justify-content-between align-items-center">
      <div>
        <h4>
          <strong>{title}</strong>
        </h4>
        <Chip
          style={{ backgroundColor: `${bgColor}` }}
          className="chip__date mb-2"
          label={moment(date).format(" Do MMMM, YYYY")}
        />
        <p>
          <strong> {description} </strong>
        </p>
        <div>
          <h6>
            {createdBy} /{" "}
            <span className="text-muted"> {moment(createdAt).fromNow()}</span>
          </h6>
        </div>
      </div>
      {isEdit && (
        <>
          <div>
            <IconButton onClick={() => handleEdit(id)}>
              <OpenInNewIcon />
            </IconButton>
          </div>
        </>
      )}

      <hr />
    </div>
  );
}

export default Notice;
