import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";

import Backdrop from "@material-ui/core/Backdrop";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  "modal-poster": {
    maxWidth: "100%",
    height: "auto",
    padding: "1rem"
  }
}));

const MovieModal = ({ movieDetail, open, handleClose }) => {
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      className={classes.modal}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
      justify="center"
    >
      <Fade in={open}>
        <div className={classes.paper}>
          {movieDetail ? (
            <Grid container spacing={1}>
              <Grid item xs={4}>
                {movieDetail.Poster === "N/A" ? (
                  <p>Image not available</p>
                ) : (
                  <img
                    className={classes["modal-poster"]}
                    alt={movieDetail.Title}
                    src={movieDetail.Poster}
                  ></img>
                )}
              </Grid>
              <Grid item xs={8} sm={8} lg={6} container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs={12} sm={12} lg={6}>
                    <h2>{movieDetail.Title}</h2>
                    <p><strong>Country: </strong>{movieDetail.Country}</p>
                    <p><strong>Language: </strong> {movieDetail.Language}</p>
                    <p><strong>Year: </strong> {movieDetail.Year}</p>
                    <p><strong>Genre: </strong> {movieDetail.Genre}</p>
                    <p><strong>Director: </strong> {movieDetail.Director}</p>
                    <Grid item xs={12} sm={12} lg={6} container>
                      {movieDetail.Plot}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <div>No details found</div>
          )}
        </div>
      </Fade>
    </Modal>
  );
};

export default MovieModal;
