import React from "react";
import Attendance from "./Attendance";
import Card from "../../shared/dashboard/Card";
import ClassIcon from "@material-ui/icons/Class";
import Notifications from "../../shared/dashboard/Notifications";

function Index() {
  return (
    <div className="dashboard">
      <div className="row">
        <div className="col-sm-8">
          <Attendance />
          <div className="card">
            <div className="row">
              <div className="col-sm-6 col-md-4">
                <Card
                  name="My Classes"
                  icon={<ClassIcon />}
                  value={10}
                  route={"/"}
                />
              </div>
              <div className="col-sm-6 col-md-4">
                <Card
                  name="My Timetable"
                  icon={<ClassIcon />}
                  value={10}
                  route={"/"}
                />
              </div>
              <div className="col-sm-6 col-md-4">
                <Card
                  name="Exams"
                  icon={<ClassIcon />}
                  value={10}
                  route={"/"}
                />
              </div>
              <div className="col-sm-6 col-md-4">
                <Card
                  name="School Calendar"
                  icon={<ClassIcon />}
                  value={10}
                  route={"/"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <Notifications />
        </div>
      </div>
    </div>
  );
}

export default Index;
