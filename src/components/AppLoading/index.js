import React from "react";

// material-ui

import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

import useStyles from "./styles";

function AppLoading() {
  const classes = useStyles();

  return (
    <Container className={classes.loadingBlock} maxWidth="xs">
      <div className={classes.loadingBox}>
        <Typography variant="h6" component="h2" className={classes.title}>
          Chat App
        </Typography>
        <LinearProgress />
      </div>
    </Container>
  );
}

export default AppLoading;
