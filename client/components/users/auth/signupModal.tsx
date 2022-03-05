import { useState } from "react";
import PropTypes from "prop-types";
import IndexAPI from "../../../apis/indexAPI";
import { Grid, Button } from "@mui/material";

interface IModalState {
  show: boolean;
  onHide: () => void;
  email: string;
  password: string;
  passwordCopy: string;
  firstName: string;
  lastName: string;
}

const SignUpModal = (props: IModalState) => {
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
    <Grid>
      <Grid>
        <Grid id="contained-modal-title-vcenter"></Grid>
      </Grid>
      <Grid>
        <form>
          <Grid className="sign-content">
            <h1 className="sign-header">Create Account</h1>
            <Grid className="sign-input">
              <Grid className="name-input-div">
                <input
                  type="text"
                  value={props.firstName}
                  name="firstName"
                  placeholder="First Name"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <input
                  type="text"
                  value={props.lastName}
                  name="lastname"
                  placeholder="Last Name"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </Grid>
              <Grid className="modal-input-div">
                <input
                  type="email"
                  value={props.email}
                  name="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Grid>
              <Grid className="modal-input-div">
                <input
                  type="password"
                  value={props.password}
                  name="password"
                  placeholder="Create Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Grid>
              <Grid className="modal-input-div">
                <input
                  type="password"
                  value={props.passwordCopy}
                  name="re-password"
                  placeholder="Re-type Password"
                  onChange={(e) => {
                    setPasswordCopy(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Grid>
              <button
                onClick={handleSignup}
                type="submit"
                className="btn form-button"
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
        </form>
      </Grid>
      <Grid>
        <Button onClick={props.onHide}>Close</Button>
      </Grid>
    </Grid>
  );
};

SignUpModal.propTypes = {
  onHide: PropTypes.string,
};

export default SignUpModal;
