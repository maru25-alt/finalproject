import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import CreateNotification from "./CreatNotice";
import Notice from "./Notice";
import axios from "../../store/axios";
import EditNotice from "./EditNotice";
import Search from "../components/Search";
import moment from "moment";
import { getTrimString, errorAlert, successAlert } from "../../utils";

function Notifications() {
  const user = useSelector(selectUser);
  const [date, setdate] = useState("");
  const [title, settitle] = useState("");
  const [loading, setloading] = useState(false);
  const [description, setdescription] = useState("");
  const [notifications, setnotifications] = useState([]);
  const [storeData, setstoreData] = useState([]);
  const [open, setOpen] = useState(false);
  const [query, setquery] = useState("");

  useEffect(() => {
    axios.get("/notice").then((res) => {
      setnotifications(res.data);
      console.log(res.data);
      setstoreData(res.data);
    });
  }, []);

  //edit
  const [editTitle, seteditTitle] = useState("");
  const [editDescription, seteditDescription] = useState("");
  const [editDate, seteditDate] = useState("");
  const [editloading, seteditloading] = useState(false);
  const [editID, seteditID] = useState("");

  const inputFields = [
    {
      name: "title",
      label: "Search by title",
      type: "text",
      value: query,
      onChange: setquery,
    },
  ];

  const handleCreate = () => {
    setloading(true);
    axios
      .post("/notice/create", {
        title,
        date,
        createdBy: user?.userID,
        description,
      })
      .then(async (res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        await axios.post("/activities/create", {
          activity: `Notice is added on Notice Board`,
          user: user?.userID,
        });
        await axios.post("/notifications/all/create", {
          message: `Notice is added on Notice Board`,
          userID: "all",
          senderID: user?.userID,
        });
        successAlert("Notice created");
        settitle("");
        setdate("");
        setdescription("");
        setnotifications([res.data.doc, ...notifications]);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
        errorAlert("Failed to create");
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`/notice/delete/${editID}`)
      .then(async (res) => {
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setnotifications(notifications.filter((e) => e._id !== editID));
        successAlert("Notice deleted");
        setOpen(false);
        await axios.post("/activities/create", {
          activity: `Notice is deleted on  Notice Board`,
          user: user?.userID,
        });
      })
      .catch((err) => {
        console.log(err);
        errorAlert("Failed to delete");
      });
  };

  const handleEdit = (id) => {
    setOpen(true);
    let selected = notifications.find((e) => e._id === id);
    console.log(moment(selected?.date).format("YYYY-MM-DD"));
    seteditDate(moment(selected?.date).format("YYYY-MM-DD"));
    seteditTitle(selected?.title);
    seteditDescription(selected?.description);
    seteditID(id);
  };

  const onEdit = () => {
    seteditloading(true);
    axios
      .put(`/notification/update/${editID}`, {
        title: editTitle,
        date: editDate,
        createdBy: user?.userID,
        description: editDescription,
      })
      .then((res) => {
        seteditloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        successAlert("Notice successfully edited");
        seteditTitle("");
        seteditDate("");
        seteditDescription("");
        setOpen(false);
        let arr = notifications.filter((e) => e._id !== editID);
        setnotifications([res.data.doc, ...arr]);
      })
      .catch((err) => {
        console.log(err);
        seteditloading(false);
        errorAlert("Failed to create");
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      let newNotices = [];
      if (query) {
        newNotices = storeData.filter(
          (i) =>
            i.title.toLowerCase().includes(query.toLowerCase()) ||
            i.description.toLowerCase().includes(query.toLowerCase())
        );
      }
      setnotifications(newNotices);
    }
  };
  return (
    <>
      {user?.role !== "student" && (
        <CreateNotification
          date={date}
          setdate={setdate}
          title={title}
          settitle={settitle}
          handleCreate={handleCreate}
          loading={loading}
          description={description}
          setdescription={setdescription}
        />
      )}
      <div className="content__container">
        <h3>Notice Board</h3>
        <Search inputFields={inputFields} handleSearch={handleSearch} />

        <div>
          {notifications.length > 0 ? (
            notifications.map((e) => (
              <div>
                <Notice
                  description={getTrimString(e?.description, 100)}
                  createdBy={e.createdBy}
                  date={e.date}
                  title={e.title}
                  createdAt={e.createdAt}
                  isEdit={user?.role !== "student"}
                  id={e._id}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              </div>
            ))
          ) : (
            <div className="text-center text-danger">No Notifications</div>
          )}
        </div>

        <EditNotice
          open={open}
          setOpen={setOpen}
          handleDelete={handleDelete}
          description={editDescription}
          setdescription={seteditDescription}
          title={editTitle}
          settitle={seteditTitle}
          date={editDate}
          setdate={seteditDate}
          loading={editloading}
          onSubmit={onEdit}
        />
      </div>
    </>
  );
}

export default Notifications;
