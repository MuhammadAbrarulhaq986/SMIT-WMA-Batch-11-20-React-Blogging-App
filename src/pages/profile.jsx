import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, init } from "../config/firebase/firebasemethods";
import {
  Box,
  Typography,
  Avatar,
  Stack,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";

const Profile = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      await init();
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  return (
    <Box
      sx={{
        padding: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Profile
      </Typography>
      <Avatar
        src={user.photoURL}
        alt="Profile Picture"
        sx={{ width: 100, height: 100, marginBottom: 2 }}
      />
      <Stack direction="column" spacing={1}>
        <Typography variant="h6">Email: {user.email}</Typography>
        <Typography variant="h6">Username: {user.displayName}</Typography>
      </Stack>
      <ImageList sx={{ width: 500, height: 450 }}>
        <ImageListItem key={user.email}>
          <img src={user.photoURL} alt={user.displayName} />
          <ImageListItemBar
            title={user.displayName}
            subtitle={user.email}
            actionIcon={<Avatar alt={user.displayName} src={user.photoURL} />}
          />
        </ImageListItem>
      </ImageList>
    </Box>
  );
};

export default Profile;
