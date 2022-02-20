import PropTypes from "prop-types";
import { Grid, Button } from '@mui/material';

interface IModalState {
  show: boolean,
  onHide: () => void
}

const ResetModal = (props: IModalState) => {
    return (
        <Grid
        // {...props}
        // size="lg"
        // aria-labelledby="contained-modal-title-vcenter"
        // centered
        >
        <Grid>
            <Grid id="contained-modal-title-vcenter">

            </Grid>
        </Grid>
        <Grid>
        <form>
          <div 
          className="sign-content">
            <h1 className="sign-header">Reset Password</h1>
            <div className="sign-input">
              <div className="forgot-input-div">
                <input type="text" placeholder="Email" />
              </div>
            </div>
            <div>
              <button>Send Reset Link</button>
            </div>
            <div className="sign-footer">
              <div className="modal-link">
                <span>Back to signin in</span>
              </div>
            </div>
          </div>
        </form>
        </Grid>
        <Grid>
            <Button onClick={props.onHide}>Close</Button>
        </Grid>
        </Grid>
  );
}

ResetModal.propTypes = {
  onHide: PropTypes.string,
};

export default ResetModal;