import { useState } from "react";
import IndexAPI from "../../../apis/indexAPI";
import { Backdrop, Box, Fade, Modal, Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  email: "",
};
const onSubmit = (onSubmitProps: any) => {
  onSubmitProps.resetForm();
};
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const SignIn = (props: any) => {
  const [loginMessage, setLoginMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const loginStatus = await IndexAPI.post("/signin", {
        email: email,
        password: password,
      });
      setLoginMessage(loginStatus.data.data.message);
      props.setLoginStatus(loginStatus.data.data.loginStatus);
    } catch (err) {
      console.log(err);
    }
  };

  const displaySignUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      props.handleSignInClose();
      props.handleSignUpOpen();
    } catch (err) {
      console.log(err);
    }
  };

  const displayReset = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      props.handleSignInClose();
      props.handleResetOpen();
    } catch (err) {
      console.log(err);
    }
  };

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
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validateOnMount
                      >
                        {(formik) => {
                          return (
                            <Form>
                              <Grid className="sign-content">
                                <h1 className="sign-header">welcome</h1>
                                <Grid className="grid">
                                  <Grid className="modal-input-div">
                                    <Field
                                      type="email"
                                      value={props.email}
                                      name="email"
                                      placeholder="Email"
                                      onChange={(e: any) => {
                                        setEmail(e.target.value);
                                      }}
                                    />
                                    <ErrorMessage name="email" component="div">
                                      {(errorMsg) => (
                                        <Grid className="errorMsg">
                                          {errorMsg}
                                        </Grid>
                                      )}
                                    </ErrorMessage>
                                  </Grid>
                                  <Grid className="modal-input-div">
                                    <Field
                                      type="password"
                                      value={props.password}
                                      name="password"
                                      placeholder="Create Password"
                                      onChange={(e: any) => {
                                        setPassword(e.target.value);
                                      }}
                                    />
                                    <ErrorMessage name="email" component="div">
                                      {(errorMsg) => (
                                        <Grid className="errorMsg">
                                          {errorMsg}
                                        </Grid>
                                      )}
                                    </ErrorMessage>
                                  </Grid>
                                </Grid>
                                <Grid>
                                  <label>{loginMessage}</label>
                                </Grid>
                                <Grid sx={{ textAlign: "center" }}>
                                  <button
                                    onClick={handleSignin}
                                    disabled={!formik.isValid}
                                  >
                                    sign in
                                  </button>
                                </Grid>
                                <Grid className="sign-footer two-column-div">
                                  <Grid
                                    className="modal-link align-right pointer"
                                    onClick={displayReset}
                                  >
                                    <span>forgot password?</span>
                                  </Grid>
                                  <Grid
                                    className="modal-link align-left pointer"
                                    onClick={displaySignUp}
                                  >
                                    <span>create account</span>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Form>
                          );
                        }}
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
