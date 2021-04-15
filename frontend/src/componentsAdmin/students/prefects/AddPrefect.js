import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    background: "#0ab3f2",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  handleAdd,
  loading,
  setposition,
  position,
  handleSearchbyClass,
  handleSelectStudent,
  name,
  setname,
  userID,
  setuserID,
  open,
  setOpen,
  classesArr,
  students,
}) {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const { register, handleSubmit, errors } = useForm();
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Add New Prefects
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="mx-5 mt-5">
          <div className="mb-3">
            <div className="col-sm-6 ">
              <label className="form-label">Student's Class</label>
              <select
                onChange={(e) => handleSearchbyClass(e.target.value)}
                id="inputState"
                className="form-select"
              >
                <option defaultValue hidden>
                  Choose...
                </option>
                {classesArr?.map((e) => (
                  <option key={e?.classCode} value={e?.classCode}>
                    {e?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {students.length > 0 && (
            <div className="mb-3">
              <div className="col-sm-6 ">
                <label className="form-label">Select Student</label>
                <select
                  onChange={(e) => handleSelectStudent(e.target.value)}
                  id="inputState"
                  className="form-select"
                >
                  <option defaultValue hidden>
                    Choose...
                  </option>
                  {students.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.id} {e.name} {e.surname}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
        <form action="" className="mx-5 mb-5">
          <div className=" mb-3">
            <label className="col-sm-3 col-form-label">Name</label>
            <div className="col-sm-6 col-mb-9">
              <input
                type="text"
                value={name}
                ref={register({ required: true })}
                //onChange={(e) => setname(e.target.value)}
                readOnly
                className="form-control"
                name="name"
              />
              {errors.name && (
                <span className=" form-error text-danger mb-2">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className=" mb-3">
            <label className="col-sm-3 col-form-label">Student ID</label>
            <div className="col-sm-6 col-mb-9">
              <input
                type="text"
                ref={register({ required: true })}
                className="form-control"
                value={userID}
                //onChange={(e) => setuserID(e.target.value)}
                readOnly
                name="userId"
              />
              {errors.userId && (
                <span className=" form-error text-danger mb-2">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className=" mb-3">
            <label className="col-sm-3 col-form-label">Position</label>
            <div className="col-sm-6 col-mb-9">
              <select
                ref={register({ required: true })}
                name="position"
                value={position}
                onChange={(e) => setposition(e.target.value)}
                className="form-select"
              >
                <option defaultValue hidden>
                  Choose...
                </option>
                <option value="Headgirl">Head Girl</option>
                <option value="Headboy">Head Boy</option>
                <option value="Vice Headgirl">Vice Headgirl</option>
                <option value="Vice Headboy">Vice Headboy</option>
                <option value="Senior Prefect">Senior Prefect</option>
                <option value="Prefect">Prefect </option>
                <option value="other">Other </option>
              </select>
              {errors.position && (
                <span className=" form-error text-danger mb-2">
                  This field is required
                </span>
              )}
            </div>
          </div>
          <div className=" mb-3">
            <div className="col-sm-3">
              <button
                disabled={loading}
                onClick={handleSubmit(handleAdd)}
                className="btn blue__btn "
              >
                {loading && (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                Add
              </button>
            </div>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
