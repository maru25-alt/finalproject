import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InfoTabs from "../../../shared/userInfoTabs/StudentTabs";
import Profile from "../../../shared/userInfoTabs/UpdateProfile";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import { getCapitalize, getIntial } from "../../../utils";
import axios from "../../../store/axios";

function ProfilePage() {
  const user = useSelector(selectUser);
  const [userDetails, setuserDetails] = useState({});

  useEffect(() => {
    axios.get(`/students/${user?.userID}`).then((res) => {
      console.log(res.data);
      setuserDetails(res.data.user);
    });
  }, [user]);

  return (
    <div className="content__container">
      <h3>About Me</h3>
      <div className="row mb-5">
        <div className="col-xs-12 col-sm-6 col-md-4">
          <Profile profile={user?.photoUrl} id={user?.userID} />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-8">
          <h3>
            {getCapitalize(user?.name)} {getIntial(user?.middleName || "")}{" "}
            {getCapitalize(user?.lastName)}
          </h3>
          <h6>{user?.userID}</h6>
          <div className="muted-text">Role</div>
          <Link to={`/profile/edit`} className="btn blue__btn sm__btn mt-4">
            Edit
          </Link>
        </div>
      </div>
      <div className="Profile Details">
        <InfoTabs user={userDetails} />
      </div>
    </div>
  );
}

export default ProfilePage;
