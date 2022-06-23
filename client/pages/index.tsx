import IndexAPI from "../apis/indexAPI";
import MainNav from "../components/users/mainNav";
import PagesNav from "../components/users/pagesNav";
import Footer from "../components/footer";
import { Grid } from "@mui/material";

// Home prop interface
interface IHome {
  cartQty: number;
}

//Home functional component
const Home = (props: IHome) => {

  // Home component
  return (
    <Grid>
      {/* Main navigation component */}
      <MainNav cartQty={props.cartQty} />
      {/* Pages navigation component */}
      <PagesNav />
      {/* Home content */}
      <Grid></Grid>
      {/* Footer component */}
      <Footer />
    </Grid>
  );
};

export async function getStaticProps() {
  // Get cart content
  const cartResponse = await IndexAPI.get(`/cart`);

  //Provide the cart quantity as a prop to the home component
  return {
    props: {
      cartQty: cartResponse.data.data.cart.length,
    },
    revalidate: 1,
  };
}

export default Home;
