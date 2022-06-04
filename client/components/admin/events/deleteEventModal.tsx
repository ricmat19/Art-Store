/* eslint-disable @next/next/no-img-element */
import IndexAPI from "../../../apis/indexAPI";
import { Backdrop, Box, Fade, Grid, Modal } from "@mui/material";

//Admin delete event modal prop interface
interface IAdminDeleteEvent {
  deleteEvent: { id: string }[];
  setBlogs: (arg0: any) => void;
  event: any[];
  handleClose:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
  open: boolean | undefined;
}

//Admin delete event modal functional component
const AdminDeleteEventModal = (props: IAdminDeleteEvent) => {
  //admin function to delete event
  const handleDelete = async () => {
    try {
      await IndexAPI.delete(`/admin/events/${props.deleteEvent[0].id}`);
      props.setBlogs(
        props.event.filter((event: any) => {
          return event.id !== props.deleteEvent[0].id;
        })
      );
      props.handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  //Display the delete event modal if a course is provided
  if (props.deleteEvent) {
    //Admin delete event modal
    return (
      <Grid>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={props.open}
          onClose={props.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={props.open}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "#000",
                border: "2px solid #fff",
                boxShadow: 24,
                width: "450px",
              }}
            >
              <Grid
                container
                sx={{
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  color: "#000",
                  backgroundColor: "#000",
                }}
              >
                <Grid
                  sx={{
                    height: "100%",
                  }}
                >
                  {/* Admin delete event Form */}
                  <form className="admin-form">
                    <Grid className="align-center">
                      <h1>
                        Are you sure you want to delete &quot;
                        {props.deleteEvent.title}&quot; ?
                      </h1>
                    </Grid>
                    {/* Event delete button */}
                    <button onClick={handleDelete} type="submit">
                      Delete
                    </button>
                  </form>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Modal>
      </Grid>
    );
  } else {
    return <Grid></Grid>;
  }
};

export default AdminDeleteEventModal;