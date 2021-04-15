import React, { useState } from "react";
import moment from "moment";
import axios from "../../store/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import { errorAlert, successAlert } from "../../utils";

function Attendance() {
  const user = useSelector(selectUser);
  console.log(user);
  const [loadingStart, setloadingStart] = useState(false);
  const [loadingEnd, setloadingEnd] = useState(false);

  const handleEnd = () => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        setloadingEnd(true);
        if (result.state === "granted" || result.state === "prompt") {
          //If granted then you can directly call your function here
          navigator.geolocation.getCurrentPosition(async (pos) => {
            await axios
              .post(`/attendance/end`, {
                role: user?.role,
                userID: user?.userID || user?.id,
                endLocation: {
                  latitude: pos.coords.latitude,
                  longitude: pos.coords.longitude,
                },
              })
              .then((res) => {
                setloadingEnd(false);
                console.log(res.data);
                if (res.data.error) {
                  return errorAlert(res.data.error);
                }
                successAlert("Sumbitted");
              })
              .catch((err) => {
                setloadingEnd(false);
                console.log(err);
                errorAlert("FAILED");
              });
          });
        } else if (result.state === "denied") {
          //If denied then you have to show instructions to enable location
          errorAlert(" Location Denied");
        }
      });
    } else {
      errorAlert("Sorry Location not available");
    }
  };

  const handleStart = () => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        console.log(result);
        if (result.state === "granted" || result.state === "prompt") {
          setloadingStart(true);
          navigator.geolocation.getCurrentPosition(async (pos) => {
            await axios
              .post(`/attendance/start`, {
                role: user?.role,
                userID: user?.userID,
                startLocation: {
                  latitude: pos.coords.latitude,
                  longitude: pos.coords.longitude,
                },
              })
              .then((res) => {
                setloadingStart(false);
                console.log(res.data);
                if (res.data.error) {
                  return errorAlert(res.data.error);
                }
                successAlert("Sumbitted");
              })
              .catch((err) => {
                console.log(err);
                setloadingStart(false);
                errorAlert("FAILED");
              });
          });
        } else if (result.state === "denied") {
          //If denied then you have to show instructions to enable location
          errorAlert(" Location Denied");
        }
      });
    } else {
      errorAlert("Sorry Location not available");
    }
  };

  return (
    <div className="card">
      <div className="row">
        <div className="col-xs-12 col-sm-6 mb-3">
          <h3>Attendance</h3>
          <div className="d-flex justify-content-between">
            <button
              disabled={loadingStart}
              onClick={handleStart}
              className="btn blue__btn"
            >
              {loadingStart && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              START
            </button>
            <button
              disabled={loadingEnd}
              onClick={handleEnd}
              className="btn outlined__btn"
            >
              {loadingEnd && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              DISMISS
            </button>
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 mb-3">
          <h6>
            <strong>{moment().format("dddd D MMMM YYYY")}</strong>
          </h6>
          <h6>
            Week Days: <strong>Monday - Friday</strong>
          </h6>
          <h6>School Hours</h6>
          <div className="d-flex">
            <div>From: 08:00 </div>
            <div>-</div>
            <div> End: 16:00 </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
