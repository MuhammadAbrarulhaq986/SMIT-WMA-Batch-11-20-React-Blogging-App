import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  auth,
  getData,
  sendData,
  deleteDocument,
} from "../config/firebase/firebasemethods";
import { onAuthStateChanged } from "firebase/auth";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  TextField,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Dashboard = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const [blogs, setBlogs] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (auth) {
      try {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            console.log(user.uid);
            const blogsData = await getData("blogs", user.uid);
            console.log(blogsData);
            setBlogs([...blogsData]);
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [auth]);

  const sendDatatoFirestore = async (data) => {
    try {
      if (auth.currentUser) {
        setSubmitting(true);
        await sendData(
          {
            title: data.title,
            description: data.description,
            uid: auth.currentUser.uid,
          },
          "blogs"
        ).then((response) => {
          const newBlog = {
            title: data.title,
            description: data.description,
            uid: auth.currentUser.uid,
          };
          setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
          console.log(response);
          setSubmitting(false);
          reset();
        });
      } else {
        setError("User   is not authenticated");
      }
    } catch (error) {
      setError(error.message);
      setSubmitting(false);
    }
  };

  const handleDeleteBlog = async (blog) => {
    try {
      if (blog.documentId) {
        await deleteDocument("blogs", blog.documentId);
        setBlogs(blogs.filter((item) => item.documentId !== blog.documentId));
      } else {
        console.error("Blog ID is missing");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} sx={{ mt: 5 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                textAlign: "center",
                fontWeight: "600",
                textShadow: "0px 0px 5px rgba(128, 0, 128, 0.8)",
              }}
            >
              Add New Blog
            </Typography>
            <form onSubmit={handleSubmit(sendDatatoFirestore)}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                {...register("title", { required: true })}
              />
              {errors.title && <span>This field is required</span>}
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={5}
                sx={{ mb: 2 }}
                {...register("description", { required: true })}
              />
              {errors.description && <span>This field is required</span>}
              {error && <span style={{ color: "red" }}>{error}</span>}
              <Button
                sx={{ background: "purple" }}
                variant="contained"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Add Blog"}
              </Button>
            </form>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              User Blogs
            </Typography>
            {blogs.length > 0 ? (
              blogs.map((item, index) => {
                return (
                  <Card key={index} sx={{ mb: 2 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image="https://picsum.photos/200/300" // Replace with actual image URL
                      alt={item.title}
                    />
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          src="https://picsum.photos/200/100" // Replace with actual author image URL
                          sx={{ width: 30, height: 30, marginRight: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          By {auth.currentUser.displayName} on{" "}
                          {new Date().toLocaleDateString()}
                        </Typography>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDeleteBlog(item)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <Typography variant="h6" sx={{ mb: 1 }}>
                No blogs found
              </Typography>
            )}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
