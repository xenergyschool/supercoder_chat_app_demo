import React, { useState } from "react";

// import komponen material-ui
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

// import styles
import useStyles from "./styles";

// react router dom
import { Link, Redirect } from "react-router-dom";

// import logo
import logo from "../../images/logo.png";

import isEmail from "validator/lib/isEmail";

import { auth, useFirebase } from "../../components/FirebaseProvider";

function Login(props) {
  const classes = useStyles();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState({});

  const [isSubmitting, setSubmitting] = useState(false);

  const { user } = useFirebase();

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.email) {
      newErrors.email = "Email wajib diisi";
    } else if (!isEmail(form.email)) {
      newErrors.email = "Email tidak valid";
    }

    if (!form.password) {
      newErrors.password = "Password wajib diisi";
    }

    return newErrors;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const findErrors = validate();

    if (Object.values(findErrors).some(message => message !== "")) {
      setError(findErrors);
    } else {
      setSubmitting(true);
      try {
        await auth.signInWithEmailAndPassword(form.email, form.password);
      } catch (e) {
        let newError = {};

        switch (e.code) {
          case "auth/user-not-found":
            newError.email = "Email tidak terdaftar";
            break;
          case "auth/invalid-email":
            newError.email = "Email tidak valid";
            break;
          case "auth/wrong-password":
            newError.password = "Password salah";
            break;
          case "auth/user-disabled":
            newError.email = "Pengguna di blokir";
            break;
          default:
            newError.email = "Terjadi kesalahan silahkan coba lagi";
            break;
        }

        setError(newError);
      }
      setSubmitting(false);
    }
  };

  if (user) {
    return <Redirect to="/chat" />;
  }

  return (
    <div className={classes.loginBlock}>
      <div className={classes.loginBox}>
        <div className={classes.logoBox}>
          <img src={logo} alt="logo" />
        </div>
        <Container maxWidth="xs">
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h1" className={classes.title}>
              Login
            </Typography>

            <form onSubmit={handleSubmit} noValidate>
              <TextField
                id="email"
                type="email"
                name="email"
                margin="normal"
                label="Alamat Email"
                fullWidth
                required
                variant="outlined"
                value={form.email}
                onChange={handleChange}
                error={error.email ? true : false}
                helperText={error.email}
                disabled={isSubmitting}
              />
              <TextField
                id="password"
                type="password"
                name="password"
                margin="normal"
                label="Password"
                fullWidth
                required
                variant="outlined"
                value={form.password}
                onChange={handleChange}
                error={error.password ? true : false}
                helperText={error.password}
                disabled={isSubmitting}
              />

              <Grid container className={classes.buttons}>
                <Grid item xs>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    size="large"
                  >
                    Login
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    component={Link}
                    variant="contained"
                    size="large"
                    to="/registrasi"
                  >
                    Daftar
                  </Button>
                </Grid>
              </Grid>
              <div className={classes.forgotPassword}>
                <Typography
                  className={classes.lupaLink}
                  component={Link}
                  to="/lupa-password"
                >
                  Lupa Password?
                </Typography>
              </div>
            </form>
          </Paper>
        </Container>
      </div>
    </div>
  );
}

export default Login;
