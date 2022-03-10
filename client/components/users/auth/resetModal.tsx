import PropTypes from "prop-types";
import { Grid, Button } from "@mui/material";

interface IModalState {
  show: boolean;
  onHide: () => void;
}

const ResetModal = (props: IModalState) => {
  return (
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
  );
};

ResetModal.propTypes = {
  onHide: PropTypes.string,
};

export default ResetModal;
