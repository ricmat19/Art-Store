import { useEffect, useState } from "react";
import IndexAPI from "../../../apis/indexAPI";
import AdminMainNav from "../../../components/admin/mainNav";
import AdminPagesNav from "../../../components/admin/pagesNav";
import FooterC from "../../../components/footer";
import Head from "next/head";
import AdminCalendar from "../../../components/admin/events/calendar";
import AdminDayModal from "../../../components/admin/events/dayModal";
import AdminDeleteEventModal from "../../../components/admin/events/deleteEventModal";
import { Grid } from "@mui/material";
import { IEvent } from "../../../interfaces";

//Admin events props interface
interface IAdminEvents {
  events: IEvent[];
}

//Admin events functional component
const AdminEvents = (props: IAdminEvents) => {
  // Admin events states
  const [loginStatus, setLoginStatus] = useState<boolean>(true);
  const [events, setEvents] = useState(props.events);
  const [date, setDate] = useState<Date>(undefined);
  const [dateEvents, setDateEvents] = useState<IEvent[]>([]);
  const [deleteEvent, setDeleteEvent] = useState<IEvent>();
  const [dayOpen, setDayOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  //Handle opening/closing day modal
  const handleDayOpen = () => setDayOpen(true);
  const handleDayClose = () => setDayOpen(false);

  //Handle opening/closing event delete modal
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  useEffect(() => {
    const fetchData = () => {
      try {
        //Query login status on render
        const loginResponse = IndexAPI.get(`/login`);
        setLoginStatus(loginResponse.data.data.loggedIn);

        //Get a list of all events and set it as the events state
        const eventsResponse = IndexAPI.get(`/admin/events`);
        setEvents(eventsResponse.data.data.events);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    // Re-render if change to date events state
  }, [dateEvents]);

  // Function to set an event to delete and display delete modal
  const displayDeleteModal = (id: string) => {
    for (let i = 0; i < props.events.length; i++) {
      if (props.events[i].id === id) {
        setDeleteEvent(props.events[i]);
      }
    }
    handleDeleteOpen();
  };

  //Render component based on login status
  if (loginStatus) {
    return (
      <Grid>
        <Head>
          <title>artHouse19-Admin Events</title>
        </Head>
        {/* Day modal component */}
        <AdminDayModal
          open={dayOpen}
          handleClose={handleDayClose}
          date={date}
          dateEvents={dateEvents}
          displayDeleteModal={displayDeleteModal}
        />
        <AdminDeleteEventModal
          deleteEvent={deleteEvent}
          open={deleteOpen}
          handleClose={handleDeleteClose}
          setBlogs={function (): void {
            throw new Error("Function not implemented.");
          } } event={[]}        />
        {/* Admin main navigation component */}
        <AdminMainNav />
        {/* Admin pages navigation component */}
        <AdminPagesNav />
        <Grid className="main-body">
          {/* Admin calendar component */}
          <AdminCalendar
            handleDayOpen={handleDayOpen}
            events={events}
            setDate={setDate}
            setDateEvents={setDateEvents}
          />
          {/* Footer component */}
          <FooterC />
        </Grid>
      </Grid>
    );
  } else {
    return <Grid></Grid>;
  }
};

export async function getStaticProps() {
  // Get all event
  const eventsResponse = await IndexAPI.get(`/admin/events`);

  //Provide all events as props to the events component
  return {
    props: {
      events: eventsResponse.data.data.events,
    },
    revalidate: 1,
  };
}

export default AdminEvents;
