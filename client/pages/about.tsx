/* eslint-disable @next/next/no-img-element */
import IndexAPI from "../apis/indexAPI";
import MainNav from "../components/users/mainNav";
import PagesNav from "../components/users/pagesNav";
import Footer from "../components/footer";
import Head from "next/head";
import { Grid } from "@mui/material";
import ReactHtmlParser from "react-html-parser";

// About prop interface
interface IAbout {
  cartQty: number | null | undefined;
  aboutContent: string;
}

//About functional component
const About = (props: IAbout) => {
  // About component
  return (
    <Grid>
      <Head>
        <title>artHouse19-About</title>
        <meta
          name="description"
          content="About the artHouse19 and its creator."
        ></meta>
      </Head>
      {/* Main navigation component */}
      <MainNav cartQty={props.cartQty} />
      {/* Pages navigation component */}
      <PagesNav />
      <Grid className="main-body">
        <Grid>
          <Grid className="align-center">
            <h1 className="main-title">about</h1>
          </Grid>
          <Grid className="profile-info">
            <Grid className="profile-image-div">
              {/* About profile image */}
              <Grid className="justify-center">
                <img
                  className="big-image"
                  src="images/smiles.jpg"
                  alt="profile"
                />
              </Grid>
            </Grid>
            {/* About bio */}
            <Grid className="about-info">
              {ReactHtmlParser(props.aboutContent)}
            </Grid>
          </Grid>
          <Footer />
        </Grid>
      </Grid>
    </Grid>
  );
};

export async function getStaticProps() {
  // Get cart content
  const cartResponse = await IndexAPI.get(`/cart`);

  // Get about content
  const aboutResponse = await IndexAPI.get(`/about`);

  // Provide cart quantity and about content as a props to the about component
  return {
    props: {
      cartQty: cartResponse.data.data.cart.length,
      aboutContent: aboutResponse.data.data.about[0].content,
    },
    revalidate: 1,
  };
}

export default About;
