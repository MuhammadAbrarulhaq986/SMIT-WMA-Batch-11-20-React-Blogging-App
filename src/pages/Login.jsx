import React from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../config/firebase/firebasemethods";
import { useNavigate } from "react-router-dom";
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

const Login = () => {
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

  const handleLogin = async (data) => {
    try {
      const userLogin = await loginUser({
        email: data.email,
        password: data.password,
      });
      console.log(userLogin);
      navigate("/home", { replace: true }); // Navigate to home page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        height: "50vh",
        // width: "600px",
        padding: "200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
          <Button variant="contained" type="submit">
            Login
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default Login;
