import React, { useState, useEffect } from "react";
import axios from "../../../store/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/userSlice";
import File from "./File";
import Form from "./Form";
import { errorAlert, successAlert } from "../../../utils";

function Files({ courseID, classID }) {
  const [data, setdata] = useState([]);
  const user = useSelector(selectUser);
  const [open, setopen] = useState(false);
  const [description, setdescription] = useState("");
  const [title, settitle] = useState("");
  const [file, setfile] = useState("");
  const [loading, setloading] = useState(false);

  useEffect(() => {
    axios.get(`/files/course/${courseID}/${classID}`).then((res) => {
      setdata(res.data.docs);
      console.log(res.data.docs);
    });
  }, [courseID, classID]);

  const handleDelete = (i) => {
    axios.delete(`/files/delete/${i}`).then(() => {
      setdata(data.filter((f) => f._id !== i));
    });
  };

  const handleCreate = async () => {
    if (!file) {
      return errorAlert("Please select file");
    }
    if (file.size > 2000000) {
      return errorAlert("The file is too big");
    }
    setloading(true);
    const fileData = new FormData();
    fileData.append("photo", file);
    console.log(file);

    const d = await axios.post("/upload", fileData, {});
    if (d.data.error) {
      setloading(false);
      console.log(d.data.error);
      return errorAlert("The file is too big");
    }

    console.log(data.data.path);
    await axios
      .post("/files/create", {
        title,
        classID,
        courseID: courseID,
        description,
        file: d.data.path,
        senderID: user?.userID,
      })
      .then((response) => {
        setloading(false);
        if (response.data.error) {
          errorAlert(response.data.error);
          setloading(false);
          return 0;
        }
        setopen(false);
        successAlert("file successfully added");
        setdescription("");
        settitle("");
        setfile("");

        setdata([response.data.doc, ...data]);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };

  const handleChangeFile = (e) => {
    console.log(e);
    const selected = e.target.files[0];
    if (selected?.size > 2000000) {
      errorAlert("image is too large");
    } else if (selected) {
      console.log(selected);
      setfile(selected);
    } else {
      console.log("no file selected");
    }
  };

  return (
    <div className="files">
      {user?.role === "teacher" && (
        <div className="d-flex justify-content-end mb-3">
          <button onClick={() => setopen(true)} className="btn blue__btn">
            Add File
          </button>
        </div>
      )}
      {data.length > 0 ? (
        data.map((file) => (
          <File
            key={file?._id}
            title={file?.title}
            description={file?.description}
            file={file?.file}
            date={file?.createdAt}
            user={user.role}
            id={file?._id}
            handleDelete={handleDelete}
          />
        ))
      ) : (
        <div>No files yet </div>
      )}

      <Form
        description={description}
        setdescription={setdescription}
        title={title}
        settitle={settitle}
        loading={loading}
        onSubmit={handleCreate}
        file={file}
        setfile={handleChangeFile}
        open={open}
        user={user?.role}
        setOpen={setopen}
      />
    </div>
  );
}

export default Files;
