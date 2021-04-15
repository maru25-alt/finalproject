import React, { useState, useEffect } from "react";
import Table from "../../../shared/tables/Table";
import Search from "../../../shared/components/Search";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";
import Form from "./DepartmentForm";

const tableHeadings = [
  { id: "name", name: "Name" },
  { id: "teacherID", name: "Head Teacher" },
  { id: "description", name: "Description" },
];

function Courses() {
  const [name, setname] = useState("");
  const [teacher, setteacher] = useState("");
  const [description, setdescription] = useState("");
  const [addloading, setaddloading] = useState(false);
  const [storeData, setstoreData] = useState([]);
  const [loading, setloading] = useState(false);
  const [open, setopen] = useState(false);
  const [openAdd, setopenAdd] = useState(false);
  const [query, setquery] = useState("");
  const [departments, setdepartments] = useState([]);

  //edit
  const [editname, seteditname] = useState("");
  const [editteacher, seteditteacher] = useState("");
  const [editdescription, seteditdescription] = useState("");
  const [editID, seteditID] = useState("");

  useEffect(() => {
    axios
      .get("/departments")
      .then((res) => {
        setstoreData(res.data);
        setdepartments(res.data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  }, []);

  const inputFields = [
    {
      type: "text",
      label: "Search Name",
      value: query,
      name: "name",
      onChange: setquery,
    },
  ];

  const handleDelete = (id) => {
    const ans = window.confirm("are you sure you want to delete");
    if (ans) {
      axios.delete(`/departments/delete/${id}`).then(async (res) => {
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        let deleted = departments.find((e) => e._id === id);
        setdepartments(departments.filter((e) => e._id !== id));

        await axios.post("/activities/create", {
          activity: `department ${deleted?.name} was deleted`,
          user: "admin",
        });
      });
    }
  };

  const handleEdit = (id) => {
    setopen(true);
    seteditID(id);
    let selected = departments.find((i) => i._id === id);
    seteditname(selected?.name);
    seteditdescription(selected?.description);
    seteditteacher(selected?.teacherID);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let newClasses = [];
    if (name) {
      newClasses = storeData.filter(
        (i) =>
          i?.name.toLowerCase().includes(name?.toLowerCase()) ||
          i?.code.toLowerCase().includes(name?.toLowerCase())
      );
    }
    setdepartments(newClasses);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setname("");
    setdepartments(storeData);
  };

  const handleEditDepartment = () => {
    setaddloading(true);
    axios
      .put(`/departments/update/${editID}`, {
        name: editname,
        teacherID: editteacher,
        description: editdescription,
      })
      .then((res) => {
        setaddloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setopen(false);
        successAlert("changes successfully saved");
        setdepartments((e) => (e._id === editID ? res.data.doc : e));
      })
      .catch(() => {
        errorAlert("something went wrong");
      });
  };

  const handleAddDepartment = () => {
    setloading(true);
    axios
      .post("/departments/create", { name, description, teacher })
      .then(async (res) => {
        setloading(false);
        if (res.data.error) {
          setloading(false);
          errorAlert(res.data.error);
          return 0;
        }
        await axios.post("/activities/create", {
          activity: `new department ${name}  was added`,
          user: "admin",
        });
        setdepartments([res.data.doc, ...departments]);
        successAlert("successfull added");
        setname("");
        setteacher("");
        setdescription("");
      })
      .catch(() => {
        setloading(false);
        errorAlert("sorry something when wrong");
      });
  };

  return (
    <div>
      <div className="">
        <Search
          title="Departments "
          handleSearch={handleSearch}
          handleReset={handleReset}
          inputFields={inputFields}
        />
      </div>
      <div className="d-flex justify-content-end mb-3">
        <button onClick={() => setopen(true)} className="btn blue__btn btn__lg">
          Add New Department
        </button>
      </div>

      <Table
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        data={departments}
        tableHeader={tableHeadings}
      />

      <Form
        teacher={teacher}
        setteacher={setteacher}
        name={name}
        setname={setname}
        open={openAdd}
        setOpen={setopenAdd}
        loading={addloading}
        description={description}
        setdescription={setdescription}
        onSubmit={handleAddDepartment}
      />
      <Form
        teacher={editteacher}
        setteacher={seteditteacher}
        name={editname}
        setname={seteditname}
        open={open}
        isEdit={true}
        setOpen={setopen}
        loading={loading}
        description={editdescription}
        setdescription={seteditdescription}
        onSubmit={handleEditDepartment}
      />
    </div>
  );
}

export default Courses;
