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
import { Link } from "react-router-dom";

// import logo
import logo from "../../images/logo.png";

import isEmail from "validator/lib/isEmail";

import { auth } from "../../components/FirebaseProvider";

import { useSnackbar } from "notistack";
function LupaPassword() {
  const classes = useStyles();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState({});

  const [isSubmitting, setSubmitting] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
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
        const actionCodeSettings = {
          url: `${window.location.origin}/login`
        };

        await auth.sendPasswordResetEmail(form.email, actionCodeSettings);

        enqueueSnackbar(
          `Cek kotak masuk email: ${
            form.email
          }, sebuah tautan untuk me-reset password telah dikirim `,
          {
            variant: "success"
          }
        );
      } catch (e) {
        let newError = {};

        console.log(e.message);

        switch (e.code) {
          case "auth/user-not-found":
            newError.email = "Email tidak terdaftar";
            break;
          case "auth/invalid-email":
            newError.email = "Email tidak valid";
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

  return (
    <div className={classes.forpassBlock}>
      <div className={classes.forpassBox}>
        <div className={classes.logoBox}>
          <img src={logo} alt="logo" />
        </div>
        <Container maxWidth="xs">
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h1" className={classes.title}>
              Lupa Password
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
              <Grid container className={classes.buttons}>
                <Grid item xs>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    size="large"
                  >
                    Kirim
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    component={Link}
                    variant="contained"
                    size="large"
                    to="/login"
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </div>
    </div>
  );
}

export default LupaPassword;
