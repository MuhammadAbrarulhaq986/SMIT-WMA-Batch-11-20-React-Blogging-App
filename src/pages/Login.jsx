import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const theme = useTheme();
  const auth = getAuth();

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      console.log(user);
      navigate("/", { replace: true }); // Navigate to home page
    } catch (error) {
      console.error(error);
      // Display an error message to the user
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth={600}
      minWidth={300}
      sx={{
        height: "50vh",
        padding: "200px",
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {
          // adjust container for mobile size
          padding: "100px",
        },
      }}
    >
      <Card
        sx={{
          p: 4,
          maxWidth: 600,
          minWidth: 300,
          justifyContent: "center",
          boxShadow: "0px 0px 10px 2px rgba(128, 0, 128, 0.5)", // purple color box shadow
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            fontSize: "30px",
            fontWeight: "bold",
            // textShadow: "1px 5px 10px purple", // add this line
            textAlign: "center",
          }}
        >
          <b>Login</b>
        </Typography>
        <form onSubmit={handleSubmit(handleLogin)}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            sx={{ mb: 4, alignItems: "center" }}
            size="small"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-danger">This field is required</span>
          )}
          <br />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            sx={{ mb: 2 }}
            size="small"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-danger">This field is required</span>
          )}
          <br />
          <Button
            sx={{
              background: "purple",
              boxShadow: "0px 0px 10px 2px rgba(128, 0, 128, 0.5)", // purple color box shadow
            }}
            variant="contained"
            type="submit"
            size="small"
          >
            {loading ? (
              <CircularProgress size={30} sx={{ color: "white" }} />
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default Login;
