/* eslint-disable @next/next/no-img-element */
import { Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";

//Admin events prop interface
interface IDateEvents {
  id: string;
  title: string;
  price: string;
  spots: string;
}
interface IAdminEvents {
  setSelectedEvent: (arg0: any) => void;
  setView: (arg0: string) => void;
  dateEvents: IDateEvents[];
  displayDeleteModal: (arg0: any) => void;
}

//Admin events functional component
const AdminEvents = (props: IAdminEvents) => {
  //Function to display the events edit modal
  const displayEditModal = (event: any) => {
    props.setSelectedEvent(event);
    props.setView("edit");
  };

  //Admin events component
  return (
    <Grid container sx={{ width: "100%" }}>
      {/* Events title row */}
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
        {/* Map through and display all events from the specified date if there are events that day*/}
        {props.dateEvents !== undefined ? (
          props.dateEvents.map((event: IDateEvents, index: number) => (
            <Grid
              key={index}
              container
              sx={{ gridTemplateColumns: "auto auto auto" }}
            >
              {/* Button to display the event delete modal */}
              <Grid xs={1} sx={{ alignSelf: "center" }}>
                <FontAwesomeIcon
                  className="day-event-icon"
                  icon={faTrashCan}
                  onClick={() => props.displayDeleteModal(event.id)}
                />
              </Grid>
              {/* Display event title */}
              <Grid xs={5}>
                <h4 className="align-left">{event.title}</h4>
              </Grid>
              {/* Display event price */}
              <Grid xs={3}>
                <h4 className="align-left">{event.price}</h4>
              </Grid>
              {/* Display event spots */}
              <Grid xs={2}>
                <h4 className="align-left">{event.spots}</h4>
              </Grid>
              {/* Button to display the event edit modal */}
              <Grid xs={1} sx={{ alignSelf: "center" }}>
                <FontAwesomeIcon
                  className="day-event-icon"
                  icon={faPencil}
                  onClick={() => displayEditModal(event)}
                />
              </Grid>
            </Grid>
          ))
        ) : (
          <Grid></Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default AdminEvents;
