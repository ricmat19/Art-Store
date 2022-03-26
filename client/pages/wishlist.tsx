import IndexAPI from "../apis/indexAPI";
import { useState } from "react";
import MainNav from "../components/users/mainNav";
import PagesNav from "../components/users/pagesNav";
import FooterC from "../components/footer";
import { Grid } from "@mui/material";
import { IWishlist } from "../interfaces";
import Head from "next/head";

const Wishlist = (props: any) => {
  const [wishlist] = useState<IWishlist[]>([]);

  return (
    <Grid>
      <Head>
        <title>artHouse19-Wishlist</title>
        <meta name="description" content="Your wishlist."></meta>
      </Head>
      <MainNav cartQty={props.cartQty} />
      <PagesNav />
      <Grid>
        <Grid>
          <h1 className="main-title">wishlist</h1>
        </Grid>
        <Grid sx={{ display: "grid", justifyContent: "center" }}>
          <button>create wishlist</button>
        </Grid>
        <Grid>{wishlist}</Grid>
      </Grid>
      <FooterC />
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

export default Wishlist;
