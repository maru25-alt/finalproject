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
    axios.get(`/teachers/${id}`).then((res) => {
      console.log(res);
      setloading(false);
      if (res.data.error) {
        return 0;
      }
      setdetails(res.data.user);
    });
  }, [id]);
  return (
    <div className="profile">
      {loading && <Loading />}
      <h3>Teacher's Profile</h3>
      <div className="row">
        {details ? (
          <>
            <div className="mb-3">
              <StaffInfo
                name={details?.name}
                surname={details?.surname}
                middleName={details?.middleName}
                role={details?.role}
                route="teachers"
                id={details?.userID}
              />
            </div>
            <div>
              <StaffTabs user={details} />
            </div>
          </>
        ) : (
          <h2 className="text-danger text-center">
            {loading ? "Loading..." : "This Teacher does not exist"}
          </h2>
        )}
      </div>
    </div>
  );
}

export default Profile;
