import React, { useState } from "react";
import axios from "../../../store/axios";
import Form from "./CourseForm";
import { errorAlert, successAlert } from "../../../utils";

function CourseForm() {
  const [teacher, setteacher] = useState("");
  const [name, setname] = useState("");
  const [code, setcode] = useState("");
  const [department, setdepartment] = useState("");
  const [classes, setclasses] = useState([]);
  const [loading, setloading] = useState("");

  const handleAddCourse = () => {
    setloading(true);
    axios
      .post("/courses/create", {
        name,
        classCode: code,
        department,
        teacherID: teacher,
        classes: classes.filter((e) => e.class !== "" || e.teacher !== ""),
      })
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
        }
        successAlert(`class ${name} is successfully created`);
        setname("");
        setcode("");
        setteacher("");
        setclasses([]);
      });
  };

  return (
    <div>
      <h3>Add New Class</h3>
      <Form
        name={name}
        setname={setname}
        teacher={teacher}
        setteacher={setteacher}
        department={department}
        setdepartment={setdepartment}
        code={code}
        setcode={setcode}
        loading={loading}
        setclassesArr={setclasses}
        onSubmit={handleAddCourse}
        classesArr={classes}
      />
    </div>
  );
}

export default CourseForm;
