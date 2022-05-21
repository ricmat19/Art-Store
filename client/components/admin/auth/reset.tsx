import IndexAPI from "../../../apis/indexAPI";
import PropTypes from "prop-types";
import { Modal, Fade, Box, Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface IModalState {
  open: boolean;
  handleClose: () => void;
  email: string;
  password: string;
}

interface IResetForm {
  email: string;
}

const initialValues = {
  email: "",
};
const onSubmit = (values: IResetForm, onSubmitProps: any) => {
  IndexAPI.post("/reset", {
    email: values.email,
  });
  onSubmitProps.resetForm();
};
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

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
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            validateOnMount
          >
            <Form>
              <Grid className="sign-content">
                <h1 className="sign-header">Reset Password</h1>
                <Grid className="sign-input">
                  <Grid className="forgot-input-div">
                    <Grid sx={{ display: "grid" }}>
                      <Field
                        as="input"
                        type="email"
                        name="email"
                        placeholder="Email"
                      />
                      <ErrorMessage name="email" component="div">
                        {(errorMsg) => (
                          <Grid className="errorMsg">{errorMsg}</Grid>
                        )}
                      </ErrorMessage>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid>
                  <button type="submit">Send Reset Link</button>
                </Grid>
                <Grid className="sign-footer">
                  <Grid className="modal-link">
                    <span>Back to signin in</span>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Fade>
    </Modal>
  );
};

AdminResetModal.propTypes = {
  onHide: PropTypes.string,
};

export default AdminResetModal;
