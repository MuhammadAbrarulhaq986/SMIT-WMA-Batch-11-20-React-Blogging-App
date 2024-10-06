import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";
import {
  signOutUser,
  getCurrentUser,
  init,
} from "../config/firebase/firebasemethods";
import Stack from "@mui/material/Stack";

const Navbar = () => {
  const navigate = useNavigate();
  const [isUser, setIsUser] = React.useState(false); // Initialize isUser     to false
  const [user, setUser] = React.useState({}); // Add this line
  const [isActive, setIsActive] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  // Check if user is logged in when component mounts
  React.useEffect(() => {
    const checkUser = async () => {
      await init();
      const user = await getCurrentUser();
      if (user) {
        setIsUser(true);
        setUser(user); // Add this line
      }
    };
    checkUser();
  }, []);

  const logoutUser = async () => {
    const user = await signOutUser();
    setIsUser(false);
    console.log(user);
    navigate("/login");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navbarItems = [
    { label: "Dashboard", link: "/dashboard" },
    { label: "Profile", link: "/profile" },
    { label: "Home", link: "/" },
  ];

  const authItems = isUser
    ? [
        {
          label: (
            <Stack direction="row" spacing={1}>
              <Avatar src={user.photoURL} alt={user.displayName} />
              <Typography variant="h6">{user.displayName}</Typography>
              <Button
                key="logout"
                onClick={logoutUser}
                sx={{
                  my: 2,
                  display: "block",
                  color: "purple",
                  fontWeight: "600",
                }}
              >
                Logout
              </Button>
            </Stack>
          ),
        },
      ]
    : [
        { label: "Login", link: "/login", onClick: () => navigate("/login") },
        {
          label: "Register",
          link: "/register",
          onClick: () => navigate("/register"),
        },
      ];

  // Update isUser     state when user logs in
  React.useEffect(() => {
    const checkUser = async () => {
      await init();
      const user = await getCurrentUser();
      if (user) {
        setIsUser(true);
        setUser(user);
      } else {
        setIsUser(false);
      }
    };
    checkUser();
  }, [navigate]);

  return (
    <AppBar position="static" sx={{ backgroundColor: "purple" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
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
            }}
          >
            <b>Bolg</b>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
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
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {navbarItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="navbar-item"
                  sx={{
                    textDecoration: "none",
                    color: " purple",
                  }}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      <b>{item.label}</b>
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
              {authItems.map((item, index) => (
                <MenuItem
                  key={index}
                  onClick={item.onClick ? item.onClick : handleCloseNavMenu}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    <b>{item.label}</b>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navbarItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="navbar-item"
                sx={{
                  textDecoration: "none",
                  color: "purple",
                }}
              >
                <Button
                  key={item.label}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: "block", color: "purple" }}
                >
                  <b>{item.label}</b>
                </Button>
              </Link>
            ))}
            {authItems.map((item, index) => (
              <Button
                key={index}
                onClick={item.onClick ? item.onClick : handleCloseNavMenu}
                sx={{ my: 2, display: "block", color: "purple" }}
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
