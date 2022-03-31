/* eslint-disable @next/next/no-img-element */
import { Grid } from "@mui/material";

const SummaryList = (props: any) => {
  return (
    <Grid container>
      <Grid container sx={{ justifyContent: "center", margin: "5px 0" }}>
        <h1>Events Summary</h1>
      </Grid>
      <hr className="full-width" />
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
      {props.events !== undefined ? (
        props.events.map((event: any, index: number) => (
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
              <Grid xs={3}>
                <h4 className="align-left">
                  {(new Date(event.event_date).getMonth() + 1).toString()}/
                  {new Date(event.event_date).getDate().toString()}/
                  {new Date(event.event_date).getFullYear().toString()}
                </h4>
              </Grid>
              <Grid xs={4}>
                <h4 className="align-left">{event.title}</h4>
              </Grid>
              <Grid xs={3}>
                <h4 className="align-left">{event.price}</h4>
              </Grid>
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
  );
};

export default SummaryList;
