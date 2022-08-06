/* eslint-disable @next/next/no-img-element */
import IndexAPI from "../../../apis/indexAPI";
import { Backdrop, Box, Fade, Grid, Modal } from "@mui/material";
import { IHelpArticle } from "../../../interfaces";
import { useRouter } from "next/router";

//Admin delete help props interface
interface IAdminDeleteHelp {
  deleteHelpArticle: IHelpArticle;
  handleClose: () => void;
  open: boolean;
}

//Admin delete help modal functional component
const AdminDeleteHelp = (props: IAdminDeleteHelp) => {

  // Next router function
  const router = useRouter();

  //Admin function to delete a help
  const handleDelete = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      if (props.deleteHelpArticle !== undefined) {
        await IndexAPI.delete(`/admin/help/${props.deleteHelpArticle.id}`);
      }
      //Direct to the help article's category page on submit
      await router.push(`/admin/help/${props.deleteHelpArticle.category}`);
    } catch (err) {
      console.log(err);
    }
  };

  //Display the delete help modal if a help is provided
  if (props.deleteHelpArticle) {
    //Admin delete help modal
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
                  padding: "30px",
                }}
              >
                <Grid
                  sx={{
                    padding: "0 0 0 30px",
                    height: "100%",
                  }}
                >
                  {/* Admin delete help form */}
                  <form className="admin-form">
                    <Grid className="align-center">
                      <h1>
                        Are you sure you want to delete &quot;
                        {props.deleteHelpArticle.title}&quot; ?
                      </h1>
                    </Grid>
                    {/* help delete button */}
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

export default AdminDeleteHelp;
