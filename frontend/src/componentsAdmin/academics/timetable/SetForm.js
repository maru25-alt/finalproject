import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
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
  onSubmit,
  loading,
  open,
  setOpen,
  course,
  setcourse,
  start,
  setstart,
  end,
  setend,
  courses,
  period,
  setperiod,
  day,
  setday,
}) {
  const { handleSubmit, errors } = useForm();
  const classes = useStyles();

  const days = [
    { name: "Monday", id: 1 },
    { name: "Tuesday", id: 2 },
    { name: "Wednesday", id: 3 },
    { name: "Thursday", id: 4 },
    { name: "Friday", id: 5 },
  ];

  const periods = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
  ];

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        color="transparent"
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Set timetable
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
        <form className="m-5 col-md-6" action="">
          <div className="mb-3">
            <label className="form-label">Course</label>
            <select
              value={course}
              name="class"
              onChange={(e) => setcourse(e.target.value)}
              className="form-select form-select-sm py-2"
            >
              <option hidden defaultValue>
                Select
              </option>
              {courses.length > 0 ? (
                courses.map((option) => (
                  <option key={option._id} value={option.code}>
                    {option.name}
                  </option>
                ))
              ) : (
                <option disabled>No courses </option>
              )}
            </select>
            {errors.title && (
              <span className=" form-error text-danger mb-2">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Day</label>
            <select
              value={day}
              name="day"
              onChange={(e) => setday(e.target.value)}
              className="form-select form-select-sm py-2"
            >
              <option hidden defaultValue>
                Select
              </option>
              {days &&
                days.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
            </select>
            {errors.score && (
              <span className=" form-error text-danger mb-2">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Period</label>
            <select
              value={period}
              name="class"
              onChange={(e) => setperiod(e.target.value)}
              className="form-select form-select-sm py-2"
            >
              <option hidden defaultValue>
                Select
              </option>
              {periods.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.id}
                </option>
              ))}
            </select>
            {errors.score && (
              <span className=" form-error text-danger mb-2">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-3 row">
            <div className="col-sm-6">
              <label className="form-label">Start</label>
              <input
                type="time"
                value={start}
                name="start"
                onChange={(e) => setstart(e.target.value)}
                className="form-control form-select-sm py-2"
              />

              {errors.description && (
                <span className=" form-error text-danger mb-2">
                  This field is required
                </span>
              )}
            </div>
            <div className="col-sm-6">
              <label className="form-label">End</label>
              <input
                type="time"
                value={end}
                name="start"
                onChange={(e) => setend(e.target.value)}
                className="form-control form-select-sm py-2"
              />
            </div>
          </div>

          <div className="mb-3">
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
              type="submit"
              className="btn blue__btn"
            >
              {loading && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              {"Save"}
            </button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
