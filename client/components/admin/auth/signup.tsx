import PropTypes from "prop-types";
import IndexAPI from "../../../apis/indexAPI";
import { Modal, Fade, Box, Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface IModalState {
  open: boolean;
  handleClose: () => void;
}

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  resetPassword: "",
};
const onSubmit = (values: any, onSubmitProps: any) => {
  IndexAPI.post("/signup", {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    password: values.password,
    passwordCopy: values.passwordCopy,
  });
  onSubmitProps.resetForm();
};
const validationSchema = Yup.object({
  firstName: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  lastName: Yup.string().required("Email is required"),
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Email is required"),
  resetPassword: Yup.string().required("Email is required"),
});

const AdminSignUpModal = (props: IModalState) => {
  async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      console.log("reset");
    } catch (err) {
      console.log(err);
    }
  };

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
                <h1 className="sign-header">Create Account</h1>
                <Grid className="sign-input">
                  <Grid className="name-input-div">
                    <Grid sx={{ display: "grid" }}>
                      <Field
                        as="input"
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                      />
                      <ErrorMessage name="firstName" component="div">
                        {(errorMsg) => (
                          <Grid className="errorMsg">{errorMsg}</Grid>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid sx={{ display: "grid" }}>
                      <Field
                        as="input"
                        type="text"
                        name="lastname"
                        placeholder="Last Name"
                      />
                      <ErrorMessage name="lastname" component="div">
                        {(errorMsg) => (
                          <Grid className="errorMsg">{errorMsg}</Grid>
                        )}
                      </ErrorMessage>
                    </Grid>
                  </Grid>
                  <Grid className="modal-input-div">
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
                  <Grid className="modal-input-div">
                    <Grid sx={{ display: "grid" }}>
                      <Field
                        as="input"
                        type="password"
                        name="password"
                        placeholder="Create Password"
                      />
                      <ErrorMessage name="password" component="div">
                        {(errorMsg) => (
                          <Grid className="errorMsg">{errorMsg}</Grid>
                        )}
                      </ErrorMessage>
                    </Grid>
                  </Grid>
                  <Grid className="modal-input-div">
                    <Grid sx={{ display: "grid" }}>
                      <Field
                        as="input"
                        type="password"
                        name="re-password"
                        placeholder="Re-type Password"
                      />
                      <ErrorMessage name="re-password" component="div">
                        {(errorMsg) => (
                          <Grid className="errorMsg">{errorMsg}</Grid>
                        )}
                      </ErrorMessage>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid>
                  <button type="submit" className="btn form-button">
                    Create Account
                  </button>
                </Grid>
                <Grid className="sign-footer">
                  <Grid className="modal-link">
                    <span>Already have an account? Sign In</span>
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

AdminSignUpModal.propTypes = {
  onHide: PropTypes.string,
};

export default AdminSignUpModal;
