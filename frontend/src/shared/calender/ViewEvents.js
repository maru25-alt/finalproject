import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import moment from "moment";

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
  events,
  handleDelete,
}) {
  const classes = useStyles();

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
              Change Prefect Position for
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
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th colSpan={3} scope="col ">
                  Description
                </th>
                <th scope="col">Type</th>
                <th scope="col">Date</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
              {events.length ? (
                events.map((event) => (
                  <tr key={event._id}>
                    <th>{event?.title}</th>
                    <td colSpan={3}>{event?.description}</td>
                    <td>{event?.resource}</td>
                    <td>{moment(event?.day).format("DD MMMM YYYY")}</td>
                    <td>
                      <IconButton
                        onClick={() => handleDelete(event?._id)}
                        className="btn"
                      >
                        <HighlightOffIcon />
                      </IconButton>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <th>No Events Yet</th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Dialog>
    </div>
  );
}
