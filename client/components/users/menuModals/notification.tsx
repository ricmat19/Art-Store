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

interface INotifications {
  notificationOpen:
    | Element
    | ((element: Element) => Element)
    | null
    | undefined;
  openNotificaition: boolean;
  handleNotificationClose:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
}

const Notifications = (props: INotifications) => {
  const [notifications, setNotifications] = useState([]);
  const [product, setProduct] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let notificationsResponse;
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
              <Grid onClick={() => setProduct("")}>All</Grid>
            </Grid>
            <Grid xs={2} sx={{ cursor: "pointer" }}>
              <FontAwesomeIcon
                icon={faStoreAlt}
                onClick={() => setProduct("products")}
              />
            </Grid>
            <Grid xs={2} sx={{ cursor: "pointer" }}>
              <FontAwesomeIcon
                icon={faChalkboardTeacher}
                onClick={() => setProduct("courses")}
              />
            </Grid>
            <Grid xs={2} sx={{ cursor: "pointer" }}>
              <FontAwesomeIcon
                icon={faTv}
                onClick={() => setProduct("media")}
              />
            </Grid>
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
          {notifications.map((notification: any) => {
            return (
              <Grid
                key={notification.id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "30px 1fr",
                  padding: "10px",
                }}
              >
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
