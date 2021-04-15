import React, { useEffect, useState } from "react";
import axios from "../../../../store/axios";
import Edit from "./EditFees";
import { errorAlert } from "../../../../utils";

function SetFees() {
  const [open, setOpen] = useState(false);
  const [fees, setfees] = useState([]);
  const [data, setdata] = useState([
    // { name: "Tutiton Fee", value: "24309", _id: "123" },
    // { name: "Maintenance Fee", value: "200", _id: "124" },
  ]);

  useEffect(() => {
    axios.get("/fees").then((res) => {
      console.log(res.data);
      setdata(res.data);
    });
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();
    axios
      .post("/fees/add", { fees, name: "fees" })
      .then((res) => {
        if (res.data.error) {
          return errorAlert(res.data.error);
        }
        setOpen(false);
        setdata(fees);
      })
      .catch(() => {
        return errorAlert("Error");
      });
  };

  const total = Object.values(data).reduce(
    (t, value) => Number(t) + Number(value.value),
    0
  );

  return (
    <div className="content__container">
      <div className="mb-3 d-flex justify-content-between">
        <h3 className="mb-3">School Fees</h3>
        <div>
          <button
            onClick={() => {
              setOpen(true);
              setfees(data);
            }}
            className="btn blue__btn"
          >
            {data?.length > 0 ? "Edit" : "Set"}
          </button>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Amount ($)</th>
          </tr>
        </thead>
        <tbody>
          {data ? (
            data.map((e) => (
              <tr key={e._id}>
                <td>{e?.name}</td>
                <td>{e?.value}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2}>Fee not set</td>
            </tr>
          )}
        </tbody>
        {data && (
          <thead>
            <tr>
              <th scope="col">Total</th>
              <th scope="col">{total}</th>
            </tr>
          </thead>
        )}
      </table>

      <Edit
        handleEdit={handleEdit}
        fees={fees}
        setfees={setfees}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}

export default SetFees;
