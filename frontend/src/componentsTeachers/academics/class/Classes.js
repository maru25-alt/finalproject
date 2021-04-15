import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import axios from "../../../store/axios";
import Loading from "../../../Loading";
import Card from "../../../shared/academics/ClassCard";

const tableHeader = [
  { id: "userID", name: "Student ID" },
  { id: "profileUrl", name: "Profile" },
  { id: "name", name: "Name" },
  { id: "middleName", name: "Middle Name" },
  { id: "surname", name: "Surname" },
  { id: "gender", name: "Gender" },
];

function Class() {
  const [classes, setclasses] = useState([]);
  const user = useSelector(selectUser);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    axios
      .get(`/classes/teacher/${user?.userID}`)
      .then((res) => {
        setloading(false);
        console.log(res);
        if (res.data.error) {
          return 0;
        }
        setclasses(res.data.docs);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  }, [user]);

  console.log(classes);

  return (
    <div>
      {loading && <Loading />}
      <h3>Classes </h3>
      <div className="content__container">
        {classes.length > 0 ? (
          classes.map((res) => (
            <div className="col-xs-12 col-sm-6 col-md-4" key={res._id}>
              <Card name={res.name} classCode={res.classCode} />
            </div>
          ))
        ) : (
          <div>No data </div>
        )}
      </div>
    </div>
  );
}

export default Class;
