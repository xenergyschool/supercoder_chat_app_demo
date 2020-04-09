import React from "react";

import Button from "@material-ui/core/Button";
import { Link, Redirect } from "react-router-dom";
import { useFirebase } from "../../components/FirebaseProvider";

// import styles
import useStyles from "./styles";

// import logo
import logo from "../../images/logo.png";

export default function Landing() {
  const { user } = useFirebase();
  const classes = useStyles();

  if (user) {
    return <Redirect to="/chat" />;
  }

  return (
    <div className={classes.landingBlock}>
      <div className={classes.landingBox}>
        <div className={classes.logoBox}>
          <img src={logo} alt="logo" />
        </div>
        <div className={classes.btnBox}>
          <Button
            className={classes.btnDaftar}
            variant="contained"
            component={Link}
            to="/registrasi"
          >
            Daftar
          </Button>
          <Button className={classes.btnLogin} component={Link} to="/login">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
