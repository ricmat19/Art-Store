import { useState, useEffect } from "react";
import IndexAPI from "../../../apis/indexAPI";
import { Grid, Menu } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faChalkboardTeacher,
  faStoreAlt,
  faTv,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { INotification } from "../../../interfaces";

//Notifications props interface
interface INotifications {
  notificationOpen:
    | Element
    | ((element: Element) => Element)
    | null
    | undefined;
  openNotification: boolean;
  handleNotificationClose: () => void;
}

//Notifications functional component
const Notifications = (props: INotifications) => {
  //Notifications component states
  const [notifications, setNotifications] = useState([]);
  const [type, setType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let notificationsResponse;
        //If no notification product type is specified get all notifications, if a product type is specified get all products of that type
        if (type === "") {
          notificationsResponse = await IndexAPI.get(`/notifications`);
        } else {
          notificationsResponse = await IndexAPI.get(`/notifications/${type}`);
        }
        setNotifications(notificationsResponse.data.data.notifications);
        console.log(notificationsResponse.data.data.notifications);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [type]);

  //Notifications component
  return (
    // Display the Notifications menu
    <Menu
      anchorEl={props.notificationOpen}
      open={props.openNotification}
      onClose={props.handleNotificationClose}
      // onClick={props.handleNotificationClose}
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
        {/* Display the notifications navigation menu */}
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
            {/* Display all notifications */}
            <Grid xs={2} sx={{ cursor: "pointer", fontWeight: "900" }}>
              <Grid onClick={() => setType("")}>All</Grid>
            </Grid>
            {/* Display store notifications */}
            <Grid xs={2} sx={{ cursor: "pointer" }}>
              <FontAwesomeIcon
                icon={faStoreAlt}
                onClick={() => setType("products")}
              />
            </Grid>
            {/* Display course notifications */}
            <Grid xs={2} sx={{ cursor: "pointer" }}>
              <FontAwesomeIcon
                icon={faChalkboardTeacher}
                onClick={() => setType("courses")}
              />
            </Grid>
            {/* Display media notifications */}
            <Grid xs={2} sx={{ cursor: "pointer" }}>
              <FontAwesomeIcon icon={faTv} onClick={() => setType("media")} />
            </Grid>
            {/* Display event notifications */}
            <Grid xs={2} sx={{ cursor: "pointer" }}>
              <FontAwesomeIcon
                icon={faCalendarCheck}
                onClick={() => setType("events")}
              />
            </Grid>
          </Grid>
        </nav>
        <hr />
        <Grid>
          {/* Map through all notifications */}
          {notifications.map((notification: INotification, index: string) => {
            return (
              <a href="/products/print" key={index}>
                <Grid
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "40px 1fr",
                    padding: "10px",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "rgb(239, 239, 239)",
                      color: "black",
                    },
                  }}
                >
                  {/* Display the icon to the relevant notification type */}
                  <Grid sx={{ display: "grid", gap: "5px" }}>
                    {notification.type === "product" ? (
                      <Grid sx={{ display: "grid", justifyContent: "center" }}>
                        <FontAwesomeIcon icon={faStoreAlt} />
                      </Grid>
                    ) : notification.type === "event" ? (
                      <Grid sx={{ display: "grid", justifyContent: "center" }}>
                        <FontAwesomeIcon icon={faCalendarCheck} />
                      </Grid>
                    ) : notification.type === "course" ? (
                      <Grid sx={{ display: "grid", justifyContent: "center" }}>
                        <FontAwesomeIcon icon={faChalkboardTeacher} />
                      </Grid>
                    ) : (
                      <Grid sx={{ display: "grid", justifyContent: "center" }}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </Grid>
                    )}
                  </Grid>
                  {/* ? */}
                  <Grid sx={{ display: "grid" }}>
                    {notification !== undefined ? notification.title : ""}
                  </Grid>
                </Grid>
              </a>
            );
          })}
        </Grid>
      </Grid>
    </Menu>
  );
};

export default Notifications;
