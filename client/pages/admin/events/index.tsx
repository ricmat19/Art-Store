import { useEffect, useState } from "react";
import IndexAPI from "../../../apis/indexAPI";
import AdminMainNav from "../../../components/admin/mainNav";
import AdminPagesNav from "../../../components/admin//pagesNav";
import FooterC from "../../../components/footer";
import Head from "next/head";
import AdminCalendar from "../../../components/admin/events/calendar";
import AdminAddEvent from "../../../components/admin/events/addEvent";
import AdminDeleteEvent from "../../../components/admin/events/deleteEvent";
import { Grid } from "@mui/material";

const AdminEvents = (props: any) => {
  const [loginStatus, setLoginStatus] = useState<boolean>(true);
  const [events] = useState(props.events);
  const [deleteEvent, setDeleteEvent] = useState<any>();

  const [addOpen, setAddOpen] = useState(false);
  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => setAddOpen(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  const displayDeleteModal = (id: any) => {
    for (let i = 0; i < events.length; i++) {
      if (events[i].id === id) {
        setDeleteEvent(events[i]);
      }
    }
    handleDeleteOpen();
  };

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
  }, []);

  if (loginStatus) {
    return (
      <Grid>
        <Head>
          <title>artHouse19-Admin Courses</title>
        </Head>
        <AdminAddEvent open={addOpen} handleClose={handleAddClose} />
        <AdminDeleteEvent
          deleteProduct={deleteEvent}
          open={deleteOpen}
          handleClose={handleDeleteClose}
        />
        <AdminMainNav />
        <AdminPagesNav />
        <Grid className="main-body">
          <AdminCalendar
            handleAddOpen={handleAddOpen}
            displayDeleteModal={displayDeleteModal}
          />
          <FooterC />
        </Grid>
      </Grid>
    );
  } else {
    return <Grid></Grid>;
  }
};

export default AdminEvents;
