import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FlightIcon from "@mui/icons-material/Flight";
import { NavLink } from "react-router-dom";
import "./Header.scss";

const drawerWidth = 240;

const navItems = [
  <NavLink to="/" className="navItems">
    Home
  </NavLink>,
  <NavLink to="/register" className="navItems">
    Register
  </NavLink>,
  <NavLink to="/login" className="navItems">
    Login
  </NavLink>,
];

function Header({isLogin, handleLogout, ...props}) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);


  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        WanderHub
      </Typography>

      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              selected
              sx={{
                textAlign: "center",
              }}
            >
              <ListItemText>{item}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <FlightIcon sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <NavLink to="/" className="navItems">
              WanderHub
            </NavLink>
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {isLogin ? (
              <Button
                sx={{
                  color: "#fff",
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              navItems.map((item, index) => (
                <Button
                  key={index}
                  sx={{
                    color: "#fff",
                  }}
                >
                  {item}
                </Button>
              ))
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default Header;
