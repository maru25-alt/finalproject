import React from "react";
import { useForm } from "react-hook-form";
import { bankOptions } from "../../../../data";
import NumberFormat from "react-number-format";

function PaymentForm({
  applyTo,
  setapplyTo,
  bank,
  setbank,
  setchequeNo,
  chequeNo,
  amount,
  term,
  setterm,
  year,
  setyear,
  setamount,
  remarks,
  setremarks,
  loading,
  handlePayement,
  balance,
  date,
  setdate,
  paymentType,
  setpaymentType,
}) {
  const { register, handleSubmit, errors } = useForm();

  return (
    <div className="content__container">
      <form action="">
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Amount</label>
          <div className="col-sm-9">
            <strong className="text-info ">
              Fees Due &nbsp;
              <NumberFormat
                value={balance}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </strong>
            <input
              type="number"
              ref={register({ required: true, max: balance })}
              value={amount}
              onChange={(e) => setamount(e.target.value)}
              className="form-control"
              name="amount"
              placeholder="Enter amount in $"
            />
            {errors.amount && (
              <div className="text-danger">
                Amount is required and it should not be above {balance}{" "}
              </div>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Date Paid</label>
          <div className="col-sm-9">
            <input
              type="date"
              value={date}
              ref={register({ required: true })}
              onChange={(e) => setdate(e.target.value)}
              className="form-control"
              name="date"
            />
            {errors.date && (
              <div className="text-danger">This field is required</div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Payment Type</label>
          <div className="col-sm-9">
            <select
              value={paymentType}
              ref={register({ required: true })}
              onChange={(e) => setpaymentType(e.target.value)}
              name="students"
              className="form-select"
            >
              <option hidden defaultValue>
                Choose...
              </option>
              <option value="cash">Cash</option>
              <option value="cheque">Cheque</option>
              <option value="bank-deposit">Bank Deposit</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        {paymentType === "bank-deposit" && (
          <div className=" mb-3">
            <label className=" col-form-label">Bank</label>
            <div className="">
              <select
                value={bank}
                ref={register({ required: true })}
                onChange={(e) => setbank(e.target.value)}
                name="students"
                className="form-select"
              >
                <option hidden defaultValue>
                  Choose...
                </option>
                {bankOptions &&
                  bankOptions.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        )}
        {paymentType === "cheque" && (
          <>
            <div className=" mb-3">
              <label className=" col-form-label">Bank</label>
              <div className="">
                <select
                  value={bank}
                  ref={register({ required: true })}
                  onChange={(e) => setbank(e.target.value)}
                  name="students"
                  className="form-select"
                >
                  <option hidden defaultValue>
                    Choose...
                  </option>
                  {bankOptions &&
                    bankOptions.map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label className=" col-form-label">Cheque Number</label>
              <div className="">
                <input
                  type="text"
                  className="form-control"
                  value={chequeNo}
                  onChange={(e) => setchequeNo(e.target.value)}
                  name="cheque"
                />
              </div>
            </div>
          </>
        )}
        <div className="row mb-3">
          <label className="col-sm-3 col-form-label">Remarks</label>
          <div className="col-sm-9">
            <textarea
              rows={5}
              className="form-control"
              value={remarks}
              onChange={(e) => setremarks(e.target.value)}
              name="remarks"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-9 offset-sm-3">
            <button
              disabled={loading}
              onClick={handleSubmit(handlePayement)}
              className="btn blue__btn"
            >
              {loading && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              Record Payment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PaymentForm;
