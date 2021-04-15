import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Table from "../../../shared/tables/AttendanceTables";
import Search from "../../../shared/components/Search";
import axios from "../../../store/axios";
import moment from "moment";

const tableHeader = [
  { id: "userID", label: "Student ID" },
  { id: "name", label: "Name" },
  { id: "classID", label: "Class" },
  { id: "date", label: "Date" },
  { id: "startTime", label: "Start" },
  { id: "endTime", label: "End" },
];

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

function PastRecords({ open, setOpen, id }) {
  const [data, setdata] = useState([]);
  const [date, setdate] = useState(moment().format("YYYY-MM-DD"));
  const [storedata, setstoredata] = useState([]);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getData = async () => {
      let studentsData = await axios.get(`/students/class/${id}`);
      let todayData = await axios.get(`/attendance/students/${date}`);
      let AllData = studentsData.data.docs.map((e) => {
        let attendance = todayData.data.find((i) => i.userID === e.userID);
        return {
          ...e,
          startTime: attendance?.startTime,
          endTime: attendance?.endTime,
          date: date,
        };
      });
      setdata(AllData);
      setstoredata(AllData);
    };
    return getData();
  }, [date, id]);

  const inputFields = [
    {
      type: "date",
      label: "Search by Date",
      name: "date",
      value: date,
      onChange: setdate,
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    let d = e.target.value;
    setdate(d);
    let newArray = storedata;
    if (date) {
      newArray = storedata.filter((e) => e.date === date);
    }
    setdate(newArray);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setdata(storedata);
    setdate(moment().format("YYYY-MM-DD"));
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
              Students Attendances
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
        <Search
          handleReset={handleReset}
          handleSearch={handleSearch}
          inputFields={inputFields}
        />
        <Table rows={data} headCells={tableHeader} />
      </Dialog>
    </div>
  );
}

export default PastRecords;
