import IndexAPI from "../apis/indexAPI";
import { useState } from "react";
import MainNav from "../components/users/mainNav";
import PagesNav from "../components/users/pagesNav";
import FooterC from "../components/footer";
import { Grid } from "@mui/material";
import { ICollection } from "../interfaces";
import Head from "next/head";

const Collection = (props: any) => {
  const [collections] = useState<ICollection[]>([]);

  return (
    <Grid>
      <Head>
        <title>artHouse19-Collection</title>
        <meta name="description" content="Your collection."></meta>
      </Head>
      <MainNav cartQty={props.cartQty} />
      <PagesNav />
      <Grid>
        <Grid>
          <h1 className="main-title">collection</h1>
        </Grid>
        <Grid sx={{ display: "grid", justifyContent: "center" }}>
          <button>create collection</button>
        </Grid>
        <Grid>{collections}</Grid>
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

export default Collection;
