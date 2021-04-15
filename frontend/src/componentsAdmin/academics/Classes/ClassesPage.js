import React, { useEffect, useState } from "react";
import Table from "./ClassTable";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";
import EditClass from "./EditClass";
import Search from "../../../shared/components/Search";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectacademicYearsGroup,
  selectacademicYear,
} from "../../../store/slices/schoolSlice";

const tableHeader = [
  { id: "name", name: "Class Name" },
  { id: "prefect", name: "Prefect" },
  { id: "teacherID", name: "Class Teacher" },
  { id: "students", name: "Students" },
  { id: "academicYear", name: "Academic Year" },
];

function ClassesPage() {
  const [data, setdata] = useState([]);
  const [openEdit, setopenEdit] = useState(false);
  const [loading, setloading] = useState(false);
  const [classname, setclassname] = useState("");
  const [classCode, setclassCode] = useState("");
  const [teacher, setteacher] = useState("");
  const [prefect, setprefect] = useState("");
  const [editID, seteditID] = useState("");
  const [name, setname] = useState("");
  const [editLoading, seteditLoading] = useState(false);
  const [academic, setacademic] = useState("");
  const [query, setquery] = useState("");
  const [storeData, setstoreData] = useState([]);
  const [queryteacher, setqueryteacher] = useState("");
  const [queryacademicYear, setqueryacademicYear] = useState("");
  const years = useSelector(selectacademicYearsGroup);

  const inputFields = [
    {
      type: "text",
      label: "Search by Name",
      name: "name",
      value: query,
      onChange: setquery,
    },
    {
      type: "select",
      label: "Search by Teacher",
      name: "teacher",
      value: queryteacher,
      options: [],
      onChange: setqueryteacher,
    },
    {
      type: "select",
      label: "Search by Academic Year",
      name: "year",
      value: queryacademicYear,
      options: years.map((e) => {
        return { name: e.year, id: e.year };
      }),
      onChange: setqueryacademicYear,
    },
  ];

  useEffect(() => {
    setloading(true);
    axios.get("/classes").then((res) => {
      setloading(false);
      setdata(res.data);
      console.log(res.data);
      setstoreData(res.data);
    });
  }, []);

  const handleDeleteClass = (id) => {
    const ans = window.confirm("are you sure you want to delete");
    if (ans) {
      axios.delete(`/classes/delete/${id}`).then((res) => {
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setdata(data.filter((course) => course._id !== id));
      });
    }
  };

  const handleEditClass = (id) => {
    setopenEdit(true);
    seteditID(id);
    let classData = data.find((e) => e._id === id);
    setclassname(classData?.name);
    setname(classData?.name);
    setclassCode(classData?.classCode);
    setteacher(classData?.teacherID);
    setprefect(classData?.prefect);
  };

  const onEditClass = () => {
    seteditLoading(true);
    axios
      .put(`/classes/update/${editID}`, {
        name,
        classCode,
        academicYear: academic,
        teacherID: teacher,
        prefect,
      })
      .then((res) => {
        seteditLoading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setopenEdit(false);
        successAlert("changes successfully saved");
        console.log(res.data.doc);
        setdata((e) => (e._id === editID ? res.data.doc : e));
      })
      .catch(() => {
        errorAlert("something went wrong");
      });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setquery("");
    setqueryteacher("");
    setqueryacademicYear("");
    setdata(setstoreData);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // let newStaff = [];
    // if (name) {
    //   newStaff = storeData.filter(
    //     (i) =>
    //       i.name.toLowerCase().includes(name.toLowerCase()) ||
    //       i.surname.toLowerCase().includes(name.toLowerCase())
    //   );
    // }
    // if (userID) {
    //   newStaff = storeData.filter((i) =>
    //     i.userID.toLowerCase().includes(userID.toLowerCase())
    //   );
    // }
    // setrows(newStaff);
  };

  return (
    <div>
      <h3>Classes</h3>
      <div className="mb-3">
        <Search
          inputFields={inputFields}
          handleSearch={handleSearch}
          handleReset={handleReset}
        />
      </div>
      <div className="d-flex justify-content-end my-3">
        <Link to="/academics/classes/new" className="btn blue__btn">
          Add New Class
        </Link>
      </div>
      <Table
        handleDelete={handleDeleteClass}
        handleEdit={handleEditClass}
        data={data}
        tableHeader={tableHeader}
      ></Table>

      <EditClass
        name={name}
        classname={classname}
        setclassname={setclassname}
        teacher={teacher}
        handleEditClass={onEditClass}
        classCode={classCode}
        setclassCode={setclassCode}
        setteacher={setteacher}
        setprefect={setprefect}
        prefect={prefect}
        open={openEdit}
        loading={editLoading}
        academic={academic}
        setacademic={setacademic}
        setOpen={setopenEdit}
      />
    </div>
  );
}

export default ClassesPage;
