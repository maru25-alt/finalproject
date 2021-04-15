import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
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

export default function FullScreenDialog({
  open,
  setOpen,
  onSubmit,
  loading,
  score,
  student,
  task,
  setscore,
}) {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const handleClose = () => {
    setscore("");
    setOpen(false);
  };

  return (
    <Dialog fullWidth={true} open={open} onClose={handleClose}>
      <AppBar color="transparent" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {student?.name} - {student?.userID}
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
      <form action="" className="m-5">
        <h3 className="mb-1"> Task {task?.title} Score</h3>
        <div className="mb-3">
          {/* <label className="form-label">
            Set Score ({Number(score || 0)}%)
          </label> */}
          <input
            value={score}
            ref={register({
              required: true,
              min: 0,
              max: Number(task?.score || 0) + 1,
            })}
            onChange={(e) => setscore(e.target.value)}
            type="number"
            className="form-control col-sm-6"
            name="a1"
          />
          {errors.a1 && (
            <span className=" form-error text-danger mb-2">
              Total Score ({Number(task?.score || 0)})
            </span>
          )}
        </div>
        <div className="mb-3">
          <button
            disabled={loading}
            onClick={handleSubmit(onSubmit)}
            className="btn blue__btn"
          >
            {loading && (
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            Submit
          </button>
        </div>
      </form>
    </Dialog>
  );
}
