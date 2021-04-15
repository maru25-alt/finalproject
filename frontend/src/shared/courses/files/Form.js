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
    backgroundColor: "#0ab3f2",
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
  file,
  setfile,
  settitle,
  description,
  setdescription,
  isEdit,
  loading,

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
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {!isEdit ? "Add File" : "Edit Task"}
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
        <form className="m-5" action="">
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              value={title}
              ref={register({ required: true })}
              onChange={(e) => settitle(e.target.value)}
              className="form-control"
              name="title"
            />
            {errors.title && (
              <span className=" form-error text-danger mb-2">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-3 ">
            <label className="form-label">Description</label>
            <textarea
              value={description}
              rows={5}
              ref={register({ required: true })}
              onChange={(e) => setdescription(e.target.value)}
              className="form-control"
              name="description"
            />
            {errors.description && (
              <span className=" form-error text-danger mb-2">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Upload File</label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.doc,.docx,.pdf, .zip"
              ref={register({ required: true })}
              onChange={(e) => setfile(e)}
              className="form-control"
              name="score"
            />
            {errors.score && (
              <span className=" form-error text-danger mb-2">
                This field is required
              </span>
            )}
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
              {isEdit ? "Save Changes" : "Add"}
            </button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
