import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core/styles";
import Chat from "./chat/Chat";
import Files from "./files/Files";
import ClassWork from "./classwork/ClassWork";
import Tasks from "./tasks/Tasks";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function CourseContainer() {
  const { id, classID } = useParams();
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const user = useSelector(selectUser);

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="course__details">
      <Paper square>
        <Tabs
          value={value}
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Tasks" />
          <Tab label="Chat" />
          <Tab label="Files" />
          <Tab label="Class Work" />
        </Tabs>
      </Paper>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Tasks courseID={id} classID={classID} user={user} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Chat courseID={id} classID={classID} user={user} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Files courseID={id} classID={classID} user={user} />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <ClassWork courseID={id} classID={classID} user={user} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

export default CourseContainer;
