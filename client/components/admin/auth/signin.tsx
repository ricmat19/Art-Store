import { useState } from "react";
import PropTypes from "prop-types";
import SignUpModalC from "./signup";
import ResetModalC from "./reset";
import IndexAPI from "../../../apis/indexAPI";
import { Modal, Fade, Box, Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface IModalState {
  open: boolean;
  handleClose: () => void;
  email: string;
  password: string;
}

const initialValues = {
  email: "",
  password: "",
};
const onSubmit = (values: any, onSubmitProps: any) => {
  IndexAPI.post("/signin", {
    email: values.email,
    password: values.password,
  });
  onSubmitProps.resetForm();
};
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const AdminSignInModal = (props: IModalState) => {
  const [displayReset, setDisplayReset] = useState<boolean>(false);
  const [displaySignup, setDisplaySignup] = useState<boolean>(false);

  return (
    <Grid>
      {/* signup */}
      <SignUpModalC
        open={displaySignup}
        handleClose={() => setDisplaySignup(false)}
      />

      {/* reset */}
      <ResetModalC
        open={displayReset}
        handleClose={() => setDisplayReset(false)}
        email={props.email}
        password={props.password}
      />

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
                  <h1 className="sign-header">welcome</h1>
                  <Grid>
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
                  </Grid>
                  <Grid>
                    <button type="submit">sign in</button>
                  </Grid>
                  <Grid className="sign-footer">
                    <Grid
                      className="modal-link"
                      onClick={() => setDisplayReset(true)}
                    >
                      <span>forgot password?</span>
                    </Grid>
                    <Grid
                      className="modal-link"
                      onClick={() => setDisplaySignup(true)}
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

AdminSignInModal.propTypes = {
  onHide: PropTypes.string,
};

export default AdminSignInModal;
