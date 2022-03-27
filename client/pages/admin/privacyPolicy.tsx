import IndexAPI from "../../apis/indexAPI";
import MainNav from "../../components/users/mainNav";
import PagesNav from "../../components/users/pagesNav";
import FooterC from "../../components/footer";
import { Grid } from "@mui/material";

const PrivacyPolicy = (props: any) => {
  return (
    <Grid>
      <MainNav cartQty={props.cartQty} />
      <PagesNav />
      <Grid>
        <Grid>
          <h1 className="main-title">privacy policy</h1>
        </Grid>
        <Grid></Grid>
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

export default PrivacyPolicy;
