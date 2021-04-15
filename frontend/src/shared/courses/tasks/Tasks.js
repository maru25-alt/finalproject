import React, { useState, useEffect } from "react";
import TasksTable from "./TasksTable";
import ViewTasks from "./ViewTasks";
import Form from "./Form";
import axios from "../../../store/axios";
import moment from "moment";
import { errorAlert, successAlert } from "../../../utils";

function Tasks({ user, courseID, classID }) {
  const [data, setdata] = useState([]);
  const [selected, setselected] = useState({});
  const [openCreate, setopenCreate] = useState(false);
  const [openView, setopenView] = useState(false);
  const [openEdit, setopenEdit] = useState(false);
  const [loading, setloading] = useState(false);
  const [description, setdescription] = useState("");
  const [title, settitle] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const [score, setscore] = useState("");

  console.log(classID, courseID);

  useEffect(() => {
    axios.get(`/tasks/class/${classID}/${courseID}`).then((res) => {
      if (res.data.error) {
        return 0;
      }
      setdata(res.data.docs);
    });
  }, [classID, courseID]);

  const handleView = (id) => {
    setopenView(true);
    let selectedData = data.find((i) => i._id === id);
    setselected(selectedData);
  };

  const handleDelete = (id) => {
    axios
      .delete(`/tasks/delete/${id}`)
      .then((res) => {
        if (res.data.error) {
          return errorAlert(res.data.error);
        }
        setdata.filter((e) => e._id !== id);
      })
      .catch((err) => {
        console.log(err);
        errorAlert("Failed");
      });
  };

  const handleOpenEdit = (id) => {
    setopenEdit(true);
    let selectedData = data.find((i) => i._id === id);
    setselected(selectedData);
    settitle(selectedData?.title);
    setdescription(selectedData?.description);
    setscore(selectedData?.score);
    setdate(moment(selectedData?.deadline).format("YYYY-MM-DD"));
    settime(moment(selectedData?.deadline).format("HH:mm"));
  };
  const handleEdit = () => {
    setloading(true);
    let d = moment(date + " " + time).format("YYYY-MM-DD HH:mm");
    axios
      .put(`/tasks/update/${selected?._id}`, {
        title,
        description,
        score,
        deadline: d,
      })
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          return errorAlert(res.data.error);
        }
        successAlert("successfully created");
        setdata([res.data.doc, ...data]);
        setopenEdit(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
        errorAlert("Failed");
      });
  };
  const handleAdd = () => {
    setloading(true);
    let d = moment(date + " " + time).format("YYYY-MM-DD HH:mm");
    axios
      .post("/tasks/create", {
        title,
        description,
        score,
        deadline: d,
        classID,
        courseID,
        teacherID: user?.userID,
      })
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          return errorAlert(res.data.error);
        }
        successAlert("successfully created");
        setdata([res.data.doc, ...data]);
        setopenCreate(false);
        settitle("");
        setdate("");
        settime("");
        setdescription("");
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
        errorAlert("Failed");
      });
  };

  return (
    <div className="tasks">
      {user?.role === "teacher" && (
        <div className="d-flex justify-content-end mb-3">
          <button onClick={() => setopenCreate(true)} className="btn blue__btn">
            Add New Task
          </button>
        </div>
      )}
      <TasksTable
        handleDelete={handleDelete}
        handleView={handleView}
        handleEdit={handleOpenEdit}
        user={user.role}
        data={data}
      />
      <ViewTasks
        handleDelete={handleDelete}
        selected={selected}
        open={openView}
        handleEdit={handleOpenEdit}
        setOpen={setopenView}
        setselected={setselected}
      />

      <Form
        time={time}
        settime={settime}
        description={description}
        setdescription={setdescription}
        title={title}
        settitle={settitle}
        date={date}
        score={score}
        setscore={setscore}
        setdate={setdate}
        loading={loading}
        onSubmit={handleAdd}
        open={openCreate}
        setOpen={setopenCreate}
      />

      <Form
        time={time}
        settime={settime}
        description={description}
        setdescription={setdescription}
        title={title}
        settitle={settitle}
        date={date}
        score={score}
        setscore={setscore}
        setdate={setdate}
        loading={loading}
        onSubmit={handleEdit}
        isEdit={true}
        open={openEdit}
        setselected={setselected}
        setOpen={setopenEdit}
      />
    </div>
  );
}

export default Tasks;
