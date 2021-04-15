import React from "react";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FilterListIcon from "@material-ui/icons/FilterList";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
//import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import PersonIcon from "@material-ui/icons/Person";
import { Link } from "react-router-dom";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const {
    numSelected,
    selected,
    handleDelete,
    handleDeleteAll,
    routes,
    handleWithdraw,
  } = props;

  console.log(selected);

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        ></Typography>
      )}

      {numSelected > 0 ? (
        <>
          {" "}
          {numSelected === 1 ? (
            <>
              <Tooltip title="View">
                <Link
                  className="btn"
                  to={`${routes}/profile/${selected[0]}`}
                  aria-label="view"
                >
                  <PersonIcon />
                </Link>
              </Tooltip>

              <Tooltip title="Edit">
                <Link
                  className="btn"
                  to={`${routes}/edit/${selected[0]}`}
                  aria-label="edit"
                >
                  <EditIcon />
                </Link>
              </Tooltip>
              <Tooltip title="Withdraw">
                <IconButton
                  onClick={() => handleWithdraw(selected[0])}
                  aria-label="withdraw"
                >
                  <RemoveCircleIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  onClick={() => handleDelete(selected[0])}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <Tooltip title="Delete">
              <IconButton onClick={() => handleDeleteAll} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default EnhancedTableToolbar;
