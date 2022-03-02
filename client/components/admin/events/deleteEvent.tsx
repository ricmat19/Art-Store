/* eslint-disable @next/next/no-img-element */
import IndexAPI from "../../../../apis/indexAPI";
import { Backdrop, Box, Fade, Grid, Modal } from "@mui/material";

const AdminDeleteEvent = (props: any) => {
  const handleDelete = async () => {
    try {
      await IndexAPI.delete(
        `/admin/medias/blog/delete/${props.deleteBlog[0].id}`
      );
      props.setBlogs(
        props.blogs.filter((blog: any) => {
          return blog.id !== props.deleteBlog[0].id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  if (props.deleteBlog) {
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
                p: 4,
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
                  <Grid className="big-image-div">
                    <img
                      className="big-image"
                      src={props.deleteBlog.imageBuffer}
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
                  <form
                    className="admin-form"
                    action="/routes/admin.js"
                    method="POST"
                  >
                    <Grid className="align-center">
                      <h1>
                        Are you sure you want to delete &quot;
                        {props.deleteBlog.title}&quot; ?
                      </h1>
                    </Grid>
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
    return <div></div>;
  }
};

export default AdminDeleteBlog;
