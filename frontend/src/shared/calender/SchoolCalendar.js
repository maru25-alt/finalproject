import React, { useState, useEffect } from "react";
import Calendar from "./CalenderView";
import axios from "../../store/axios";
import { errorAlert, successAlert } from "../../utils";
import AddEvent from "./AddEvent";
import ViewEvents from "./ViewEvents";

function SchoolCalendar() {
  const [events, setevents] = useState([]);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [openAdd, setopenAdd] = useState(false);
  const [openshow, setopenshow] = useState(false);
  const [resource, setresource] = useState("");
  const [date, setdate] = useState("");
  const [loading, setloading] = useState(false);

  useEffect(() => {
    axios.get("/calendar").then((res) => {
      console.log(res.data);
      setevents(res.data);
    });
  }, []);

  const handleAddEvent = () => {
    setloading(true);
    axios
      .post("/calendar/create", {
        title,
        resource,
        allDay: true,
        day: date,
        description,
      })
      .then(async (res) => {
        if (res.data.error) {
          errorAlert(res.data.error);
          setloading(false);
          return 0;
        }
        successAlert("successfully created");
        setloading(false);
        settitle("");
        setdescription("");
        setresource("");
        setopenAdd(false);
        setevents([res.data.doc, ...events]);
        await axios.post("/activities/create", {
          activity: `School calendar event ${title} is added`,
          user: "admin",
        });
      })
      .catch((err) => {
        errorAlert("sorry something when wrong");
        setloading(false);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`/calendar/delete/${id}`).then((res) => {
      if (res.data.error) {
        errorAlert(res.data.error);
        return 0;
      }
      setevents(events.filter((event) => event._id !== id));
    });
  };

  return (
    <div>
      <div className="d-flex   justify-content-between mb-3">
        <h3>School Calendar</h3>
        <div>
          <button
            onClick={() => setopenshow(true)}
            className="btn blue__btn mx-2"
          >
            View All Events
          </button>
          <button
            onClick={() => setopenAdd(true)}
            className="btn blue__btn mx-2"
          >
            Add Events
          </button>
        </div>
      </div>
      <Calendar events={events} />
      <AddEvent
        open={openAdd}
        setOpen={setopenAdd}
        date={date}
        setdate={setdate}
        title={title}
        onSubmit={handleAddEvent}
        settitle={settitle}
        loading={loading}
        description={description}
        setdescription={setdescription}
        resource={resource}
        setresource={setresource}
      />

      <ViewEvents
        events={events}
        handleDelete={handleDelete}
        open={openshow}
        setOpen={setopenshow}
      />
    </div>
  );
}

export default SchoolCalendar;
