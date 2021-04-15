import React, { useEffect, useState } from "react";
import Table from "./StudentsTable";
import axios from "../../../store/axios";
import SetScore from "./SetScore";
import { errorAlert } from "../../../utils";
import PrintIcon from "@material-ui/icons/Print";

function TeacherClassWork({ id, classID }) {
  const [students, setstudents] = useState([]);
  const [taskData, settaskData] = useState({});
  const [task, settask] = useState("");
  const [tasks, settasks] = useState([]);
  const [open, setopen] = useState(false);
  const [selected, setselected] = useState({});
  const [score, setscore] = useState("");
  const [data, setdata] = useState({});
  const [loading, setloading] = useState(false);

  useEffect(() => {
    axios.get(`/tasks/class/${classID}/${id}`).then((res) => {
      if (res.data.error) {
        return 0;
      }
      settasks(res.data.docs);
    });
  }, [classID, id]);

  const handleSelecttask = async (e) => {
    settask(e);
    await axios
      .get(`/coursesresults/course/${classID}/${id}/${e}`)
      .then((res) => {
        let selectedTask = tasks.find((i) => i._id === e);
        settaskData(selectedTask);
        setdata(res.data.docs);

        setstudents(res.data.docs.students);
      });
  };

  const handleRecordScore = (id) => {
    setopen(true);
    let student = students.find((e) => e.userID === id);
    setselected(student);
    setscore(student?.score);
  };

  const onSubmit = () => {
    setloading(true);
    axios
      .put(`/coursesresults/update/student/${data?._id}/${selected?.userID}`, {
        userID: selected?.userID,
        name: selected?.name,
        score,
      })
      .then((res) => {
        setopen(false);
        setloading(false);
        setstudents(res.data.doc?.students);
        console.log(res.data);
      })
      .catch((err) => {
        errorAlert("Failed");
        setloading(false);
      });
  };

  const handlePrint = () => {
    console.log("clickes");
    window.print();
    //window.print();
  };

  return (
    <div>
      <div className="content__container">
        <div className="mb-3">
          <h5>Select Task</h5>
          <div className="">
            <select
              name="academic-calendar"
              className="form-select"
              value={task}
              onChange={(e) => handleSelecttask(e.target.value)}
            >
              <option defaultValue hidden>
                Choose...
              </option>
              {tasks.length > 0 ? (
                tasks.map((e) => (
                  <option key={e._id} value={e._id}>
                    {e.title}
                  </option>
                ))
              ) : (
                <option disabled>No tasks yet</option>
              )}
            </select>
          </div>
        </div>
      </div>
      <div>
        {task && (
          <>
            <div id="section-to-print">
              <Table rows={students} handleEdit={handleRecordScore} />
            </div>
            <div className="text-center">
              <button onClick={handlePrint} className="btn blue__btn">
                <PrintIcon />
                Print
              </button>
            </div>
          </>
        )}
      </div>

      <SetScore
        score={score}
        setscore={setscore}
        open={open}
        setOpen={setopen}
        loading={loading}
        task={taskData}
        student={selected}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default TeacherClassWork;
