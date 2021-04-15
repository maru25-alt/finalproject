import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

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
  selected,
  handleEdit,
  handleDelete,
  setselected,
}) {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
    if (setselected) {
      setselected({});
    }
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
              {selected?.title}
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
        <div className="m-5">
          <div className="d-flex justify-content-between w-50">
            <div>
              <strong>Total Score: {selected?.score}</strong>
            </div>
            <div>
              <strong>
                <small>Due Date: {selected?.score}</small>
              </strong>
            </div>
          </div>
          <p className="my-5">{selected?.description}</p>

          <div className="d-flex justify-content-end my-5">
            <button
              onClick={() => handleEdit(selected._id)}
              className="btn btn-dark mx-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(selected._id)}
              className="btn btn-danger mx-2"
            >
              Delete
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
