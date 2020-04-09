import React, { useState } from "react";

import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import BackIcon from "@material-ui/icons/ArrowBack";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import PersonIcon from "@material-ui/icons/Person";
import EditIcon from "@material-ui/icons/Edit";
import InfoIcon from "@material-ui/icons/Info";
import EmailIcon from "@material-ui/icons/Email";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Container from "@material-ui/core/Container";

import useStyles from "./styles/";

import AppHeader from "../../../components/AppBar";

import { useData } from "../../../components/DataProvider";
import { useFirebase } from "../../../components/FirebaseProvider";

import { useHistory } from "react-router-dom";

import UploadAvatar from "./avatar";
import EditDialog from "./edit";

export default function Pengaturan() {
  const history = useHistory();
  const { profile } = useData();
  const classes = useStyles();
  const { user } = useFirebase();
  const [editDialog, setEditDialog] = useState({
    open: false,
    fieldMode: "Nama"
  });
  return (
    <>
      <AppHeader
        toolbarContent={
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="back to home"
              onClick={() => {
                history.push("/chat");
              }}
            >
              <BackIcon />
            </IconButton>
            <Typography variant="h6">Pengaturan</Typography>
          </>
        }
      />
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <UploadAvatar />
          </Grid>
          <Grid item xs={12}>
            <List className={classes.List}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <PersonIcon />
                </ListItemAvatar>
                <ListItemText primary="Nama" secondary={profile.nama} />
                <ListItemSecondaryAction>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setEditDialog({
                        open: true,
                        fieldMode: "Nama"
                      });
                    }}
                    edge="end"
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <InfoIcon />
                </ListItemAvatar>
                <ListItemText
                  primary="Deskripsi"
                  secondary={profile.deskripsi || "Belum ada deskripsi"}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setEditDialog({
                        open: true,
                        fieldMode: "Deskripsi"
                      });
                    }}
                    edge="end"
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <EmailIcon />
                </ListItemAvatar>
                <ListItemText primary="Email" secondary={user.email} />
                <ListItemSecondaryAction>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setEditDialog({
                        open: true,
                        fieldMode: "Email"
                      });
                    }}
                    edge="end"
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <VpnKeyIcon />
                </ListItemAvatar>
                <ListItemText primary="Password" secondary="******" />
                <ListItemSecondaryAction>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setEditDialog({
                        open: true,
                        fieldMode: "Password"
                      });
                    }}
                    edge="end"
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          </Grid>
        </Grid>
      </Container>
      <EditDialog
        {...editDialog}
        handleClose={() => {
          setEditDialog(editDialog => ({ ...editDialog, open: false }));
        }}
      />
    </>
  );
}
