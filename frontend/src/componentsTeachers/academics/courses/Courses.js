import React, { useState, useEffect } from "react";
import axios from "../../../store/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import { Link } from "react-router-dom";

function Courses() {
  const [courses, setcourses] = useState(null);
  const user = useSelector(selectUser);

  useEffect(() => {
    axios.get(`/courses/teacher/${user?.userID}`).then((res) => {
      if (res.data?.error) {
        setcourses(null);
        return 0;
      }
      setcourses(res.data.docs);
    });
  }, [user]);

  return (
    <div className="">
      <h3>My Courses</h3>
      <div className="row content__container">
        {courses ? (
          courses.map((e) => (
            <div className="col">
              <Link to={`/academics/courses/${e.code}`}>
                <h4> {e?.name}</h4>
                <h6>{e?.class}</h6>
              </Link>
            </div>
          ))
        ) : (
          <h5>No Course details yet</h5>
        )}
      </div>
    </div>
  );
}

export default Courses;
