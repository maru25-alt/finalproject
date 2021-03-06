import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import { getImgSrc, getCapitalize, getIntial } from "../../../../utils";
import NumberFormat from "react-number-format";
import Transactions from "../ViewStudentTransactions";

function ViewStudent({
  id,
  transactions,
  user,
  feetype,
  total,
  totalBill,
  fees,
  balance,
}) {
  const [open, setOpen] = useState(false);
  const name =
    getCapitalize(user?.name) +
    " " +
    getIntial(user?.middlename || " ") +
    getCapitalize(user?.surname);

  console.log(fees);

  return (
    <div className="content__container">
      <div
        style={{ background: "#ffa201" }}
        className="d-flex flex-column align-items-center p-3 text-light mb-4"
      >
        <Avatar
          src={getImgSrc(user?.profileUrl)}
          style={{ width: "100px", height: "100px" }}
        />
        <h3>{name} </h3>
        <h5>{id}</h5>
        <h6>{getCapitalize(user?.status)}</h6>
        <button onClick={() => setOpen(true)} className="btn blue__btn">
          View Transactions
        </button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Fees</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {fees &&
            fees.map((e) => (
              <tr key={e._id}>
                <td>{e.name}</td>
                <td>
                  <NumberFormat
                    value={e?.value}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </td>
              </tr>
            ))}
          <tr>
            <td>TOTAL BILL</td>
            <td>
              <NumberFormat
                value={totalBill}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </td>
          </tr>
          <tr>
            <td>TOTAL PAID</td>
            <td>
              <NumberFormat
                value={total}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>BALANCE</strong>
            </td>
            <td>
              <strong>
                <NumberFormat
                  value={balance}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </strong>
            </td>
          </tr>
        </tbody>
      </table>

      <Transactions
        open={open}
        setOpen={setOpen}
        name={name}
        totalBill={totalBill}
        totalPaid={total}
        balance={balance}
        transactions={transactions}
      />
    </div>
  );
}

export default ViewStudent;
