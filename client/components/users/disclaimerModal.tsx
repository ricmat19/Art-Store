import { FC, useState } from "react";
import { Grid } from '@mui/material';

const DisclaimerModal: FC = () => {
  const [disclaimerModal, setDisclaimerModal] = useState("modal-bg active");

  const closeDisclaimer = (e: any) => {
    e.preventDefault();
    setDisclaimerModal("modal-bg");
  };

  return (
    <Grid>
      {/* Disclaimer Modal */}
      <Grid className={disclaimerModal}>
        <form>
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
              React.js, Node/Express, PostgreSQL, and an AWS S3 Bucket for image
              storage. This application is strictly for demonstrative purposes.
              <hr className="disclaimer-hr" />
              By clicking the button below, you are accepting that no real
              purchases will be made, no payments will be processed, and no
              personal information, such as: names, addresses, and credit card
              information will be used.
            </Grid>
            <Grid>
              <button onClick={(e) => closeDisclaimer(e)}>i accept</button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default DisclaimerModal;
