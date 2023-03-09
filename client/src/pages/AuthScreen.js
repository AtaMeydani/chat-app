import React, { useState, useRef } from "react";
import { Box, Stack, Typography, Button, TextField, Card, CircularProgress, Alert } from "@mui/material";

import { useMutation } from "@apollo/client";
import { SIGNUP_USER, SIGNIN_USER } from "../graphql/mutations";

const AuthScreen = ({ setLoggedIn }) => {
  const [formData, setFormData] = useState({});
  const [showLogin, setShowLogin] = useState(true);
  // it will not hold any reference
  const authForm = useRef();
  const [signupUser, { data: signUpData, loading: signUpLoading, error: signUpError }] = useMutation(SIGNUP_USER);

  const [signinUser, { data: signInData, loading: signInLoading, error: signInError }] = useMutation(SIGNIN_USER, {
    onCompleted(data) {
      localStorage.setItem("jwt", data.signInUser.token);
      setLoggedIn(true);
    },
  });

  if (signUpLoading || signInLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <Box textAlign="center">
          <CircularProgress />
          <Typography variant="h6">Authenticating</Typography>
        </Box>
      </Box>
    );
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showLogin) {
      signinUser({
        variables: {
          userSignIn: formData,
        },
      });
    } else {
      signupUser({
        variables: {
          userNew: formData,
        },
      });
    }
  };
  return (
    <Box ref={authForm} component="form" onSubmit={handleSubmit} display="flex" justifyContent="center" alignItems="center" height="80vh">
      <Card sx={{ padding: "10px" }} variant="outlined">
        <Stack direction="column" spacing={2} width="400px">
          {signUpData && <Alert severity="success">{signUpData.signUpUser.firstName} Signed Up</Alert>}
          {signUpError && <Alert severity="error">{signUpError.message}</Alert>}
          {signInError && <Alert severity="error">{signInError.message}</Alert>}
          <Typography variant="h5">Please {showLogin ? "Login" : "SignUp"}</Typography>
          {!showLogin && (
            <>
              <TextField
                name="firstName"
                label="First Name"
                variant="standard"
                //   onChange={(e) => handleChange(e)}
                onChange={handleChange}
                required
              />

              <TextField name="lastName" label="Last Name" variant="standard" onChange={handleChange} required />
            </>
          )}

          <TextField type="email" name="email" label="Email" variant="standard" onChange={handleChange} required />

          <TextField type="password" name="password" label="Password" variant="standard" onChange={handleChange} required />

          <Typography
            variant="subtitle1"
            textAlign="center"
            onClick={() => {
              setShowLogin(!showLogin);
              setFormData({});
              authForm.current.reset();
            }}
          >
            {showLogin ? "Signup?" : "Login?"}
          </Typography>
          <Button variant="outlined" type="submit">
            {showLogin ? "Login" : "SignUp"}
          </Button>
        </Stack>
      </Card>
    </Box>
  );
};

export default AuthScreen;
