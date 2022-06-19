import { MouseEvent, useState } from "react";
import { Modal, Fade, Box, Grid } from "@mui/material";
import { Formik, Form } from "formik";

//Disclaimer modal prop interface
interface IModalState {
  open: boolean;
  handleClose: () => void;
  email: string;
  password: string;
}

//Disclaimer Formik form initial values
const initialValues = {};

//Disclaimer modal Formik form onSubmit function
const onSubmit = () => {
  console.log("");
};

//Disclaimer modal functional component
const DisclaimerModal = (props: IModalState) => {
  //Disclaimer modal states
  const [disclaimerModal, setDisclaimerModal] = useState("modal-bg active");

  //Function to close disclaimer
  const closeDisclaimer = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setDisclaimerModal("modal-bg");
  };

  //Disclaimer modal
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
            validateOnChange={false}
            validateOnBlur={false}
            validateOnMount
          >
            {/* Disclaimer form */}
            <Form>
              <Grid className={disclaimerModal}>
                <Grid className="disclaimer-content modal-content">
                  <h1 className="header">
                    welcome to{" "}
                    <span className="logo">
                      <span className="logo-first">a</span>rt
                      <span className="logo-first">H</span>ouse
                      <span className="logo-first">19</span>
                    </span>
                  </h1>
                  <Grid>
                    &quot;
                    <span>artHouse19</span>
                    &quot; is a full-stack E-commerce application built using
                    React.js, Node/Express, PostgreSQL, and an AWS S3 Bucket for
                    image storage. This application is strictly for
                    demonstrative purposes.
                    <hr className="disclaimer-hr" />
                    By clicking the button below, you are accepting that no real
                    purchases will be made, no payments will be processed, and
                    no personal information, such as: names, addresses, and
                    credit card information will be used.
                  </Grid>
                  <Grid>
                    {/* Disclaimer close button */}
                    <button onClick={(e) => closeDisclaimer(e)}>
                      i accept
                    </button>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DisclaimerModal;
