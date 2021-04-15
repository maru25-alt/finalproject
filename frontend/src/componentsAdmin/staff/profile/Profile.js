import React, { useState, useEffect } from "react";
import StaffInfo from "../../../shared/userInfoTabs/UserInfo";
import StaffTabs from "../../../shared/userInfoTabs/StaffTabs";
import axios from "../../../store/axios";
import { useParams } from "react-router-dom";
import Loading from "../../../Loading";

function Profile() {
  const [details, setdetails] = useState(null);
  const [loading, setloading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setloading(true);
    axios.get(`/nonteachers/${id}`).then((res) => {
      setloading(false);
      if (res.data.error) {
        // errorAlert(res.data.error);
        return 0;
      }
      setdetails(res.data.user);
    });
  }, [id]);
  return (
    <div className="profile">
      {loading && <Loading />}
      <h3>Staff Profile</h3>
      <div className="row">
        {details ? (
          <>
            <div className="mb-3">
              <StaffInfo
                name={details?.name}
                surname={details?.surname}
                middleName={details?.middleName}
                role={details?.role}
                route="staff"
                id={details?.userID}
              />
            </div>
            <div>
              <StaffTabs user={details} />
            </div>
          </>
        ) : (
          <h1 className="text-danger text-center">
            {loading ? "Loading..." : "Staff Member not available"}
          </h1>
        )}
      </div>
    </div>
  );
}

export default Profile;
