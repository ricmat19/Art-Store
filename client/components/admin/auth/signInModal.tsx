import { useState } from "react";
// import PropTypes from "prop-types";
import AdminSignUpModalC from "./signUpModal";
import AdminResetModalC from "./resetModal";
import IndexAPI from "../../../apis/indexAPI";
import { Modal, Fade, Box, Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

//Admin SignIn prop interface
interface IModalState {
  open: boolean;
  handleClose: () => void;
  email: string;
  password: string;
}
interface ISignInForm {
  email: string;
  password: string;
}

//SignIn Formik form initial values
const initialValues = {
  email: "",
  password: "",
};

//Admin signIn Formik form onSubmit function
const onSubmit = (
  values: ISignInForm,
  onSubmitProps: { resetForm: () => void }
) => {
  IndexAPI.post("/signin", {
    email: values.email,
    password: values.password,
  });
  onSubmitProps.resetForm();
};

//Admin signIn Formik form validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

//Admin signIn functional component
const AdminSignInModal = (props: IModalState) => {
  //Admin signIn states
  const [displayReset, setDisplayReset] = useState<boolean>(false);
  const [displaySignUp, setDisplaySignUp] = useState<boolean>(false);

  //Admin signIn modal
  return (
    <Grid>
      {/* Admin signUp modal component */}
      <AdminSignUpModalC
        open={displaySignUp}
        handleClose={() => setDisplaySignUp(false)}
      />

      {/* Admin reset modal component */}
      <AdminResetModalC
        open={displayReset}
        handleClose={() => setDisplayReset(false)}
        email={props.email}
        password={props.password}
      />
      {/* Admin signIn modal */}
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
              {/* Admin signIn Form */}
              <Form>
                <Grid className="sign-content">
                  <h1 className="sign-header">welcome</h1>
                  <Grid>
                    <Grid className="modal-input-div">
                      {/* Admin signIn email input */}
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
                      {/* Admin signIn password input */}
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
                  </Grid>
                  {/* Admin submit signIn */}
                  <Grid>
                    <button type="submit">sign in</button>
                  </Grid>
                  <Grid className="sign-footer">
                    {/* Go to admin reset (forgot password) password modal */}
                    <Grid
                      className="modal-link"
                      onClick={() => setDisplayReset(true)}
                    >
                      <span>forgot password?</span>
                    </Grid>
                    {/* Go to admin signUp modal */}
                    <Grid
                      className="modal-link"
                      onClick={() => setDisplaySignUp(true)}
                    >
                      <span>create account</span>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Box>
        </Fade>
      </Modal>
    </Grid>
  );
};

// AdminSignInModal.propTypes = {
//   onHide: PropTypes.string,
// };

export default AdminSignInModal;
