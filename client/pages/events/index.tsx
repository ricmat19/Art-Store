import { useState } from "react";
import IndexAPI from "../../apis/indexAPI";
import MainNav from "../../components/users/mainNav";
import PagesNav from "../../components/users/pagesNav";
import FooterC from "../../components/footer";
import Head from "next/head";
import Calendar from "../../components/users/events/calendar";
import Day from "../../components/users/events/day";
import { Grid } from "@mui/material";
import SummaryList from "../../components/users/events/summaryList";

interface IEvents {
  events: any;
  cartQty: number | null | undefined;
}
const Events = (props: IEvents) => {
  const [events] = useState(props.events);
  const [date, setDate] = useState();
  const [dateEvents, setDateEvents] = useState();

  const [dayOpen, setDayOpen] = useState(false);
  const handleDayOpen = () => setDayOpen(true);
  const handleDayClose = () => setDayOpen(false);

  return (
    <Grid>
      <Head>
        <title>artHouse19-Events</title>
      </Head>
      <Day
        open={dayOpen}
        handleClose={handleDayClose}
        date={date}
        dateEvents={dateEvents}
      />
      <MainNav cartQty={props.cartQty} />
      <PagesNav />
      <Grid sx={{ display: "grid", gridTemplateColumns: "1fr auto" }}>
        <Grid>
          <Calendar
            handleDayOpen={handleDayOpen}
            events={events}
            setDate={setDate}
            setDateEvents={setDateEvents}
          />
        </Grid>
        <Grid className="summary-list-container">
          <SummaryList events={events} />
        </Grid>
      </Grid>
      <FooterC />
    </Grid>
  );
};

export async function getStaticProps() {
  const cartResponse = await IndexAPI.get(`/cart`);
  const eventsResponse = await IndexAPI.get(`/events`);

  return {
    props: {
      cartQty: cartResponse.data.data.cart.length,
      events: eventsResponse.data.data.events,
    },
    revalidate: 1,
  };
}

export default Events;
