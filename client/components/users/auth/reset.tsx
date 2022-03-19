import { Backdrop, Box, Fade, Modal, Grid } from "@mui/material";

const Reset = (props: any) => {
  const displaySignIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      props.handleResetClose();
      props.handleSignInOpen();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.resetOpen}
        onClose={props.handleResetClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.resetOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              border: "2px solid #fff",
              boxShadow: 24,
              width: "500px",
            }}
          >
            <Grid
              container
              sx={{
                flexDirection: "row",
                flexWrap: "nowrap",
                alignItems: "center",
                color: "#000",
                justifyContent: "flex-end",
                backgroundColor: "#000",
                padding: "30px",
              }}
            >
              <Grid
                sx={{
                  width: "100%",
                  display: "grid",
                  alignSelf: "flex-start",
                }}
              >
                <Grid>
                  <Grid>
                    <Grid id="contained-modal-title-vcenter"></Grid>
                  </Grid>
                  <Grid>
                    <form>
                      <Grid className="sign-content">
                        <h1 className="sign-header">Reset Password</h1>
                        <Grid className="sign-input">
                          <Grid className="forgot-input-div">
                            <input type="text" placeholder="Email" />
                          </Grid>
                        </Grid>
                        <Grid className="align-center">
                          <button>Send Reset Link</button>
                        </Grid>
                        <Grid className="sign-footer pointer">
                          <Grid
                            className="align-center modal-link"
                            onClick={displaySignIn}
                          >
                            <span>Back to signin</span>
                          </Grid>
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </Grid>
  );
};

export default Reset;
