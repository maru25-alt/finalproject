import React from "react";
import Attendance from "../../shared/dashboard/Attendance";
import Notifications from "../../shared/dashboard/Notifications";
import Card from "../../shared/dashboard/Card";
import ClassIcon from "@material-ui/icons/Class";

function Index() {
  return (
    <div className="dashboard">
      <div className="row">
        <div className="col-sm-8">
          <Attendance />
        </div>
        <div className="col-sm-4">
          <Notifications />
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
