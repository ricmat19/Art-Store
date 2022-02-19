import React, { FC } from "react";
import AccountHeaderC from "../components/users/navMenus/searchNav";
import MenuHeaderC from "../components/users/navMenus/pagesNav";
import FooterC from "../components/users/footer";
import { Grid } from "@mui/material";

const PrivacyPolicyC: FC = () => {

  return (
    <div>
      <AccountHeaderC />
      <MenuHeaderC />
      <Grid>
        <Grid>Privacy Policy</Grid>
        <Grid></Grid>
      </Grid>
      <FooterC />
    </div>
  );
};

export default PrivacyPolicyC;