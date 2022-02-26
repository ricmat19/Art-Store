import IndexAPI from "../apis/indexAPI";
import MainNav from "../components/users/mainNav";
import PagesNav from "../components/users/pagesNav";
import FooterC from "../components/footer";
import { Grid } from "@mui/material";

const HelpC = (props: any) => {
  return (
    <div>
      <MainNav cartQty={props.cartQty} />
      <PagesNav />
      <Grid>
        <Grid>Help</Grid>
        <Grid></Grid>
      </Grid>
      <FooterC />
    </div>
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

export default HelpC;
