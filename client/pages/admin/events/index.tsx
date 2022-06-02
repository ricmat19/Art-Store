import { useEffect, useState } from "react";
import IndexAPI from "../../../apis/indexAPI";
import AdminMainNav from "../../../components/admin/mainNav";
import AdminPagesNav from "../../../components/admin/pagesNav";
import FooterC from "../../../components/footer";
import Head from "next/head";
import AdminCalendar from "../../../components/admin/events/calendar";
import AdminDay from "../../../components/admin/events/dayModal";
import AdminDeleteEvent from "../../../components/admin/events/deleteEventModal";
import { Grid } from "@mui/material";

interface IAdminEvents {
  events: string | any[];
}

const AdminEvents = (props: IAdminEvents) => {
  const [loginStatus, setLoginStatus] = useState<boolean>(true);

  const [events, setEvents] = useState(props.events);
  const [date, setDate] = useState();
  const [dateEvents, setDateEvents] = useState();
  const [deleteEvent, setDeleteEvent] = useState<any>();

  const [dayOpen, setDayOpen] = useState(false);
  const handleDayOpen = () => setDayOpen(true);
  const handleDayClose = () => setDayOpen(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginResponse = await IndexAPI.get(`/login`);
        setLoginStatus(loginResponse.data.data.loggedIn);

        const eventsResponse = await IndexAPI.get(`/admin/events`);
        setEvents(eventsResponse.data.data.events);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [dateEvents]);

  const displayDeleteModal = (id: string) => {
    for (let i = 0; i < props.events.length; i++) {
      if (props.events[i].id === id) {
        setDeleteEvent(props.events[i]);
      }
    }
    handleDeleteOpen();
  };

  if (loginStatus) {
    return (
      <Grid>
        <Head>
          <title>artHouse19-Admin Events</title>
        </Head>
        <AdminDay
          open={dayOpen}
          handleClose={handleDayClose}
          date={date}
          dateEvents={dateEvents}
          displayDeleteModal={displayDeleteModal}
        />
        <AdminDeleteEvent
          deleteEvent={deleteEvent}
          open={deleteOpen}
          handleClose={handleDeleteClose}
        />
        <AdminMainNav />
        <AdminPagesNav />
        <Grid className="main-body">
          <AdminCalendar
            handleDayOpen={handleDayOpen}
            events={events}
            setDate={setDate}
            setDateEvents={setDateEvents}
          />
          <FooterC />
        </Grid>
      </Grid>
    );
  } else {
    return <Grid></Grid>;
  }
};

export async function getStaticProps() {
  const eventsResponse = await IndexAPI.get(`/admin/events`);

  return {
    props: {
      events: eventsResponse.data.data.events,
    },
    revalidate: 1,
  };
}

export default AdminEvents;
