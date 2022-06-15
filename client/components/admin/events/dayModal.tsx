/* eslint-disable @next/next/no-img-element */
import {
  ReactChild,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import IndexAPI from "../../../apis/indexAPI";
import { Backdrop, Box, Fade, Modal, Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay, faPlus } from "@fortawesome/free-solid-svg-icons";
import AdminEvents from "./events";
import AdminCreateEvent from "./createEvent";
import AdminUpdateEvent from "./updateEvent";

//Admin day modal prop interface
interface IAdminDay {
  date: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined;
  handleClose: () => void;
  open: boolean;
  dateEvents: any;
  displayDeleteModal: (arg0: any) => void;
}

//Admin day modal functional component
const AdminDayModal = (props: IAdminDay) => {
  //Admin day modal states
  const [view, setView] = useState("events");
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [spots, setSpots] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const [selectedEvent, setSelectedEvent] = useState({ id: "" });

  //Sets the day modal's view to events
  useEffect(() => {
    const fetchData = async () => {
      try {
        setView("events");
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [props]);

  //Admin function to create an event
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

      //Create an event on the specified dae
      const selectedDate = props.date;
      await IndexAPI.post("/admin/events", {
        title,
        selectedDate,
        price,
        spots,
        info,
      });

      props.handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  //Admin day modal
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
                  {/* Events icon button to set the view to 'events' */}
                  <h1>
                    <FontAwesomeIcon
                      className="day-icon"
                      icon={faCalendarDay}
                      onClick={() => setView("events")}
                    />
                  </h1>
                  {/* Events icon button to set the view to 'create' */}
                  <h1>
                    <FontAwesomeIcon
                      className="day-icon"
                      icon={faPlus}
                      onClick={() => setView("create")}
                    />
                  </h1>
                </nav>
                {/* Displays the events, create, or update component in the day modal depending on the view state */}
                <Grid>
                  {view === "events" ? (
                    <AdminEvents
                      dateEvents={props.dateEvents}
                      displayDeleteModal={props.displayDeleteModal}
                      setSelectedEvent={setSelectedEvent}
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
                    <AdminUpdateEvent
                      selectedEvent={selectedEvent}
                      handleClose={props.handleClose}
                    />
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

export default AdminDayModal;
