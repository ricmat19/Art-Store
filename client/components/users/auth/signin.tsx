import { useState } from "react";
import IndexAPI from "../../../apis/indexAPI";
import { Backdrop, Box, Fade, Modal, Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

//Signin prop interface
interface ISignIn {
  handleSignInClose:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
  handleSignUpOpen: () => void;
  handleResetOpen: () => void;
  signInOpen: boolean | undefined;
}
interface ISignInForm {
  email: string;
  password: string;
}

//Signin Formik form initial values
const initialValues = {
  email: "",
  password: "",
};

//Signin Formik form onSubmit function
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

//Signin Formik form validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

//Sigin functional component
const SignIn = (props: ISignIn) => {
  const [loginMessage] = useState<string>("");

  //Close signin modal and display signup modal
  const displaySignUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      props.handleSignInClose();
      props.handleSignUpOpen();
    } catch (err) {
      console.log(err);
    }
  };

  //Close signin modal and display reset modal
  const displayReset = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      props.handleSignInClose();
      props.handleResetOpen();
    } catch (err) {
      console.log(err);
    }
  };

  //Sigin modal
  return (
    <Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.signInOpen}
        onClose={props.handleSignInClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.signInOpen}>
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
                <Grid>
                  <Grid>
                    <Grid>
                      <Grid id="contained-modal-title-vcenter"></Grid>
                    </Grid>
                    <Grid>
                      <Formik
                        initialValues={{
                          initialValues: initialValues,
                        }}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validateOnMount
                      >
                        {/* Signin Form */}
                        <Form>
                          <Grid className="sign-content">
                            <h1 className="sign-header">welcome</h1>
                            <Grid className="grid">
                              {/* Signin email input */}
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
                              {/* Signin password input */}
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
                            </Grid>
                            <Grid>
                              <label>{loginMessage}</label>
                            </Grid>
                            {/* Submit sigin */}
                            <Grid sx={{ textAlign: "center" }}>
                              <button type="submit">sign in</button>
                            </Grid>
                            <Grid className="sign-footer two-column-div">
                              {/* Go to reset modal */}
                              <Grid
                                className="modal-link align-right pointer"
                                onClick={displayReset}
                              >
                                <span>forgot password?</span>
                              </Grid>
                              {/* Go to sigup modal */}
                              <Grid
                                className="modal-link align-left pointer"
                                onClick={displaySignUp}
                              >
                                <span>create account</span>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Form>
                      </Formik>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </Grid>
  );
};

export default SignIn;
