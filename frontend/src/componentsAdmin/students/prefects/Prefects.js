import React, { useState, useEffect } from "react";
import Table from "./TableList";
import AddPrefect from "./AddPrefect";
import EditPrefect from "./EditPrefect";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";

const tableHeader = [
  { id: "userID", label: "UserID" },
  { id: "name", label: "Name" },
  { id: "position", label: "Position" },
];

const date = new Date();

function Prefects() {
  const [data, setdata] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [students, setstudents] = useState([]);
  const [position, setposition] = useState("");
  const [userID, setuserID] = useState("");
  const [name, setname] = useState("");
  const [classesArr, setclassesArr] = useState([]);
  const [loading, setloading] = useState(false);
  const [seteditloading, setseteditloading] = useState(false);
  const [editedname, seteditedname] = useState("");
  const [editposition, seteditposition] = useState("");
  const [editID, seteditID] = useState("");

  useEffect(() => {
    axios.get("/prefects").then((res) => {
      setdata(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/classes").then((res) => {
      setclassesArr(res.data);
    });
  }, []);

  const handleSelectStudent = (id) => {
    let selectedstudent = students.find((e) => e.id === id);
    console.log(id, selectedstudent);
    setname(selectedstudent?.name + " " + selectedstudent?.surname);
    setuserID(selectedstudent?.id);
    //setselectedStudent(id);
  };

  const handleSearchbyClass = (e) => {
    setname("");
    setuserID("");
    axios.get(`/students/class/${e}`).then((res) => {
      console.log(res.data);
      if (res.data.error) {
        //console.log("error");
        errorAlert(res.data.error);
        return 0;
      }
      setstudents(
        res.data.docs.map((user) => {
          return {
            id: user.userID,
            name: user.name,
            surname: user.surname,
          };
        })
      );
    });
  };

  const handleAdd = () => {
    setloading(true);
    axios
      .post("/prefects/add", {
        name,
        userID,
        position,
      })
      .then(async (res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        successAlert("New Prefect successfully added");
        setname("");
        setuserID("");
        setposition("");
        setdata([res.data.doc, ...data]);
        setOpen(false);
        await axios.post("/activities/create", {
          activity: `New prefect's   ${name}  was created`,
          user: "admin",
        });
        await axios.post("/notifications/create", {
          message: `You are added to school prefect board admin as ${position}`,
          userID,
        });
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
        errorAlert("Failed to add");
      });
  };

  const onEdit = () => {
    seteditloading(true);
    axios
      .put(`/prefects/update/${editID}`, {
        posistion: editposition,
      })
      .then(async (res) => {
        seteditloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        successAlert(" Prefect successfully edited");
        setOpenEdit(false);
        seteditposition("");

        let filteredData = data.filter((e) => e._id !== editID);
        setdata([res.data.doc, ...filteredData]);
        await axios.post("/activities/create", {
          activity: `prefect's position  ${editedname}  was edited`,
          user: "admin",
        });
        await axios.post("/notifications/create", {
          message: `Your position is changed to ${position}`,
          userID: editID,
        });
      })
      .catch((err) => {
        console.log(err);
        seteditloading(false);
        errorAlert("Failed to edit");
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`/prefects/delete/${id}`)
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setdata(data.filter((i) => i._id !== id));
      })
      .catch((err) => {
        console.log(err);
        errorAlert("something when wrong");
      });
  };

  return (
    <div>
      <div>
        <h3>School Prefect Board for {date.getFullYear()}</h3>
        <div className="d-flex mb-3 content__container justify-content-between">
          <form action="">
            <input
              className="form-control"
              placeholder="Search..."
              type="text"
            />
          </form>
          <div>
            <button onClick={() => setOpen(true)} className="btn blue__btn">
              Add New Prefect
            </button>
          </div>
        </div>
      </div>
      <Table
        handleDelete={handleDelete}
        rows={data}
        headCells={tableHeader}
      ></Table>
      <AddPrefect
        name={name}
        userID={userID}
        setname={setname}
        setuserID={setuserID}
        students={students}
        handleSearchbyClass={handleSearchbyClass}
        handleSelectStudent={handleSelectStudent}
        open={open}
        classesArr={classesArr}
        position={position}
        loading={loading}
        setposition={setposition}
        setOpen={setOpen}
        handleAdd={handleAdd}
      />
      <EditPrefect open={openEdit} setOpen={setOpenEdit} />
    </div>
  );
}

export default Prefects;
