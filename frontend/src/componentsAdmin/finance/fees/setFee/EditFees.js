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
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

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
  open,
  setOpen,
  fees,
  setfees,
  loading,
  handleEdit,
}) {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSetValue = (val, id) => {
    setfees(
      fees.map((e) =>
        e._id === id ? { _id: id, value: val, name: e.name } : e
      )
    );
  };

  const handleSetName = (val, id) => {
    setfees(
      fees.map((e) =>
        e._id === id ? { _id: id, name: val, value: e.value } : e
      )
    );
  };

  const handleAddFees = () => {
    let _id = Math.random().toString(16).slice(2);
    setfees([{ name: "", value: "", _id }, ...fees]);
  };

  const handleDeleteFees = (id) => {
    let newFees = fees.filter((i) => i._id !== id);
    setfees(newFees);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar color="transparent" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Edit School Fees
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
          {fees &&
            fees.map((e) => (
              <div className="row mb-4">
                <div className="col-sm-5">
                  <label className="form-label">Name</label>
                  <input
                    value={e?.name}
                    onChange={(i) => handleSetName(i.target.value, e?._id)}
                    type="text"
                    className="form-control"
                    name="name"
                  />
                </div>
                <div className="col-sm-5">
                  <label className="form-label">Value</label>
                  <input
                    value={e?.value}
                    onChange={(i) => handleSetValue(i.target.value, e?._id)}
                    type="number"
                    className="form-control"
                    name={`value${e?._id}`}
                  />
                </div>
                <div className="col-sm-2">
                  <IconButton onClick={() => handleDeleteFees(e._id)}>
                    <HighlightOffIcon></HighlightOffIcon>
                  </IconButton>
                </div>
              </div>
            ))}
          <div className="d-flex justify-content-end">
            <button type="button" onClick={handleAddFees} className="btn ">
              <AddCircleOutlineIcon></AddCircleOutlineIcon>
              Add Fees Element{" "}
            </button>
          </div>

          <div className="mb-3">
            <button
              onClick={handleEdit}
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
              Save Changes
            </button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
