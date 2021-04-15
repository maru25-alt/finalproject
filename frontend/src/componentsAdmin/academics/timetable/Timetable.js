import React, { useEffect, useState } from "react";
import Search from "./Search";
import Table from "../../../shared/timetable/Timeble";
import axios from "../../../store/axios";
import SetForm from "./SetForm";
import { errorAlert, successAlert } from "../../../utils";

function Timetable() {
  const [classes, setclasses] = useState([]);
  const [classID, setclassID] = useState("");
  const [selectedClass, setselectedClass] = useState("");
  const [data, setdata] = useState([]);
  const [open, setopen] = useState(false);
  const [courses, setcourses] = useState([]);
  const [day, setday] = useState("");
  const [period, setperiod] = useState("");
  const [courseID, setcourseID] = useState("");
  const [start, setstart] = useState("");
  const [end, setend] = useState("");
  const [loading, setloading] = useState(false);

  useEffect(() => {
    axios.get(`/classes`).then((res) => {
      setclasses(res.data);
    });
  }, []);

  const handleSelectClass = async () => {
    setselectedClass(classID);
    await axios.get(`/courses/class/${classID}`).then((res) => {
      setcourses(res.data.docs);
    });

    await axios.get(`/timetable/class/${classID}`).then((res) => {
      setdata(res.data.docs);
    });
  };

  console.log(courses);

  const handleSet = () => {
    setloading(true);
    let selectedCourse = courses.find((i) => i.code === courseID);
    let details = selectedCourse.classes.find((e) => e.class === selectedClass);

    axios
      .post(`/timetable/create`, {
        classID: selectedClass,
        courseID: selectedCourse?.name,
        teacherID: details?.teacher,
        day,
        period,
        start,
        end,
      })
      .then(async (res) => {
        setloading(false);
        if (res.data.error) {
          return errorAlert(res.data.error);
        }
        setopen(false);
        await axios.get(`/timetable/class/${selectedClass}`).then((res) => {
          setdata(res.data.docs);
        });
      });
  };

  return (
    <div className="timetable">
      <Search
        classes={classes}
        classID={classID}
        setclassID={setclassID}
        onSearch={handleSelectClass}
      />

      {selectedClass && (
        <div className="content__container">
          <div className="d-flex justify-content-between">
            <div>
              <h3>Timetable for {selectedClass}</h3>
            </div>
            <div>
              <button onClick={() => setopen(true)} className="btn blue__btn">
                Set
              </button>{" "}
            </div>
          </div>
          <Table data={data} />
        </div>
      )}
      <SetForm
        course={courseID}
        setcourse={setcourseID}
        period={period}
        setperiod={setperiod}
        open={open}
        setOpen={setopen}
        courses={courses}
        day={day}
        onSubmit={handleSet}
        setday={setday}
        start={start}
        setstart={setstart}
        end={end}
        setend={setend}
        loading={loading}
      />
    </div>
  );
}

export default Timetable;
