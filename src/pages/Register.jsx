import React, { useState } from "react";
import { signUpUser, uploadImage } from "../config/firebase/firebasemethods";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  CircularProgress,
  styled,
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

  const [loading, setLoading] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const FileInput = styled("input")({
    display: "none",
  });

  const FileInputLabel = styled(Button)({
    backgroundColor: "purple",
    color: "white",
    "&:hover": {
      backgroundColor: "purple",
    },
  });

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
          <Button
            component="label"
            sx={{
              backgroundColor: "purple",
              color: "white",
              "&:hover": { backgroundColor: "purple" },
            }}
          >
            Choose File
            <input
              type="file"
              placeholder="Enter your profile picture"
              ref={profileImage}
              style={{ display: "none" }}
            />
          </Button>
          <br /> <br />
          <Button
            variant="contained"
            type="submit"
            sx={{ backgroundColor: "purple", color: "white" }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Register"
            )}
          </Button>
          <Typography sx={{ mt: 2 }}>
            Already have an account?
            <Link
              href="/login"
              sx={{
                color: "purple",
                fontWeight: "600",
                fontSize: "20px",
                textDecoration: "none",
              }}
            >
              Login
            </Link>
          </Typography>
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
