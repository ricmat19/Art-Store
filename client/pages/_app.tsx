import type { AppProps } from "next/app";
import DisclaimerC from "../components/users/disclaimer";
("../components/modals/disclaimer");
import "../public/css/index.css";
import { Grid } from "@mui/material";
import { store } from "../store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Grid>
        <DisclaimerC />
        <Component {...pageProps} />
      </Grid>
    </Provider>
  );
}

export default MyApp;
