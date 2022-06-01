/* eslint-disable @next/next/no-img-element */
import IndexAPI from "../../../apis/indexAPI";
import { Backdrop, Box, Fade, Grid, Modal } from "@mui/material";
import { ReactChild, ReactFragment, ReactPortal } from "react";

//Admin delete course prop interface
interface IAdminDeleteCourse {
  deleteCourse: {
    id: string;
    imageBuffer: string | undefined;
    title:
      | boolean
      | ReactChild
      | ReactFragment
      | ReactPortal
      | null
      | undefined;
  };
  open: boolean | undefined;
  handleClose:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
}

//Admin function to delete a course
const AdminDeleteCourse = (props: IAdminDeleteCourse) => {
  const handleDelete = async () => {
    try {
      await IndexAPI.delete(`/admin/courses/${props.deleteCourse.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  //Display the delete course modal if a course is provided
  if (props.deleteCourse) {
    //Admin delete course modal
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
                width: "60vw",
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
                  className="image"
                  sx={{
                    justifyContent: "center",
                  }}
                >
                  {/* Display the course image */}
                  <Grid className="big-image-div">
                    <img
                      className="big-image"
                      src={props.deleteCourse.imageBuffer}
                      alt="big image"
                    />
                  </Grid>
                </Grid>
                <Grid
                  sx={{
                    padding: "0 0 0 30px",
                    height: "100%",
                  }}
                >
                  {/* Admin delete course Form */}
                  <form className="admin-form">
                    {/* List the course that will be deleted */}
                    <Grid className="align-center">
                      <h1>
                        Are you sure you want to delete &quot;
                        {props.deleteCourse.title}&quot; ?
                      </h1>
                    </Grid>
                    {/* Course delete button */}
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

export default AdminDeleteCourse;
