import MainNav from "../components/users/mainNav";
import PagesNav from "../components/users/pagesNav";
import Footer from "../components/footer";
import Head from "next/head";
import IndexAPI from "../apis/indexAPI";
import { Grid } from "@mui/material";

//404 Page Not Found prop interface
interface IPageNotFound {
  cartQty: number;
}

// 404 Page Not Found functional component
const PageNotFound = (props: IPageNotFound) => {
  return (
    <Grid>
      <Head>
        <title>artHouse86-404</title>
      </Head>
      {/* Main navigation component */}
      <MainNav cartQty={props.cartQty} />
      {/* Pages navigation component */}
      <PagesNav />
      {/* Page Not Found content */}
      <Grid className="main-body">
        <h1 className="main-title">Page Not Found (404)</h1>
        <Footer />
      </Grid>
    </Grid>
  );
};

export async function getStaticProps() {
  // Get cart content
  const cartResponse = await IndexAPI.get(`/cart`);

  // Provide cart quantity as a prop to the page not found component
  return {
    props: {
      cartQty: cartResponse.data.data.cart.length,
    },
    revalidate: 1,
  };
}

export default PageNotFound;
