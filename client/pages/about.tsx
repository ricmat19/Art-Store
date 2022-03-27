/* eslint-disable @next/next/no-img-element */
import IndexAPI from "../apis/indexAPI";
import MainNav from "../components/users/mainNav";
import PagesNav from "../components/users/pagesNav";
import FooterC from "../components/footer";
import Head from "next/head";
import { Grid } from "@mui/material";

const About = (props: any) => {
  return (
    <Grid>
      <Head>
        <title>artHouse19-About</title>
        <meta
          name="description"
          content="About the artHouse19 and its creator."
        ></meta>
      </Head>
      <MainNav cartQty={props.cartQty} />
      <PagesNav />
      <Grid className="main-body">
        <Grid>
          <Grid className="align-center">
            <h1 className="main-title">about</h1>
          </Grid>
          <Grid className="profile-info">
            <Grid className="profile-image-div">
              <Grid className="justify-center">
                <img
                  className="big-image"
                  src="images/smiles.jpg"
                  alt="profile"
                />
              </Grid>
            </Grid>
            <Grid className="about-info">
              <h3>&emsp; &emsp; {process.env.NEXT_PUBLIC_INFO_PARAGRAPH_1}</h3>
              <h3>&emsp; &emsp; {process.env.NEXT_PUBLIC_INFO_PARAGRAPH_2}</h3>
            </Grid>
          </Grid>
          <FooterC />
        </Grid>
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

export default About;
