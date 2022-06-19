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
  const [product, setProduct] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let notificationsResponse;
        //If no notification product type is specified get all notifications, if a product type is specified get all products of that type
        if (product === "") {
          notificationsResponse = await IndexAPI.get(`/notifications`);
        } else {
          notificationsResponse = await IndexAPI.get(
            `/notifications/${product}`
          );
        }
        setNotifications(notificationsResponse.data.data.notifications);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [product]);

  //Notifications component
  return (
    // Display the Notifications menu
    <Menu
      anchorEl={props.notificationOpen}
      open={props.openNotification}
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
              <Grid onClick={() => setProduct("")}>All</Grid>
            </Grid>
            {/* Display store notifications */}
            <Grid xs={2} sx={{ cursor: "pointer" }}>
              <FontAwesomeIcon
                icon={faStoreAlt}
                onClick={() => setProduct("products")}
              />
            </Grid>
            {/* Display course notifications */}
            <Grid xs={2} sx={{ cursor: "pointer" }}>
              <FontAwesomeIcon
                icon={faChalkboardTeacher}
                onClick={() => setProduct("courses")}
              />
            </Grid>
            {/* Display media notifications */}
            <Grid xs={2} sx={{ cursor: "pointer" }}>
              <FontAwesomeIcon
                icon={faTv}
                onClick={() => setProduct("media")}
              />
            </Grid>
            {/* Display event notifications */}
            <Grid xs={2} sx={{ cursor: "pointer" }}>
              <FontAwesomeIcon
                icon={faCalendarCheck}
                onClick={() => setProduct("events")}
              />
            </Grid>
          </Grid>
        </nav>
        <hr />
        <Grid>
          {/* Map through all notifications */}
          {notifications.map((notification: INotification) => {
            return (
              <Grid
                key={notification.id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "30px 1fr",
                  padding: "10px",
                }}
              >
                {/* Display the icon to the relevant notification type */}
                <Grid sx={{ display: "grid", gap: "5px" }}>
                  {notification.type === "product" ? (
                    <Grid>
                      <FontAwesomeIcon icon={faStoreAlt} />
                    </Grid>
                  ) : notification.type === "event" ? (
                    <Grid>
                      <FontAwesomeIcon icon={faCalendarCheck} />
                    </Grid>
                  ) : notification.type === "course" ? (
                    <Grid>
                      <FontAwesomeIcon icon={faChalkboardTeacher} />
                    </Grid>
                  ) : (
                    <Grid>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Grid>
                  )}
                </Grid>
                {/* ? */}
                <Grid>
                  {notification !== undefined ? notification.title : ""}
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Menu>
  );
};

export default Notifications;
