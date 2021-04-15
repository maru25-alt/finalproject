import React, { useState, useEffect } from "react";
import { selectUser } from "../../../store/slices/userSlice";
import { useSelector } from "react-redux";
import axios from "../../../store/axios";
import ClassInfo from "../../../shared/classes/Class";

function Index() {
  const user = useSelector(selectUser);
  const [classDetails, setclassDetails] = useState({});
  const [classID, setclassID] = useState("");

  useEffect(() => {
    const getData = async () => {
      let studentData = await axios.get(`/students/${user?.userID}`);
      let classID = studentData.data.user?.classID;
      setclassID(classID);
      // await axios.get(`/classes/classCode/${classID}`).then((res) => {
      //   console.log(res.data);
      //   setclassDetails(res.data.docs);
      // });
    };
    getData();
  }, [user]);

  return (
    <div className="">
      <ClassInfo classID={classID} />
    </div>
  );
}

export default Index;
