import IndexAPI from "../../../apis/indexAPI";
import { Backdrop, Box, Fade, Modal, Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface ISignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordCopy: string;
}

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordCopy: "",
};

const onSubmit = (values: ISignUpForm, onSubmitProps: any) => {
  IndexAPI.post("/signup", {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    password: values.password,
    passwordCopy: values.passwordCopy,
  });
  // setError(signup.data.data.error);
  onSubmitProps.resetForm();
};
const validationSchema = Yup.object({
  firstName: Yup.string().required("Email is required"),
  lastName: Yup.string().required("Email is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Email is required"),
  passwordCopy: Yup.string().required("Email is required"),
});

const SignUp = (props: any) => {
  const displaySignIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      props.handleSignUpClose();
      props.handleSignInOpen();
    } catch (err) {
      console.log(err);
    }
  };

  // async (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   try {
  //     console.log("reset");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
                  <Form>
                    <Grid className="sign-content">
                      <h1 className="sign-header">Create Account</h1>
                      <Grid className="grid">
                        <Grid className="two-column-div">
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
                      <Grid sx={{ textAlign: "center" }}>
                        <button type="submit" className="btn form-button">
                          Create Account
                        </button>
                      </Grid>
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
