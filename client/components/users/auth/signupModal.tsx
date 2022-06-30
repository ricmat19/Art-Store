import IndexAPI from "../../../apis/indexAPI";
import { Backdrop, Box, Fade, Modal, Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

//Signup prop interface
interface ISignUp {
  handleSignUpClose: () => void;
  handleSignInOpen: () => void;
  signUpOpen: boolean;
}
interface ISignUpValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordCopy: string;
}

//Signup Formik form initial values
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordCopy: "",
};

//Signup Formik form onSubmit function
const onSubmit = async (
  values: ISignUpValues,
  onSubmitProps: { resetForm: () => void }
) => {
  await IndexAPI.post("/signup", {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    password: values.password,
    passwordCopy: values.passwordCopy,
  });
  // setError(signup.data.data.error);
  onSubmitProps.resetForm();
};

//Signup Formik form validation schema
const validationSchema = Yup.object({
  firstName: Yup.string().required("Email is required"),
  lastName: Yup.string().required("Email is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Email is required"),
  passwordCopy: Yup.string().required("Email is required"),
});

//Signup functional component
const SignUp = (props: ISignUp) => {
  //Close signup modal and display sign in modal
  const displaySignIn = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      props.handleSignUpClose();
      props.handleSignInOpen();
    } catch (err) {
      console.log(err);
    }
  };

  //Signup modal
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
              }}
            >
              <Grid
                sx={{
                  width: "100%",
                  display: "grid",
                  alignSelf: "flex-start",
                }}
              >
                <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={validationSchema}
                  validateOnChange={false}
                  validateOnBlur={false}
                  validateOnMount
                >
                  {/* Signup Form */}
                  <Form>
                    <Grid className="sign-content">
                      <h1 className="sign-header">Create Account</h1>
                      <Grid className="grid">
                        <Grid className="two-column-div">
                          {/* Signup first name input */}
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
                          {/* Signup last name input */}
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
                        {/* Signup email input */}
                        <Grid className="modal-input-div">
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
                        {/* Signup password input */}
                        <Grid className="modal-input-div">
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
                        {/* Signup re-typed password input */}
                        <Grid className="modal-input-div">
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
                      {/* <Grid sx={{ textAlign: "center" }}>
                        <label>{error}</label>
                      </Grid> */}
                      {/* Submit signup form (create account) */}
                      <Grid sx={{ textAlign: "center" }}>
                        <button type="submit" className="btn form-button">
                          Create Account
                        </button>
                      </Grid>
                      {/* Go to sign in modal */}
                      <Grid
                        sx={{ textAlign: "center" }}
                        className="sign-footer"
                      >
                        <Grid className="modal-link pointer">
                          <span onClick={displaySignIn}>
                            Already have an account? Sign In
                          </span>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Form>
                </Formik>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </Grid>
  );
};

export default SignUp;
