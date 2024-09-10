import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Candidate Database
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/admin">
          Admin
        </Button>
        <Button color="inherit" component={Link} to="/recruiter">
          Recruiter
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
