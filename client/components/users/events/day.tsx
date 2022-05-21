/* eslint-disable @next/next/no-img-element */
import { Backdrop, Box, Fade, Modal, Grid } from "@mui/material";
import { ReactChild, ReactFragment, ReactPortal, useState } from "react";
import Events from "./events";
import AddToCart from "./addToCart";

interface IDay {
  open: boolean | undefined;
  handleClose:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
  date: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined;
  dateEvents: any;
}

const Day = (props: IDay) => {
  const [view, setView] = useState("events");
  const [selectedEvent, setSelectedEvent] = useState();
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
                <Grid>
                  {view === "events" ? (
                    <Events
                      setView={setView}
                      setSelectedEvent={setSelectedEvent}
                      dateEvents={props.dateEvents}
                    />
                  ) : (
                    <AddToCart selectedEvent={selectedEvent} />
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

export default Day;
