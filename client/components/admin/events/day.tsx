/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import IndexAPI from "../../../apis/indexAPI";
import { Backdrop, Box, Fade, Modal, Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay, faPlus } from "@fortawesome/free-solid-svg-icons";
import AdminEvents from "./events";
import AdminCreateEvent from "./create";
import AdminUpdateEvent from "./updateEvent";

const AdminDay = (props: any) => {
  const [view, setView] = useState("events");
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [spots, setSpots] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const [editSelectedEvent, setEditSelectedEvent] = useState();

  const createEvent = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      // let formData = new FormData();

      // formData.append("title", title);
      // formData.append("date", props.date);
      // formData.append("price", price);
      // formData.append("spots", spots);
      // formData.append("info", info);

      // await IndexAPI.post("/admin/events", formData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // })
      //   .then((res) => console.log(res))
      //   .catch((err) => console.log(err));

      const selectedDate = props.date;

      await IndexAPI.post("/admin/events", {
        title,
        selectedDate,
        price,
        spots,
        info,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const editEvent = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      // await IndexAPI.put("/admin/events/id", {
      //   title,
      //   price,
      //   spots,
      //   info,
      // });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              border: "2px solid #fff",
              boxShadow: 24,
              width: "500px",
            }}
          >
            <Grid
              container
              sx={{
                flexDirection: "row",
                flexWrap: "nowrap",
                alignItems: "center",
                color: "#000",
                justifyContent: "flex-end",
                backgroundColor: "#000",
                padding: "30px",
                minHeight: "500px",
              }}
            >
              <Grid
                sx={{
                  width: "100%",
                  display: "grid",
                  alignSelf: "flex-start",
                }}
              >
                <h1>{props.date}</h1>
                <nav className="grid admin-day-nav">
                  <h1>
                    <FontAwesomeIcon
                      className="day-icon"
                      icon={faCalendarDay}
                      onClick={() => setView("events")}
                    />
                  </h1>
                  <h1>
                    <FontAwesomeIcon
                      className="day-icon"
                      icon={faPlus}
                      onClick={() => setView("create")}
                    />
                  </h1>
                </nav>
                <Grid>
                  {view === "events" ? (
                    <AdminEvents
                      dateEvents = {props.dateEvents}
                      displayDeleteModal={props.displayDeleteModal}
                      editEvent={editEvent}
                      setEditSelectedEvent={setEditSelectedEvent}
                      setView={setView}
                    />
                  ) : view === "create" ? (
                    <AdminCreateEvent
                      setTitle={setTitle}
                      setPrice={setPrice}
                      setSpots={setSpots}
                      setInfo={setInfo}
                      createEvent={createEvent}
                    />
                  ) : (
                    <AdminUpdateEvent editEvent={editSelectedEvent}/>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </Grid>
  );
};

export default AdminDay;
