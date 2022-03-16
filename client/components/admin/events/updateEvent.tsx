/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import IndexAPI from "../../../apis/indexAPI";
import { Grid } from "@mui/material";

const AdminUpdateEvent = (props: any) => {
  const [selectedTitle, setSelectedTitle] = useState<string>(
    props.selectedEvent.title
  );
  const [selectedPrice, setSelectedPrice] = useState<number>(
    parseInt(props.selectedEvent.price.replace("$", ""))
  );
  const [selectedSpots, setSelectedSpots] = useState<string>(
    props.selectedEvent.spots
  );
  const [selectedInfo, setSelectedInfo] = useState<string>(
    props.selectedEvent.info
  );

  const editEvent = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await IndexAPI.put(`/admin/events/${props.selectedEvent.id}`, {
        selectedTitle,
        selectedPrice,
        selectedInfo,
        selectedSpots,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid className="create-event">
      <form>
        <h1>Edit Event</h1>
        <Grid className="admin-form-field">
          <label className="event-form-label">Title</label>
          <input
            value={selectedTitle}
            onChange={(e) => setSelectedTitle(e.target.value)}
            type="text"
            name="eventTitle"
            className="form-control"
            required
          />
        </Grid>
        <Grid className="admin-form-field">
          <label className="event-form-label">Price</label>
          <input
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(parseInt(e.target.value))}
            type="number"
            name="eventPrice"
            className="form-control"
            required
          />
        </Grid>
        <Grid className="admin-form-field">
          <label className="event-form-label">Spots</label>
          <input
            value={selectedSpots}
            onChange={(e) => setSelectedSpots(e.target.value)}
            type="number"
            name="eventSpots"
            className="form-control"
            required
          />
        </Grid>
        <Grid className="admin-form-field">
          <label className="event-form-label">Info</label>
          <textarea
            value={selectedInfo}
            onChange={(e) => setSelectedInfo(e.target.value)}
            className="form-control"
            required
            rows={7}
          />
        </Grid>
        <Grid className="align-center">
          <button type="submit" onClick={(e) => editEvent(e)}>
            Submit
          </button>
        </Grid>
      </form>
    </Grid>
  );
};

export default AdminUpdateEvent;
