import PropTypes from "prop-types";
import { Backdrop, Box, Fade, Modal, Grid, Button } from "@mui/material";

// interface IModalState {
//   show: boolean;
//   onHide: () => void;
// }

const Reset = (props: any) => {
  return (
    <Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.signUpOpen}
        onClose={props.handleSignUpClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.signUpOpen}>
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
                minHeight: "500px",
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
                        <Grid>
                          <button>Send Reset Link</button>
                        </Grid>
                        <Grid className="sign-footer">
                          <Grid className="modal-link">
                            <span>Back to signin in</span>
                          </Grid>
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
                  <Grid>
                    <Button onClick={props.onHide}>Close</Button>
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

Reset.propTypes = {
  onHide: PropTypes.string,
};

export default Reset;
