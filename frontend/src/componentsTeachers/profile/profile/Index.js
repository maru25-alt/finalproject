import React, { useState, useEffect } from "react";
import UserInfo from "../../../shared/userInfoTabs/UserInfo";
import StudentsTabs from "../../../shared/userInfoTabs/StaffTabs";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import axios from "../../../store/axios";

function Index() {
  const user = useSelector(selectUser);
  const [userDetails, setuserDetails] = useState({});

  useEffect(() => {
    axios.get(`/teachers/${user.userID}`).then((res) => {
      console.log(res);
      setuserDetails(res.data?.user);
    });
  }, [user]);

  console.log(userDetails, "userdetails");

  return (
    <div>
      <h3>My Profile</h3>
      <UserInfo
        id={userDetails?.userID}
        name={userDetails?.name}
        surname={userDetails?.surname}
        middleName={userDetails?.middleName}
        role={userDetails?.role}
        route="/profile"
        profileUrl={userDetails?.profileUrl}
      />

      <StudentsTabs user={userDetails} />
    </div>
  );
}

export default Index;
