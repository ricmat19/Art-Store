import React, { FC } from "react";
import MainNav from "../components/users/mainNav";
import PagesNav from "../components/users/pagesNav";
import FooterC from "../components/footer";
import { Grid } from "@mui/material";

const PrivacyPolicyC: FC = () => {

  return (
    <div>
      <MainNav />
      <PagesNav cartQty={cartQty} />
      <Grid>
        <Grid>Privacy Policy</Grid>
        <Grid></Grid>
      </Grid>
      <FooterC />
    </div>
  );
};

export default PrivacyPolicyC;