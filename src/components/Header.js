import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  header: {
    backgroundColor: "#282c34",
    minHeight: "10vh",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "3rem",
    color: "white",
    display: "flex"
  }
}));

const Header = props => {
  const classes = useStyles();
  return <header className={classes.header}>{props.title}</header>;
};

export default Header;
