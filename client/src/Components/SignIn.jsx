import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import ReactNotifications from "react-notifications-component";
import { store } from "react-notifications-component";
import "animate.css";
import "react-notifications-component/dist/theme.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="/">
        Hlongwane Botique
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const responseNotification = (statusCode, response) => {
    switch (statusCode) {
      case 200:
        store.addNotification({
          container: "top-center",
          insert: "top",
          message: response,
          title: "Login Success",
          type: "success",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            showIcon: true,
          },
          onRemoval: () => {
            history.push("/");
            window.location.reload(false);
          },
        });

        break;
      case 400:
        store.addNotification({
          container: "top-center",
          insert: "top",
          message: response,
          title: "Login Failed",
          type: "danger",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 10000,
            showIcon: true,
          },
        });
        break;
      case 404:
        store.addNotification({
          container: "top-center",
          insert: "top",
          message: response,
          title: "Login Failed",
          type: "danger",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 10000,
            showIcon: true,
          },
        });
        break;
      case 500:
        store.addNotification({
          container: "top-center",
          insert: "top",
          message: response,
          title: "Login Failed",
          type: "warning",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 10000,
            showIcon: true,
          },
        });
        break;
      default:
        break;
    }
  };

  const LoginUser = async (e) => {
    e.preventDefault();

    const baseURL = {
      dev: "http://localhost:5000/api/user-signin",
      prod: "/api/user-signin",
    };
    const url =
      process.env.NODE_ENV === "production" ? baseURL.prod : baseURL.dev;

    const form_data = new FormData();
    form_data.append("email", email);
    form_data.append("password", password);

    try {
      const response = await axios.post(url, form_data, {
        withCredentials: true,
      });

      const { status, data } = response;

      if (status === 201) {
        responseNotification(status, data.msg);
      } else {
        history.push("/");
      }
    } catch (error) {
      const { data, status } = error.response;
      responseNotification(status, data.msg);
    }
  };

  const classes = useStyles();
  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ backgroundColor: "white" }}
    >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="password__field">
            <TextField
              className="Material-TextField"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={`${showPassword ? "text" : "password"}`}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <VisibilityIcon
                onClick={() => setShowPassword(!showPassword)}
                className="passwordVisibilty__toggler"
              />
            ) : (
              <VisibilityOffIcon
                className="passwordVisibilty__toggler"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={LoginUser}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/user-signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <ReactNotifications className="Notification-Card" />
    </Container>
  );
}
