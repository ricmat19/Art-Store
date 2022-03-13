/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import IndexAPI from "../../../apis/indexAPI";
import { Backdrop, Box, Fade, Modal, Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faPencil,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

const AdminDay = (props: any) => {
  const [view, setView] = useState("events");
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [spots, setSpots] = useState<string>("");
  const [info, setInfo] = useState<string>("");

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
                      onClick={() => setView("create-event")}
                    />
                  </h1>
                </nav>
                <Grid>
                  {view === "events" ? (
                    <Grid container sx={{ width: "100%" }}>
                      <Grid xs={1}></Grid>
                      <Grid xs={5}>
                        <h3 className="align-left">Title</h3>
                      </Grid>
                      <Grid xs={3}>
                        <h3 className="align-left">Price</h3>
                      </Grid>
                      <Grid xs={2}>
                        <h3 className="align-left">Spots</h3>
                      </Grid>
                      <hr className="days-events-hr" />
                      <Grid sx={{ width: "100%" }}>
                        {props.dateEvents !== undefined ? (
                          props.dateEvents.map((event: any, index: number) => (
                            <Grid
                              key={index}
                              container
                              sx={{ gridTemplateColumns: "auto auto auto" }}
                            >
                              <Grid xs={1} sx={{ alignSelf: "center" }}>
                                <FontAwesomeIcon
                                  className="day-event-icon"
                                  icon={faTrashCan}
                                  onClick={() =>
                                    props.displayDeleteModal(event.id)
                                  }
                                />
                                {console.log(event.id)}
                              </Grid>
                              <Grid xs={5}>
                                <h4 className="align-left">{event.title}</h4>
                              </Grid>
                              <Grid xs={3}>
                                <h4 className="align-left">{event.price}</h4>
                              </Grid>
                              <Grid xs={2}>
                                <h4 className="align-left">{event.spots}</h4>
                              </Grid>
                              <Grid xs={1} sx={{ alignSelf: "center" }}>
                                <FontAwesomeIcon
                                  className="day-event-icon"
                                  icon={faPencil}
                                  onClick={editEvent}
                                />
                              </Grid>
                            </Grid>
                          ))
                        ) : (
                          <Grid></Grid>
                        )}
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid className="create-event">
                      <form>
                        <h1>New Event</h1>
                        <Grid className="admin-form-field">
                          <label className="event-form-label">Title</label>
                          <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            name="eventTitle"
                            className="form-control"
                            required
                          />
                        </Grid>
                        <Grid className="admin-form-field">
                          <label className="event-form-label">Price</label>
                          <input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            type="number"
                            name="eventPrice"
                            className="form-control"
                            required
                          />
                        </Grid>
                        <Grid className="admin-form-field">
                          <label className="event-form-label">Spots</label>
                          <input
                            value={spots}
                            onChange={(e) => setSpots(e.target.value)}
                            type="number"
                            name="eventSpots"
                            className="form-control"
                            required
                          />
                        </Grid>
                        <Grid className="admin-form-field">
                          <label className="event-form-label">Info</label>
                          <textarea
                            value={info}
                            onChange={(e) => setInfo(e.target.value)}
                            className="form-control"
                            required
                            rows={7}
                          />
                        </Grid>
                        <Grid className="align-center">
                          <button type="submit" onClick={(e) => createEvent(e)}>
                            Submit
                          </button>
                        </Grid>
                      </form>
                    </Grid>
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
