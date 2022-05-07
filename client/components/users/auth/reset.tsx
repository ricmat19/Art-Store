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

const Reset = (props: any) => {
  const displaySignIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      props.handleResetClose();
      props.handleSignInOpen();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.resetOpen}
        onClose={props.handleResetClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.resetOpen}>
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
                              <h1 className="sign-header">Reset Password</h1>
                              <Grid className="sign-input">
                                <Grid className="forgot-input-div">
                                  <Field
                                    type="text"
                                    name="email"
                                    placeholder="Email"
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
                              <Grid className="align-center">
                                <button
                                  type="submit"
                                  disabled={!formik.isValid}
                                >
                                  Send Reset Link
                                </button>
                              </Grid>
                              <Grid className="sign-footer pointer">
                                <Grid
                                  className="align-center modal-link"
                                  onClick={displaySignIn}
                                >
                                  <span>Back to signin</span>
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
          </Box>
        </Fade>
      </Modal>
    </Grid>
  );
};

export default Reset;
