import React, { useState } from "react";

const DisclaimerC = () => {
  const [disclaimerModal, setDisclaimerModal] = useState("modal-bg active");

  const closeDisclaimer = (e: any) => {
    e.preventDefault();
    setDisclaimerModal("modal-bg");
  };

  return (
    <div>
      {/* Disclaimer Modal */}
      <div className={disclaimerModal}>
        <form>
          <div className="disclaimer-content modal-content">
            <h1 className="header">
              welcome to{" "}
              <span className="logo">
                <span className="logo-first">a</span>rt
                <span className="logo-first">H</span>ouse
                <span className="logo-first">19</span>
              </span>
            </h1>
            <div>
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
            </div>
            <div>
              <button onClick={(e) => closeDisclaimer(e)}>i accept</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DisclaimerC;
