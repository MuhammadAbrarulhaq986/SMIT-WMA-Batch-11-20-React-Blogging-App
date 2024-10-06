import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../config/firebase/firebasemethods";
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

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const userLogin = await loginUser({
        email: data.email,
        password: data.password,
      });
      console.log(userLogin);
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
      maxWidth={false}
      sx={{
        height: "50vh",
        padding: "200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {
          // adjust container for mobile size
          padding: "100px",
        },
      }}
    >
      <Card
        sx={{ p: 4, maxWidth: 900, minWidth: 500, justifyContent: "center" }}
      >
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
          <b>Login</b>
        </Typography>
        <form onSubmit={handleSubmit(handleLogin)}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            sx={{ mb: 4, alignItems: "center" }}
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
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-danger">This field is required</span>
          )}
          <br />
          <Button
            sx={{ background: "purple" }}
            variant="contained"
            type="submit"
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
          <Typography sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link
              sx={{
                color: "purple",
                fontWeight: "600",
                fontSize: "20px",
                textDecoration: "none",
              }}
              component="button"
              onClick={() => navigate("/register")}
            >
              Register
            </Link>
          </Typography>
        </form>
      </Card>
    </Container>
  );
};

export default Login;
