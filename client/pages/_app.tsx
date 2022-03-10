import type { AppProps } from "next/app";
import DisclaimerC from "../components/users/disclaimerModal";
("../components/modals/disclaimer");
import "../public/css/index.css";
import { Grid } from "@mui/material";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Grid>
      <DisclaimerC />
      <Component {...pageProps} />
    </Grid>
  );
}

export default MyApp;
