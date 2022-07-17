// import PropTypes from "prop-types";
import IndexAPI from "../../../apis/indexAPI";
import { Modal, Fade, Box, Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

//Admin signUp prop interface
interface IModalState {
  open: boolean;
  handleClose: () => void;
}
interface ISignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordCopy: string;
}

//Admin signUp Formik form initial values
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordCopy: "",
};

//Admin signUp Formik form onSubmit function
const onSubmit = async (
  values: ISignUpForm,
  onSubmitProps: { resetForm: () => void }
) => {
  await IndexAPI.post("/signup", {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    password: values.password,
    passwordCopy: values.passwordCopy,
  });
  onSubmitProps.resetForm();
};

// //Admin signUp Formik form validation schema
// const validationSchema = Yup.object({
//   firstName: Yup.string()
//     .email("Invalid email format")
//     .required("Email is required"),
//   lastName: Yup.string().required("Email is required"),
//   email: Yup.string().required("Email is required"),
//   password: Yup.string().required("Email is required"),
//   resetPassword: Yup.string().required("Email is required"),
// });

//Admin signUp functional component
const AdminSignUpModal = (props: IModalState) => {
  // async (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   try {
  //     console.log("reset");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  //Admin signUp modal
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
            // validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            validateOnMount
          >
            {/* Admin signUp Form */}
            <Form>
              <Grid className="sign-content">
                <h1 className="sign-header">Create Account</h1>
                <Grid className="sign-input">
                  <Grid className="name-input-div">
                    {/* Admin signUp first name input */}
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
                    {/* Admin signUp lastName input */}
                    <Grid sx={{ display: "grid" }}>
                      <Field
                        as="input"
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                      />
                      <ErrorMessage name="lastName" component="div">
                        {(errorMsg) => (
                          <Grid className="errorMsg">{errorMsg}</Grid>
                        )}
                      </ErrorMessage>
                    </Grid>
                  </Grid>
                  {/* Admin signUp email input */}
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
                  {/* Admin signUp password input */}
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
                  {/* Admin signUp re-type password input */}
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
                {/* Admin submit signUp */}
                <Grid>
                  <button type="submit" className="btn form-button">
                    Create Account
                  </button>
                </Grid>
                {/* Go to admin sign in modal */}
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

// AdminSignUpModal.propTypes = {
//   onHide: PropTypes.string,
// };

export default AdminSignUpModal;
