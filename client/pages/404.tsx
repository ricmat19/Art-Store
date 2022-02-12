import HeaderC from "../components/header";
import FooterC from "../components/footer";
import Head from "next/head";

const PageNotFoundC = () => {
  return (
    <div>
      <Head>
        <title>artHouse19-404</title>
      </Head>
      <HeaderC />
      <div className="main-body">
        <h1>Page Not Found (404)</h1>
        <FooterC />
      </div>
    </div>
  );
};

export default PageNotFoundC;
