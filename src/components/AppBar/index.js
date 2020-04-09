import React, { useState } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import useStyles from "./styles";
import { useHistory } from "react-router-dom";
import { auth } from "../FirebaseProvider";

function AppHeader({ toolbarContent }) {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    if (window.confirm("Apakah anda yakin ingin keluar dari aplikasi?"))
      auth.signOut();
  };
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        {toolbarContent ? (
          toolbarContent
        ) : (
          <Typography variant="h6">Chat App</Typography>
        )}
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          classes={{ root: classes.menuBtn }}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              history.push("/pengaturan");
            }}
          >
            Profile
          </MenuItem>

          <MenuItem onClick={handleSignOut}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
