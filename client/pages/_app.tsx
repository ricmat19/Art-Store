import type { AppProps } from "next/app";
import Disclaimer from "../components/users/disclaimerModal";
("../components/modals/disclaimer");
import "../public/css/index.css";
import { Grid } from "@mui/material";
import { store } from "../store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Grid>
        <Disclaimer open={false} handleClose={function (): void {
          throw new Error("Function not implemented.");
        } } email={""} password={""} />
        <Component {...pageProps} />
      </Grid>
    </Provider>
  );
}

export default MyApp;
