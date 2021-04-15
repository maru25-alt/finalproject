import React, { useState, useEffect } from "react";
import Notification from "./Notification";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import axios from "../../store/axios";
import NotificationsIcon from "@material-ui/icons/Notifications";

function Notifications() {
  const user = useSelector(selectUser);
  const [notifications, setnotifications] = useState([
    {
      _id: "12345",
      date: "2021-03-01T02:00:00Z",
      createdBy: "Admin",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sollicitudin lectus a orci pulvinar convallis. Fusce interdum feugiat egestas. Curabitur interdum tortor nisi,",
    },
    {
      _id: "12345rw",
      date: "2021-03-01T02:00:00Z",
      createdBy: "Admin",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sollicitudin lectus a orci pulvinar convallis. Fusce interdum feugiat egestas. Curabitur interdum tortor nisi,",
    },
    {
      _id: "123451-",
      date: "2021-03-01T02:00:00Z",
      createdBy: "Admin",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sollicitudin lectus a orci pulvinar convallis. Fusce interdum feugiat egestas. Curabitur interdum tortor nisi,",
    },
    {
      _id: "123453",
      date: "2021-03-01T02:00:00Z",
      createdBy: "Admin",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sollicitudin lectus a orci pulvinar convallis. Fusce interdum feugiat egestas. Curabitur interdum tortor nisi,",
    },
    {
      _id: "123455",
      date: "2021-03-01T02:00:00Z",
      createdBy: "Admin",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sollicitudin lectus a orci pulvinar convallis. Fusce interdum feugiat egestas. Curabitur interdum tortor nisi,",
    },
    {
      _id: "123455321",
      date: "2021-03-01T02:00:00Z",
      createdBy: "Admin",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sollicitudin lectus a orci pulvinar convallis. Fusce interdum feugiat egestas. Curabitur interdum tortor nisi,",
    },
  ]);

  useEffect(() => {
    axios.get(`/notifications/${user?.userID}`).then((res) => {
      console.log(res.data);
      setnotifications(res.data);
    });
  }, [user]);

  return (
    <div className="notifications card-np">
      <div className="notifications__header  d-flex justify-content-between">
        <h4>Notifications</h4>
        <NotificationsIcon className="icon" />
      </div>
      <div>
        {notifications.length > 0 ? (
          notifications
            .map((notice) => (
              <Notification
                key={notice._id}
                date={notice.date}
                createdBy={notice.createdBy}
                message={notice.message}
              />
            ))
            .splice(0, 5)
        ) : (
          <div className="text-danger text-center my-3">
            {" "}
            <small>There are no notifications at the moment</small>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;
