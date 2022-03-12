import { useEffect, useState } from "react";
import IndexAPI from "../../../apis/indexAPI";
import AdminMainNav from "../../../components/admin/mainNav";
import AdminPagesNav from "../../../components/admin//pagesNav";
import FooterC from "../../../components/footer";
import Head from "next/head";
import AdminCalendar from "../../../components/admin/events/calendar";
import AdminDay from "../../../components/admin/events/day";
import { Grid } from "@mui/material";

const AdminEvents = (props: any) => {
  const [loginStatus, setLoginStatus] = useState<boolean>(true);

  const [events] = useState(props.events);
  const [date, setDate] = useState();
  const [dateEvents, setDateEvents] = useState();

  const [dayOpen, setDayOpen] = useState(false);
  const handleDayOpen = () => setDayOpen(true);
  const handleDayClose = () => setDayOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginResponse = await IndexAPI.get(`/login`);
        setLoginStatus(loginResponse.data.data.loggedIn);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [dateEvents]);

  if (loginStatus) {
    return (
      <Grid>
        <Head>
          <title>artHouse19-Admin Courses</title>
        </Head>
        <AdminDay open={dayOpen} handleClose={handleDayClose} date={date} dateEvents={dateEvents}/>
        <AdminMainNav />
        <AdminPagesNav />
        <Grid className="main-body">
          <AdminCalendar handleDayOpen={handleDayOpen} events={events} setDate={setDate} setDateEvents={setDateEvents}/>
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
