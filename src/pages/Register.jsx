import React, { useState } from "react";
import { signUpUser, uploadImage } from "../config/firebase/firebasemethods";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const Register = () => {
  const fullName = React.useRef();
  const email = React.useRef();
  const password = React.useRef();
  const profileImage = React.useRef();

  const [registrationStatus, setRegistrationStatus] = useState({
    success: false,
    message: "",
  });

  const handleRegister = async (event) => {
    event.preventDefault();
    console.log(email.current.value);
    console.log(password.current.value);
    console.log(fullName.current.value);
    console.log(profileImage.current.files[0]);

    const userProfileImageUrl = await uploadImage(
      profileImage.current.files[0],
      email.current.value
    );

    try {
      const userData = await signUpUser({
        email: email.current.value,
        password: password.current.value,
        fullName: fullName.current.value,
        profileImage: userProfileImageUrl,
      });
      console.log(userData);
      setRegistrationStatus({
        success: true,
        message: "Registration successful!",
      });
    } catch (error) {
      console.error(error);
      setRegistrationStatus({
        success: false,
        message: "Registration failed. Please try again.",
      });
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ p: 4, maxWidth: 400 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
          Register
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            inputRef={fullName}
          />
          <br />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            inputRef={email}
          />
          <br />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            sx={{ mb: 2 }}
            inputRef={password}
          />
          <br />
          <input
            type="file"
            placeholder="Enter your profile picture"
            ref={profileImage}
            style={{ width: "100%" }}
          />
          <br /> <br />
          <Button variant="contained" type="submit">
            Register
          </Button>
          {registrationStatus.success && (
            <Typography variant="body1" sx={{ color: "green", mt: 2 }}>
              {registrationStatus.message}
            </Typography>
          )}
          {!registrationStatus.success && registrationStatus.message && (
            <Typography variant="body1" sx={{ color: "red", mt: 2 }}>
              {registrationStatus.message}
            </Typography>
          )}
        </form>
      </Card>
    </Container>
  );
};

export default Register;
