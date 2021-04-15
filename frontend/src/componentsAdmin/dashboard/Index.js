import React, { useEffect, useState } from "react";
import Notifications from "../../shared/dashboard/Notifications";
import Card from "../../shared/dashboard/Card";
import ClassIcon from "@material-ui/icons/Class";
import Date from "./Date";
import { Link } from "react-router-dom";
import GroupIcon from "@material-ui/icons/Group";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import TodayIcon from "@material-ui/icons/Today";
import axios from "../../store/axios";

function Index() {
  const [count, setcount] = useState({});

  useEffect(() => {
    axios.get(`/count/dashboard`).then((res) => {
      setcount(res.data);
    });
  }, []);

  return (
    <div className="dashboard">
      <div className="row">
        <div className="col-xs-12 col-sm-8">
          <div className="card">
            <div>
              <Date />
              <br />
              {/* <div className="mb-2">
                {" "}
                <strong>School Calendar Week {15}</strong>
              </div> */}

              <Link className="btn btn-outline-info" to="/notifications">
                Make an Announcement
              </Link>
            </div>
          </div>
          <div className="card cards__container">
            <div className="row">
              <div className="col-sm-6 col-md-4">
                <Card
                  name="Classes"
                  icon={<ClassIcon />}
                  value={count?.classes}
                  route={"/academics/classes"}
                />
              </div>
              <div className="col-sm-6 col-md-4">
                <Card
                  name="Courses"
                  icon={<ClassIcon />}
                  value={count?.courses}
                  route={"/academics/courses"}
                />
              </div>
              <div className="col-sm-6 col-md-4">
                <Card
                  name="Students"
                  icon={<GroupIcon />}
                  value={count?.students}
                  route={"/students"}
                />
              </div>
              <div className="col-sm-6 col-md-4">
                <Card
                  name="Teachers"
                  icon={<GroupIcon />}
                  value={count?.teachers}
                  route={"/teachers"}
                />
              </div>
              <div className="col-sm-6 col-md-4">
                <Card
                  name="Staff"
                  icon={<GroupIcon />}
                  value={count?.nonTeachers}
                  route={"/staff"}
                />
              </div>
              <div className="col-sm-6 col-md-4">
                <Card
                  name="Attendance"
                  icon={<CalendarTodayIcon />}
                  route={"/attendances/students"}
                />
              </div>
              <div className="col-sm-6 col-md-4">
                <Card
                  name="Departments"
                  icon={<ClassIcon />}
                  value={count?.departments}
                  route={"/academics/departments"}
                />
              </div>
              <div className="col-sm-6 col-md-4">
                <Card name="School Calendar" icon={<TodayIcon />} route={"/"} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-4 d-none d-sm-block">
          <Notifications />
        </div>
      </div>
    </div>
  );
}

export default Index;
