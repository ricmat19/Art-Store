/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Backdrop, Box, Fade, Modal, Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay, faPlus } from "@fortawesome/free-solid-svg-icons";

const AdminDay = (props: any) => {
  const [view] = useState("calendar");
  const [events] = useState(props.events);
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
              }}
            >
              <Grid
                sx={{
                  padding: "0 0 0 30px",
                  width: "100%",
                }}
              >
                <nav className="grid admin-day-nav">
                  <h1>
                    <FontAwesomeIcon
                      className="day-icon"
                      icon={faCalendarDay}
                    />
                  </h1>
                  <h1>
                    <FontAwesomeIcon className="day-icon" icon={faPlus} />
                  </h1>
                </nav>
                <Grid>
                  {view === "calendar" ? (
                    <Grid>
                      <Grid>
                        <Grid>Title</Grid>
                        <Grid>Date</Grid>
                        <Grid>Price</Grid>
                        <Grid>Spots</Grid>
                      </Grid>
                      <Grid>
                        {events.map((event: any, index: number) => (
                          <Grid key={index}>
                            <Grid>{event.title}</Grid>
                            <Grid>{event.event_date}</Grid>
                            <Grid>{event.price}</Grid>
                            <Grid>{event.spots}</Grid>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid className="">
                      <form className="admin-form"></form>
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
