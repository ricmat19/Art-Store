import PropTypes from "prop-types";
import { Modal, Fade, Box, Grid } from "@mui/material";

interface IModalState {
  open: boolean;
  handleClose: () => void;
  email: string;
  password: string;
}

const AdminResetModal = (props: IModalState) => {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Fade in={props.open}>
        <Box>
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
        </Box>
      </Fade>
    </Modal>
  );
};

AdminResetModal.propTypes = {
  onHide: PropTypes.string,
};

export default AdminResetModal;
