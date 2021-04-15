import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Form from "./CourseForm";

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
  name,
  nameTitle,
  setname,
  code,
  setcode,
  setclassesArr,
  classesArr,
  teacher,
  onSubmit,
  department,
  setdepartment,
  loading,
  handleEditClass,
  setteacher,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

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
              Edit Course {nameTitle}
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
        <div className="m-5 col-md-8">
          <Form
            name={name}
            setname={setname}
            teacher={teacher}
            setteacher={setteacher}
            code={code}
            setcode={setcode}
            loading={loading}
            setclassesArr={setclassesArr}
            onSubmit={onSubmit}
            classesArr={classesArr}
            isEdit={true}
            department={department}
            setdepartment={setdepartment}
          />
        </div>
      </Dialog>
    </div>
  );
}
