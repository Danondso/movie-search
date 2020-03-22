import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";

import Backdrop from "@material-ui/core/Backdrop";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
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
    <Dialog
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      modal={true}
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
                  <Grid item xs={12}>
                    <h2>{movieDetail.Title}</h2>
                    <p>
                      <strong>Country: </strong>
                      <p>{movieDetail.Country}</p>
                    </p>
                    <p>
                      <strong>Language: </strong> <p>{movieDetail.Language}</p>
                    </p>
                    <p>
                      <strong>Year: </strong> <p>{movieDetail.Year}</p>
                    </p>
                    <p>
                      <strong>Genre: </strong> <p>{movieDetail.Genre}</p>
                    </p>
                    <p>
                      <strong>Director: </strong> {movieDetail.Director}
                    </p>
                    <p>
                      <strong>Plot: </strong>
                      <p>{movieDetail.Plot}</p>
                    </p>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <div>No details found</div>
          )}
        </div>
      </Fade>
    </Dialog>
  );
};

export default MovieModal;
