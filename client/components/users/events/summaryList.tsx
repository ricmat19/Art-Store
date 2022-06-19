/* eslint-disable @next/next/no-img-element */
import { Grid } from "@mui/material";
import { IEvent } from "../../../interfaces";

//Summary list props interface
interface ISummaryList {
  events: IEvent[] | undefined;
}

//Summary list functional component for events
const SummaryList = (props: ISummaryList) => {
  //Summary list component for events
  return (
    <Grid container>
      <Grid container sx={{ justifyContent: "center", margin: "5px 0" }}>
        <h1>Events Summary</h1>
      </Grid>
      <hr className="full-width" />
      {/* Summary list title row */}
      <Grid container sx={{ margin: "5px 0", padding: "0 10px" }}>
        <Grid xs={3}>
          <h3 className="align-left">Date</h3>
        </Grid>
        <Grid xs={4}>
          <h3 className="align-left">Title</h3>
        </Grid>
        <Grid xs={3}>
          <h3 className="align-left">Price</h3>
        </Grid>
        <Grid xs={2}>
          <h3 className="align-left">Spots</h3>
        </Grid>
      </Grid>
      <hr className="full-width" />
      <Grid className="mapped-events-summary-container">
        {/* Map through and display all events in order of date if there are events*/}
        {props.events !== undefined ? (
          props.events.reverse().map((event: IEvent, index: number) => (
            <Grid
              key={index}
              container
              className="summary-event-container"
              sx={{
                gridTemplateColumns: "auto auto auto auto",
              }}
            >
              <Grid
                container
                className="summary-event"
                sx={{
                  padding: "10px",
                }}
              >
                {/* Display the event date */}
                <Grid xs={3}>
                  <h4 className="align-left">
                    {(new Date(event.event_date).getMonth() + 1).toString()}/
                    {new Date(event.event_date).getDate().toString()}/
                    {new Date(event.event_date).getFullYear().toString()}
                  </h4>
                </Grid>
                {/* Display the event title */}
                <Grid xs={4}>
                  <h4 className="align-left">{event.title}</h4>
                </Grid>
                {/* Display the event price */}
                <Grid xs={3}>
                  <h4 className="align-left">{event.price}</h4>
                </Grid>
                {/* Display the event spots count */}
                <Grid xs={2}>
                  <h4 className="align-left">{event.spots}</h4>
                </Grid>
              </Grid>
              <hr className="full-width" />
            </Grid>
          ))
        ) : (
          <Grid></Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default SummaryList;
