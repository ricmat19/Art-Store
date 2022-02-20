import React, { FC } from "react";
import MainNav from "../components/users/mainNav";
import PagesNav from "../components/users/pagesNav";
import FooterC from "../components/footer";
import { Grid } from "@mui/material";

const HelpC: FC = () => {

  return (
    <div>
      <MainNav />
      <PagesNav cartQty={cartQty} />
      <Grid>
        <Grid>Help</Grid>
        <Grid></Grid>
      </Grid>
      <FooterC />
    </div>
  );
};

export default HelpC;