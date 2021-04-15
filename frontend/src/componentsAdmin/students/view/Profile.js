import React, { useEffect, useState } from "react";
import StudentInfo from "../../../shared/userInfoTabs/UserInfo";
import StudentTabs from "../../../shared/userInfoTabs/StudentTabs";
import axios from "../../../store/axios";
import { useParams } from "react-router-dom";

function StudentDetails() {
  const [details, setdetails] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    axios.get(`/students/${id}`).then((res) => {
      if (res.data.error) {
        // errorAlert(res.data.error);
        return 0;
      }
      console.log(res.data);
      setdetails(res.data.user);
    });
  }, [id]);

  return (
    <div className="profile">
      <h3>Student Details</h3>
      <div className="row">
        {details ? (
          <>
            <div className="mb-3">
              <StudentInfo
                name={details?.name}
                surname={details?.surname}
                middleName={details?.middleName}
                role={details?.role}
                route="students"
                id={details?.userID}
              />
            </div>
            <div>
              <StudentTabs user={details} />
            </div>
          </>
        ) : (
          <h1 className="text-danger text-center">Student not found</h1>
        )}
      </div>
    </div>
  );
}

export default StudentDetails;
