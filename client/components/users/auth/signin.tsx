import { useState } from "react";
// import PropTypes from "prop-types";
// import SignUpModalC from "./signup";
// import ResetPasswordModalC from "./reset";
import IndexAPI from "../../../apis/indexAPI";
import { Backdrop, Box, Fade, Modal, Grid } from "@mui/material";

const SignIn = (props: any) => {
  // const [displayReset, setDisplayReset] = useState<boolean>(false);
  // const [displaySignup, setDisplaySignup] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const [firstName] = useState<string>("");
  // const [lastName] = useState<string>("");
  // const [passwordCopy] = useState<string>("");

  const handleSignin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await IndexAPI.post("/signin", {
        email: email,
        password: password,
      });
    } catch (err) {
      console.log(err);
    }
  };

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
                minHeight: "500px",
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
                  {/* signup */}
                  {/* <SignUpModalC
                  show={displaySignup}
                  onHide={() => setDisplaySignup(false)}
                  firstName={firstName}
                  lastName={lastName}
                  email={email}
                  password={password}
                  passwordCopy={passwordCopy}
                  /> */}

                  {/* reset */}
                  {/* <ResetPasswordModalC
                  show={displayReset}
                  onHide={() => setDisplayReset(false)}
                   /> */}

                  <Grid>
                    <Grid>
                      <Grid id="contained-modal-title-vcenter"></Grid>
                    </Grid>
                    <Grid>
                      <form>
                        <Grid className="sign-content">
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
                            <button onClick={handleSignin}>sign in</button>
                          </Grid>
                          <Grid className="sign-footer">
                            <Grid
                              className="modal-link"
                              onClick={() => props.setDisplayReset(true)}
                            >
                              <span>forgot password?</span>
                            </Grid>
                            <Grid
                              className="modal-link"
                              onClick={() => props.setDisplaySignup(true)}
                            >
                              <span>create account</span>
                            </Grid>
                          </Grid>
                        </Grid>
                      </form>
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
