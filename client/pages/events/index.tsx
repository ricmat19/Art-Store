import { useState } from "react";
import IndexAPI from "../../apis/indexAPI";
import MainNav from "../../components/users/mainNav";
import PagesNav from "../../components/users/pagesNav";
import Footer from "../../components/footer";
import Head from "next/head";
import Calendar from "../../components/users/events/calendar";
import Day from "../../components/users/events/dayModal";
import { Grid } from "@mui/material";
import SummaryList from "../../components/users/events/summaryList";
import { IEvent } from "../../interfaces";

//Events props interface
interface IEvents {
  events: IEvent[];
  cartQty: number;
}

//Events functional component
const Events = (props: IEvents) => {
  // Events states
  const [date, setDate] = useState<string>();
  const [dateEvents, setDateEvents] = useState<IEvent[]>([]);
  const [dayOpen, setDayOpen] = useState(false);

  //Functions handling the opening/closing of the day component
  const handleDayOpen = () => setDayOpen(true);
  const handleDayClose = () => setDayOpen(false);

  // Events component
  return (
    <Grid>
      <Head>
        <title>artHouse19-Events</title>
      </Head>
      {/* Day component */}
      <Day
        open={dayOpen}
        handleClose={handleDayClose}
        date={date}
        dateEvents={dateEvents}
      />
      {/* Main navigation component */}
      <MainNav cartQty={props.cartQty} />
      {/* Pages navigation component */}
      <PagesNav />
      <Grid sx={{ display: "grid", gridTemplateColumns: "1fr auto" }}>
        <Grid>
          {/* Display calendar component */}
          <Calendar
            handleDayOpen={handleDayOpen}
            events={props.events}
            setDate={setDate}
            setDateEvents={setDateEvents}
          />
        </Grid>
        <Grid className="summary-list-container">
          {/* Display summary list component */}
          <SummaryList
            handleDayOpen={handleDayOpen}
            events={props.events}
            setDate={setDate}
            setDateEvents={setDateEvents}
          />
        </Grid>
      </Grid>
      {/* Footer component */}
      <Footer />
    </Grid>
  );
};

export async function getStaticProps() {
  // Get all cart items
  const cartResponse = await IndexAPI.get(`/cart`);
  // Get all events
  const eventsResponse = await IndexAPI.get(`/events`);

  //Provide the cart quantity and list of events as a props to the course component
  return {
    props: {
      cartQty: cartResponse.data.data.cart.length,
      events: eventsResponse.data.data.events,
    },
    revalidate: 1,
  };
}

export default Events;
