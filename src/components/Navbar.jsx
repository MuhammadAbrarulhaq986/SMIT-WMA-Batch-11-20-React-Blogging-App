import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import {
  signOutUser,
  getCurrentUser,
  init,
} from "../config/firebase/firebasemethods";
import { useMemo, useState, useEffect } from "react";

// Define the Navbar component
const Navbar = () => {
  // Initialize the navigate hook to navigate between routes
  const navigate = useNavigate();

  // Initialize the state to track if the user is logged in
  const [isUser, setIsUser] = React.useState(false);

  // Initialize the state to store the user data
  const [user, setUser] = React.useState({});

  // Initialize the state to store the anchor element for the menu
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  // Initialize the state to store the authentication items
  const [authItems, setAuthItems] = React.useState([]);

  // Check if the user is logged in when the component mounts
  React.useEffect(() => {
    const checkUser = async () => {
      // Initialize the Firebase app
      await init();

      // Get the current user
      const user = await getCurrentUser();

      // If the user is logged in, update the state
      if (user) {
        setIsUser(true);
        setUser(user);
      }
    };
    checkUser();
  }, []);

  // Define the function to handle logout
  const logoutUser = async () => {
    try {
      // Sign out the user
      await signOutUser();

      // Update the state to indicate that the user is not logged in
      setIsUser(false);

      // Navigate to the login page
      navigate("/login");
    } catch (error) {
      console.error("Error signing out user:", error);
    }
  };

  // Define the function to handle opening the navigation menu
  const handleOpenNavMenu = (event) => {
    // Set the anchor element for the menu
    setAnchorElNav(event.currentTarget);
  };

  // Define the function to handle closing the navigation menu
  const handleCloseNavMenu = () => {
    // Reset the anchor element for the menu
    setAnchorElNav(null);
  };

  // Define the navigation items
  const navbarItems = [
    { label: "Dashboard", link: "/dashboard" },
    { label: "Profile", link: "/profile" },
    { label: "Home", link: "/" },
  ];

  // Update the authItems state when the isUser   state changes
  useEffect(() => {
    const authItems = [];
    if (isUser) {
      authItems.push({ label: "Logout", onClick: logoutUser });
    } else {
      authItems.push(
        { label: "Login", link: "/login", onClick: () => navigate("/login") },
        {
          label: "Register",
          link: "/register",
          onClick: () => navigate("/register"),
        }
      );
    }
    setAuthItems(authItems);
  }, [isUser, navigate]);

  // Update the isUser   state when the user logs in
  useEffect(() => {
    const checkUser = async () => {
      // Initialize the Firebase app
      await init();

      // Get the current user
      const user = await getCurrentUser();

      // If the user is logged in, update the state
      if (user) {
        setIsUser(true);
        setUser(user);
      } else {
        setIsUser(false);
      }
    };
    checkUser();
  }, [navigate]);

  // Return the JSX for the Navbar component
  return (
    <AppBar position="static" sx={{ backgroundColor: "purple" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "block", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
              fontSize: "1.2rem",
            }}
          >
            <b>Bolg</b>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: " none" } }}>
            <IconButton
              size=" large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {navbarItems.map((item, index) => (
                <MenuItem
                  key={index}
                  onClick={item.onClick ? item.onClick : handleCloseNavMenu}
                >
                  <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
                    {item.label}
                  </Typography>
                </MenuItem>
              ))}
              {authItems.map((item, index) => (
                <MenuItem
                  key={index}
                  onClick={item.onClick ? item.onClick : handleCloseNavMenu}
                >
                  <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
                    {item.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            <b>Bolg</b>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navbarItems.map((item, index) => (
              <Button
                key={index}
                onClick={
                  item.onClick ? item.onClick : () => navigate(item.link)
                }
                sx={{
                  my: 2,
                  display: "block",
                  color: "white",
                  fontWeight: "600",
                }}
              >
                {item.label}
              </Button>
            ))}
            {authItems.map((item, index) => (
              <Button
                key={index}
                onClick={
                  item.onClick ? item.onClick : () => navigate(item.link)
                }
                sx={{
                  my: 2,
                  display: "block",
                  color: "white",
                  fontWeight: "600",
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
