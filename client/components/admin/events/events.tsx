/* eslint-disable @next/next/no-img-element */
import { Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";

interface IAdminEvents {
  setSelectedEvent: (arg0: any) => void;
  setView: (arg0: string) => void;
  dateEvents: any[] | undefined;
  displayDeleteModal: (arg0: any) => void;
}

const AdminEvents = (props: IAdminEvents) => {
  const displayEditModal = (event: any) => {
    props.setSelectedEvent(event);
    props.setView("edit");
  };

  return (
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
                  onClick={() => props.displayDeleteModal(event.id)}
                />
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
