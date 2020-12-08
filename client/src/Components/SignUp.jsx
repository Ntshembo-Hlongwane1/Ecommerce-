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
      <Link color="inherit" to="/" className="Router__link">
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

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifiedPassword, setVerifiedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  const history = useHistory();

  const responseNotification = (statusCode, response) => {
    switch (statusCode) {
      case 201:
        store.addNotification({
          container: "top-center",
          insert: "top",
          message: response,
          title: "Account Creation Success",
          type: "success",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            showIcon: true,
          },
          onRemoval: () => {
            history.push("/user-signin");
          },
        });

        break;
      case 400:
        store.addNotification({
          container: "top-center",
          insert: "top",
          message: response,
          title: "Account Creation Failed",
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
          title: "Account Creation Failed",
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
  const SignUpUser = async (e) => {
    e.preventDefault();

    const url = "http://localhost:5000/api/user-signup";
    const production_url = "/api/user-signup";

    const form_data = new FormData();
    form_data.append("email", email);
    form_data.append("password", password);
    form_data.append("verifiedPassword", verifiedPassword);

    try {
      const response = await axios.post(production_url, form_data, {
        withCredentials: true,
      });
      const { data, status } = response;
      responseNotification(status, data.msg);
    } catch (error) {
      const { data, status } = error.response;
      responseNotification(status, data.msg);
    }
  };
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
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

          <div className="password__field">
            <TextField
              className="Material-TextField"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Confirm Password"
              type={`${showConfirmedPassword ? "text" : "password"}`}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setVerifiedPassword(e.target.value)}
            />
            {showConfirmedPassword ? (
              <VisibilityIcon
                onClick={() => setShowConfirmedPassword(!showConfirmedPassword)}
                className="passwordVisibilty__toggler"
              />
            ) : (
              <VisibilityOffIcon
                className="passwordVisibilty__toggler"
                onClick={() => setShowConfirmedPassword(!showConfirmedPassword)}
              />
            )}
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={SignUpUser}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/user-signin" variant="body2" className="Router__link">
                {"Have an account already? Sign Ip"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8} style={{ marginBottom: "10em" }}>
        <Copyright />
      </Box>
      <ReactNotifications className="Notification-Card" />
    </Container>
  );
}
