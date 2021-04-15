import React, { useState, useEffect } from "react";
import CourseTable from "./CoursesTable";
import Search from "../../../shared/components/Search";
import { Link } from "react-router-dom";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";
import EditCourse from "./EditForm";

const tableHeadings = [
  { id: "code", name: "Course Code" },
  { id: "name", name: "Course" },
  { id: "type", name: "Department" },
  { id: "teacherID", name: "Head Teacher" },
];

function Courses() {
  const [name, setname] = useState("");
  const [depart, setdepart] = useState("");
  const [storeData, setstoreData] = useState([]);
  const [teacher, setteacher] = useState("");
  const [courses, setcourses] = useState([]);
  const [loading, setloading] = useState(false);
  const [openEdit, setopenEdit] = useState(false);

  //edit
  const [editname, seteditname] = useState("");
  const [editteacher, seteditteacher] = useState("");
  const [editdepart, seteditdepart] = useState("");
  const [editCode, seteditCode] = useState("");
  const [editID, seteditID] = useState("");
  const [classesArr, setclassesArr] = useState([]);

  useEffect(() => {
    setloading(true);
    axios.get("/courses").then((res) => {
      setstoreData(res.data);
      setcourses(res.data);
      setloading(false);
    });
  }, []);

  const inputFields = [
    {
      type: "text",
      label: "Search Name",
      value: name,
      name: "name",
      onChange: setname,
    },
    {
      type: "select",
      label: "Search by Department",
      value: depart,
      name: "type",
      options: [],
      onChange: setdepart,
    },
    {
      type: "select",
      label: "Search Teacher",
      value: teacher,
      name: "teacher",
      options: [],
      onChange: setteacher,
    },
  ];

  const handleDelete = (id) => {
    const ans = window.confirm("are you sure you want to delete");
    if (ans) {
      axios.delete(`/courses/delete/${id}`).then((res) => {
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setcourses(courses.filter((course) => course._id !== id));
      });
    }
  };
  const handleEdit = (id) => {
    setopenEdit(true);
    seteditID(id);
    let selected = courses.find((i) => i._id === id);
    console.log(selected);
    seteditname(selected?.name);
    setclassesArr(selected?.classes);
    seteditCode(selected?.code);
    seteditteacher(selected?.teacherID);
    seteditdepart(selected?.department);
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
    if (depart) {
      newClasses = newClasses.filter((i) =>
        i?.type.toLowerCase().includes(depart?.toLowerCase())
      );
    }
    if (teacher) {
      newClasses = newClasses.filter((i) =>
        i?.teacher.toLowerCase().includes(teacher?.toLowerCase())
      );
    }
    setcourses(newClasses);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setname("");
    setdepart("");
    setteacher("");
    setcourses(storeData);
  };

  const handleEditCourse = () => {
    setloading(true);
    axios
      .put(`/courses/update/${editID}`, {
        name: editname,
        department: depart,
        teacherID: editteacher,
        classes: classesArr.filter((e) => e.class !== "" || e.teacher !== ""),
        code: editCode,
      })
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setopenEdit(false);
        successAlert("changes successfully saved");
        console.log(editID, res.data);
        setcourses(courses.map((e) => (e._id === editID ? res.data.doc : e)));
      })
      .catch(() => {
        errorAlert("something went wrong");
      });
  };

  return (
    <div>
      <div className="">
        <Search
          title="Courses List"
          handleSearch={handleSearch}
          handleReset={handleReset}
          inputFields={inputFields}
        />
      </div>
      <div className="d-flex justify-content-end mb-3">
        <Link to={`/academics/courses/new`} className="btn blue__btn btn__lg">
          Add New Course
        </Link>
      </div>

      <CourseTable
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        data={courses}
        tableHeader={tableHeadings}
      />

      <EditCourse
        open={openEdit}
        setOpen={setopenEdit}
        name={editname}
        nameTitle={editname}
        setname={seteditname}
        teacher={editteacher}
        loading={loading}
        department={editdepart}
        setdepartment={seteditdepart}
        setteacher={seteditteacher}
        code={editCode}
        setcode={seteditCode}
        setclassesArr={setclassesArr}
        onSubmit={handleEditCourse}
        classesArr={classesArr}
      />
    </div>
  );
}

export default Courses;
