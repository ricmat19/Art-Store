import type { AppProps } from "next/app";
import Disclaimer from "../components/users/disclaimerModal";
import "../public/css/index.css";
import { Grid } from "@mui/material";
import { store } from "../store";
import { Provider } from "react-redux";

// Root component
function MyApp({ Component, pageProps }: AppProps) {
  return (
    // Provider for Redux
    <Provider store={store}>
      <Grid>
        {/* Disclaimer modal component */}
        {/* <Disclaimer open={false} handleClose={function (): void {
           throw new Error("Function not implemented.");
         }} email={""} password={""} /> */}
        {/* Component for all pages */}
        <Component {...pageProps} />
      </Grid>
    </Provider>
  );
}

export default MyApp;
