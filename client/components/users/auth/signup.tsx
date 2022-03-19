import { useState } from "react";
import IndexAPI from "../../../apis/indexAPI";
import { Backdrop, Box, Fade, Modal, Grid } from "@mui/material";

const SignUp = (props: any) => {
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
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </Grid>

    // <Grid>
    //   <Grid>
    //     <Grid id="contained-modal-title-vcenter"></Grid>
    //   </Grid>
    //   <Grid>

    //   </Grid>
    //   <Grid>
    //     <Button onClick={props.onHide}>Close</Button>
    //   </Grid>
    // </Grid>
  );
};

export default SignUp;
