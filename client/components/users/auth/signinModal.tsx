import { useState } from "react";
import PropTypes from "prop-types";
import SignUpModalC from "./signupModal";
import ResetPasswordModalC from "./resetModal";
import IndexAPI from "../../../apis/indexAPI";
import { Grid } from '@mui/material';

interface IModalState {
  open: boolean,
  onClose: () => void,
  email: string,
  password: string,
}

const SignInModal = (props: IModalState) => {
  const [displayReset, setDisplayReset] = useState<boolean>(false);
  const [displaySignup, setDisplaySignup] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName] = useState<string>("");
  const [lastName] = useState<string>("");
  const [passwordCopy] = useState<string>("");

  const handleSignin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await IndexAPI.post("/signin", {
        email: email,
        password: password,
      })
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid>

       {/* signup */}
       <SignUpModalC 
        show={displaySignup} 
        onHide={() => setDisplaySignup(false)}
        firstName={firstName}
        lastName={lastName}
        email={email}
        password={password}
        passwordCopy={passwordCopy}
      />

      {/* reset */}
      <ResetPasswordModalC 
        show={displayReset} 
        onHide={() => setDisplayReset(false)}
      />
      
      <Grid
        // {...props}
        // size="lg"
        // aria-labelledby="contained-modal-title-vcenter"
        // centered
      >
        <Grid>
          <Grid id="contained-modal-title-vcenter">

          </Grid>
        </Grid>
        <Grid>
        <form>
            <Grid 
            // ref={signinRef} 
            className="sign-content">
              <h1 className="sign-header">welcome</h1>
              <Grid>
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
              </Grid>
              <Grid>
                <button 
                onClick={handleSignin}
                >sign in</button>
              </Grid>
              <Grid className="sign-footer">
                <Grid className="modal-link" onClick={() => setDisplayReset(true)}>
                  <span>forgot password?</span>
                </Grid>
                <Grid className="modal-link" onClick={() => setDisplaySignup(true)}>
                  <span>create account</span>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid>
          {/* <Button onClick={props.onHide}>Close</Button> */}
        </Grid>
      </Grid>
    </Grid>
  );
}

SignInModal.propTypes = {
  onHide: PropTypes.string,
};

export default SignInModal;