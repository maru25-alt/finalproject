import { useState } from "react";
import React from "react";
import ClassForm from "./ClassForm";
import axios from "../../../store/axios";
import { selectacademicYear } from "../../../store/slices/schoolSlice";
import { errorAlert, successAlert } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { selectClasses, setClasses } from "../../../store/slices/schoolSlice";

function AddClass() {
  const academicYear = useSelector(selectacademicYear);
  const [name, setname] = useState("");
  const [teacher, setteacher] = useState("");
  const [code, setcode] = useState("");
  const [loading, setloading] = useState(false);
  const [academic, setacademic] = useState(academicYear?.year);
  const dispatch = useDispatch();
  const classes = useSelector(selectClasses);
  const [prefect, setprefect] = useState("");

  const handleAddClass = () => {
    setloading(true);
    axios
      .post("/classes/create", {
        classCode: code,
        name,
        teacherID: teacher,
        academic: academicYear,
        prefect,
      })
      .then((res) => {
        let { data } = res;
        if (data?.error) {
          errorAlert(data.error);
          return 0;
        }
        successAlert(`class ${data.doc?.classCode} is successfully added`);
        setloading(false);
        dispatch(setClasses([data.doc, ...classes]));
        setcode("");
        setname("");
        setacademic("");
        setteacher("");
      })
      .catch((e) => {
        console.log(e);
        errorAlert("something when wrong");
        setloading(false);
      });
  };

  return (
    <>
      <h3 className="mb-5">Add New Class</h3>
      <div className="content__container col-md-8">
        <ClassForm
          name={name}
          setname={setname}
          code={code}
          academic={academic}
          setacademic={setacademic}
          loading={loading}
          setcode={setcode}
          teacher={teacher}
          handleAddClass={handleAddClass}
          setteacher={setteacher}
          setprefect={setprefect}
          prefects={prefect}
        />
      </div>
    </>
  );
}

export default AddClass;
