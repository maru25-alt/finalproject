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
  open,
  setOpen,
  title,
  settitle,
  setdescription,
  description,
  loading,
  resource,
  setresource,
  date,
  setdate,
  onSubmit,
}) {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        color="transparent"
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Add School Calendar Event
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="m-5 col-sm-6 col-mb-9"
        >
          <div className="mb-3">
            <label className="form-label">Event Title</label>
            <input
              value={title}
              onChange={(e) => settitle(e.target.value)}
              ref={register({ required: true })}
              type="text"
              className="form-control"
              name="event"
            />
            {errors.event && (
              <span className=" form-error text-danger mb-2">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Event Description</label>
            <textarea
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              type="text"
              rows={4}
              className="form-control"
              name="description"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Event Type</label>
            <select
              value={resource}
              onChange={(e) => setresource(e.target.value)}
              name="type"
              className="form-select"
            >
              <option defaultValue hidden>
                Choose...
              </option>
              <option>Holiday</option>
              <option>Easter Break</option>
              <option>Mid Term</option>
              <option>Break</option>
              <option>Trip</option>
              <option>Sports</option>
              <option>Competitons</option>
              <option>Visiting Day</option>
              <option>Mid Term Assessment</option>
              <option>Independence Holiday</option>
              <option>Revision Week</option>
              <option>Other</option>
            </select>
          </div>
          <div className="mb-3 ">
            <label className="form-label">Date</label>
            <input
              value={date}
              ref={register({ required: true })}
              onChange={(e) => setdate(e.target.value)}
              type="date"
              className="form-control"
              name="startdate"
            />
            {errors.starttime && (
              <span className=" form-error text-danger mb-2">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-3">
            <button disabled={loading} className="btn blue__btn">
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              Add
            </button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
