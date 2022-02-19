import type { AppProps } from "next/app";
import DisclaimerC from "../components/disclaimer";
("../components/modals/disclaimer");
import "../public/css/index.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <DisclaimerC />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
