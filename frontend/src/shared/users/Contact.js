import React from "react";

function Contact(props) {
  let {
    postalAddress,
    errors,
    settelephone,
    telephone,
    register,
    setpostalAddress,
  } = props;

  return (
    <div>
      <h3 className="mb-3">Contact Details</h3>
      <div className="row mb-4">
        <div className="col-xs-12 col-sm-6 ">
          <label className="form-label">Telephone Number</label>
          <input
            name="mobile"
            type="tel"
            value={telephone}
            ref={register({ required: true })}
            onChange={(e) => settelephone(e.target.value)}
            className="form-control"
            placeholder="phone number if any"
          />
          {errors.mobile && (
            <span className=" form-error text-danger mb-2">
              This field is required
            </span>
          )}
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-xs-12 col-sm-6">
          <label className="form-label"> Address</label>
          <textarea
            rows={3}
            value={postalAddress}
            onChange={(e) => setpostalAddress(e.target.value)}
            type="email"
            name="lastname"
            className="form-control"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default Contact;
