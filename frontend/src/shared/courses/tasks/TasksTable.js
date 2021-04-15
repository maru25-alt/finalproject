import React, { useState } from "react";
import Pagination from "../../tables/TablePagination";
import { timeStamp, getTrimString } from "../../../utils";

function TasksTable({ data, handleView, handleDelete, user }) {
  const [page, setpage] = useState(0);

  const onChangePage = () => {};
  return (
    <div>
      {data.length > 0 ? (
        data.map((e, index) => (
          <div className=" task__container mb-3" key={e._id}>
            <div className="d-flex  align-items-start ">
              <div>{index + 1}</div>
              <div className="px-4 w-100">
                <div className="">
                  <h6>
                    <strong>{e.title}</strong>
                  </h6>
                  {e.deadline && (
                    <div>
                      {" "}
                      <small>Due Date: {timeStamp(e.deadline)}</small>
                    </div>
                  )}
                </div>
                <p>{getTrimString(e.description, 100)}</p>
              </div>
            </div>

            <div className="d-flex justify-content-end">
              <div className="mx-2">
                <button
                  onClick={() => handleView(e._id)}
                  className="btn btn-dark "
                >
                  View
                </button>
              </div>
              {user === "teacher" && (
                <div className="mx-2">
                  <button
                    onClick={() => handleDelete(e._id)}
                    className="btn btn-danger "
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="content__container text-danger">No Tasks</div>
      )}
      {data.length > 5 && (
        <Pagination
          count={5}
          page={page}
          rowsPerPage={5}
          onChangePage={onChangePage}
        />
      )}
    </div>
  );
}

export default TasksTable;
