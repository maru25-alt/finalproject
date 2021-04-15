import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import CoursesContainer from "./CourseContainer";
import DefaultView from "./DefaultView";
import axios from "../../store/axios";
import { selectUser } from "../../store/slices/userSlice";
import { useSelector } from "react-redux";

function Courses() {
  const [courses, setcourses] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    const getdata = async () => {
      let data = await axios.get(`/students/${user?.userID}`);
      let classID = data.data.user?.classID;
      let coursesData;

      if (user?.role === "student") {
        coursesData = await axios.get(`/courses/class/${classID}`);
        if (coursesData.data.error) {
          return 0;
        }
        let results = coursesData.data.docs.map((e) =>
          e.classes.map((i) => {
            if (i.class === classID) {
              return {
                class: i.class,
                teacher: i.teacher,
                course: e.name,
                code: e.code,
              };
            }
            return 0;
          })
        );
        let newresults = [].concat.apply([], results).filter((e) => e !== 0);
        setcourses(newresults);
        console.log(newresults);
      } else {
        coursesData = await axios.get(`/courses/teacher/${user?.userID}`);
        console.log(coursesData);
        if (coursesData.data.error) {
          return 0;
        }
        let results = coursesData.data?.docs.map((e) =>
          e.classes.map((i) => {
            if (user?.role === "teacher" && i.teacher === user?.userID) {
              return {
                class: i.class,
                teacher: i.teacher,
                course: e.name,
                code: e.code,
              };
            }
            return 0;
          })
        );
        let newresults = [].concat.apply([], results).filter((e) => e !== 0);
        setcourses(newresults);
      }
    };
    getdata();
  }, [user]);

  return (
    <div className="classes__container ">
      <Sidebar courses={courses} user={user?.role} />
      <Switch>
        <Route
          component={CoursesContainer}
          path="/academics/courses/:id/:classID"
        />
        <Route component={DefaultView} path="/academics/courses" />
      </Switch>
    </div>
  );
}

export default Courses;
