import IndexAPI from "../../../apis/indexAPI";
// import PropTypes from "prop-types";
import { Modal, Fade, Box, Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

//Admin reset prop interface
interface IModalState {
  open: boolean;
  handleClose: () => void;
  email: string;
  password: string;
}
interface IResetForm {
  email: string;
}

//Admin reset Formik form initial values
const initialValues = {
  email: "",
};

//Admin reset Formik form onSubmit function
const onSubmit = async (values: IResetForm, onSubmitProps: { resetForm: () => void; }) => {
  await IndexAPI.post("/reset", {
    email: values.email,
  });
  onSubmitProps.resetForm();
};

//Admin reset Formik form validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

//Admin reset functional component
const AdminResetModal = (props: IModalState) => {
  //Admin reset modal
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
            {/* Admin reset Form */}
            <Form>
              <Grid className="sign-content">
                <h1 className="sign-header">Reset Password</h1>
                <Grid className="sign-input">
                  <Grid className="forgot-input-div">
                    {/* Admin reset email input */}
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
                {/* Admin submit reset */}
                <Grid>
                  <button type="submit">Send Reset Link</button>
                </Grid>
                {/* Go to admin sign in modal */}
                <Grid className="sign-footer">
                  <Grid className="modal-link">
                    <span>Back to sign in</span>
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

// AdminResetModal.propTypes = {
//   onHide: PropTypes.string,
// };

export default AdminResetModal;
