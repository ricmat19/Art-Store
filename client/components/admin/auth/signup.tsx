import { useState } from "react";
import PropTypes from "prop-types";
import IndexAPI from "../../../apis/indexAPI";
import { Modal, Fade, Box, Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface IModalState {
  open: boolean;
  handleClose: () => void;
  email: string;
  password: string;
  passwordCopy: string;
  firstName: string;
  lastName: string;
}

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  resetPassword: "",
};
const onSubmit = (onSubmitProps: any) => {
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
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCopy, setPasswordCopy] = useState<string>("");

  const handleSignup = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await IndexAPI.post("/signup", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        passwordCopy: passwordCopy,
      });
    } catch (err) {
      console.log(err);
    }
  };

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
            {(formik) => {
              <Form>
                <Grid className="sign-content">
                  <h1 className="sign-header">Create Account</h1>
                  <Grid className="sign-input">
                    <Grid className="name-input-div">
                      <Field
                        type="text"
                        value={props.firstName}
                        name="firstName"
                        placeholder="First Name"
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                      />
                      <ErrorMessage name="email" component="div">
                        {(errorMsg) => (
                          <Grid className="errorMsg">{errorMsg}</Grid>
                        )}
                      </ErrorMessage>
                      <Field
                        type="text"
                        value={props.lastName}
                        name="lastname"
                        placeholder="Last Name"
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                      />
                      <ErrorMessage name="email" component="div">
                        {(errorMsg) => (
                          <Grid className="errorMsg">{errorMsg}</Grid>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid className="modal-input-div">
                      <Field
                        type="email"
                        value={props.email}
                        name="email"
                        placeholder="Email"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                      <ErrorMessage name="email" component="div">
                        {(errorMsg) => (
                          <Grid className="errorMsg">{errorMsg}</Grid>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid className="modal-input-div">
                      <Field
                        type="password"
                        value={props.password}
                        name="password"
                        placeholder="Create Password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                      <ErrorMessage name="email" component="div">
                        {(errorMsg) => (
                          <Grid className="errorMsg">{errorMsg}</Grid>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid className="modal-input-div">
                      <Field
                        type="password"
                        value={props.passwordCopy}
                        name="re-password"
                        placeholder="Re-type Password"
                        onChange={(e) => {
                          setPasswordCopy(e.target.value);
                        }}
                      />
                      <ErrorMessage name="email" component="div">
                        {(errorMsg) => (
                          <Grid className="errorMsg">{errorMsg}</Grid>
                        )}
                      </ErrorMessage>
                    </Grid>
                  </Grid>
                  <Grid>
                    <button
                      onClick={handleSignup}
                      type="submit"
                      className="btn form-button"
                      disabled={!formik.isValid}
                    >
                      Create Account
                    </button>
                  </Grid>
                  <Grid className="sign-footer">
                    <Grid className="modal-link">
                      <span>Already have an account? Sign In</span>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>;
            }}
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
