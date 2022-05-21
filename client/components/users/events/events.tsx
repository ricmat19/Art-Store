/* eslint-disable @next/next/no-img-element */
// import { useState } from "react";
import { Grid } from "@mui/material";
import IndexAPI from "../../../apis/indexAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";

interface IEvents {
  setSelectedEvent: (arg0: any) => void;
  setView: (arg0: string) => void;
  dateEvents: any[] | undefined;
}

const Events = (props: IEvents) => {
  const addToCart = async (event: any) => {
    try {
      await IndexAPI.post("/cart", {
        id: event.id,
      });
      props.setSelectedEvent(event);

      props.setView("addToCart");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Grid container sx={{ width: "100%" }}>
      {/* <Grid xs={1}></Grid> */}
      <Grid xs={4}>
        <h3 className="align-left">Title</h3>
      </Grid>
      <Grid xs={4}>
        <h3 className="align-left">Price</h3>
      </Grid>
      <Grid xs={3}>
        <h3 className="align-left">Spots</h3>
      </Grid>
      <Grid xs={1}>
        <h3 className="align-center">$</h3>
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
              <Grid xs={4}>
                <h4 className="align-left">{event.title}</h4>
              </Grid>
              <Grid xs={4}>
                <h4 className="align-left">{event.price}</h4>
              </Grid>
              <Grid xs={3}>
                <h4 className="align-left">{event.spots}</h4>
              </Grid>
              <Grid xs={1} sx={{ textAlign: "center", alignSelf: "center" }}>
                <FontAwesomeIcon
                  className="day-event-icon"
                  icon={faTicket}
                  onClick={() => addToCart(event)}
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

export default Events;
