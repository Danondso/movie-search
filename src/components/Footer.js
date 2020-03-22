import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  footer: {
    marginTop: "73.2vh",
    backgroundColor: "#282c34",
    display: "flex",
    minHeight: "10vh",
    flexDirection: "column",
    color: "white"
  },
  footerTextContainer: {
    marginTop: "4vh"
  }
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.footerTextContainer}>
        <span>Created by </span>
        <a
          href="https://github.com/Danondso/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Dublin Anondson
        </a>
      </div>
    </footer>
  );
};

export default Footer;
