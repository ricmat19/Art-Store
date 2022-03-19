import React, { useState } from "react";
import IndexAPI from "../../../apis/indexAPI";
import { Grid, Menu } from "@mui/material";
// import { INotification } from "../../../interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faChalkboardTeacher,
  faStoreAlt,
  faTv,
} from "@fortawesome/free-solid-svg-icons";

const Notifications = (props: any) => {
  
  const [notifications, setNotifications] = useState([]);

  const displayAll = async () => {
    const notificationsResponse = await IndexAPI.get(`/notifications`);
    setNotifications(notificationsResponse.data.data.notifications);
  };

  const displayProducts = async () => {
    const notificationsResponse = await IndexAPI.get(`/notifications/products`);
    setNotifications(notificationsResponse.data.data.notifications);
  };

  const displayCourses = async () => {
    const notificationsResponse = await IndexAPI.get(`/notifications/courses`);
    setNotifications(notificationsResponse.data.data.notificationsd);
  };

  const displayMedia = async () => {
    const notificationsResponse = await IndexAPI.get(`/notifications/media`);
    setNotifications(notificationsResponse.data.data.notifications);
  };

  const displayEvents = async () => {
    const notificationsResponse = await IndexAPI.get(`/notifications/events`);
    setNotifications(notificationsResponse.data.data.notifications);
  };

  return (
    <Menu
      anchorEl={props.notificationOpen}
      open={props.openNotificaition}
      onClose={props.handleNotificationClose}
      onClick={props.handleNotificationClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <Grid className="notification-modal-container">
        <nav>
          <Grid
            container
            sx={{
              gap: 1,
              width: "400px",
              justifyContent: "center",
              textAlign: "center",
              paddingBottom: "5px",
            }}
          >
            <Grid xs={2} sx={{ cursor: "pointer", fontWeight: "900" }}>
              <Grid onClick={() => displayAll()}>All</Grid>
            </Grid>
            <Grid xs={2} sx={{ cursor: "pointer" }}>
              <FontAwesomeIcon icon={faStoreAlt} onClick={() => displayProducts()} />
            </Grid>
            <Grid xs={2} sx={{ cursor: "pointer" }}>
              <FontAwesomeIcon icon={faChalkboardTeacher} onClick={() => displayCourses()}/>
            </Grid>
            <Grid xs={2} sx={{ cursor: "pointer" }}>
              <FontAwesomeIcon icon={faTv} onClick={() => displayMedia()}/>
            </Grid>
            <Grid xs={2} sx={{ cursor: "pointer" }}>
              <FontAwesomeIcon icon={faCalendarCheck} onClick={() => displayEvents()}/>
            </Grid>
          </Grid>
        </nav>
        <hr />
        {notifications}
      </Grid>
    </Menu>
  );
};

export default Notifications;
