import React, { useState, useEffect } from "react";
import axios from "../../store/axios";
import { selectFees } from "../../store/slices/schoolSlice";
import { useSelector } from "react-redux";

function AcademicTab({ user }) {
  const [section, setsection] = useState("");
  const [fees, setfees] = useState("");
  const [scholarship, setscholarship] = useState("");
  const feesSelector = useSelector(selectFees);

  useEffect(() => {
    if (user?.fees) {
      let type = feesSelector.find((e) => e.code === user?.fees);
      setfees(type?.name);
    }

    if (user?.scholarship) {
      axios.get(`/scholarships/${user?.scholarship}`).then((res) => {
        setscholarship(res.data?.doc?.name);
      });
    }

    if (user?.section) {
      axios.get(`/sections/${user?.section}`).then((res) => {
        setsection(res.data.doc?.name);
      });
    }
  }, [user, feesSelector]);

  return (
    <div className="tab__container">
      <div className="row  mb-3">
        <div className="col-4">Class </div>
        <div className="col-6">{user?.classID} </div>
      </div>
      <div className="row  mb-3">
        <div className="col-4">Student Status </div>
        <div className="col-6">{user?.status} </div>
      </div>

      <div className="row  mb-3">
        <div className="col-4">Last School </div>
        <div className="col-6">{user?.LastSchool?.school || "N/A"} </div>
      </div>
      <div className="row  mb-3">
        <div className="col-4">Reason for Leaving last School </div>
        <div className="col-6"> {user?.LastSchool?.reason || "N/A"} </div>
      </div>
    </div>
  );
}

export default AcademicTab;
