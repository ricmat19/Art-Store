/* eslint-disable @next/next/no-img-element */
import IndexAPI from "../../../../apis/indexAPI";
import { Backdrop, Box, Fade, Grid, Modal } from "@mui/material";

//Admin delete blog post prop interface
interface IAdminDeleteBlog {
  deleteBlog: { id: string; imageBuffer: string; title: string }[];
  setBlogs: (arg0: any) => void;
  blogs: any[];
  handleClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
  open: boolean;
}

//Admin delete post modal functional component
const AdminDeleteBlogPostModal = (props: IAdminDeleteBlog) => {
  //Admin function to delete blog post
  const handleDelete = async () => {
    try {
      await IndexAPI.delete(`/admin/blog/${props.deleteBlog[0].id}`);
      props.setBlogs(
        props.blogs.filter((blog: { id: string }) => {
          return blog.id !== props.deleteBlog[0].id;
        })
      );
      props.handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  //Display the delete blog post modal if a blog post is provided
  if (props.deleteBlog) {
    //Admin delete blog post modal
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
                  {/* Display the selected blog post's image*/}
                  <Grid className="big-image-div">
                    <img
                      className="big-image"
                      src={props.deleteBlog[0].imageBuffer}
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
                  {/* Admin delete blog post form */}
                  <form className="admin-form">
                    <Grid className="align-center">
                      <h1>
                        Are you sure you want to delete &quot;
                        {props.deleteBlog[0].title}&quot; ?
                      </h1>
                    </Grid>
                    {/* Blog post delete button */}
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

export default AdminDeleteBlogPostModal;
