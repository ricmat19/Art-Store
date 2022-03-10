import MainNav from "../components/users/mainNav";
import PagesNav from "../components/users/pagesNav";
import FooterC from "../components/footer";
import Head from "next/head";
import IndexAPI from "../apis/indexAPI";
import { Grid } from "@mui/material";

const PageNotFound = (props: any) => {
  return (
    <Grid>
      <Head>
        <title>artHouse19-404</title>
      </Head>
      <MainNav cartQty={props.cartQty} />
      <PagesNav />
      <Grid className="main-body">
        <h1 className="main-title">Page Not Found (404)</h1>
        <FooterC />
      </Grid>
    </Grid>
  );
};

export async function getStaticProps() {
  const cartResponse = await IndexAPI.get(`/cart`);

  return {
    props: {
      cartQty: cartResponse.data.data.cart.length,
    },
    revalidate: 1,
  };
}

export default PageNotFound;
