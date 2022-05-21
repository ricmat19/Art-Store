import IndexAPI from "../apis/indexAPI";
import MainNav from "../components/users/mainNav";
import PagesNav from "../components/users/pagesNav";
import FooterC from "../components/footer";
import { Grid } from "@mui/material";
import ReactHtmlParser from "react-html-parser";

interface IPrivacyPolicy {
  cartQty: number | null | undefined;
  privacyPolicyContent: string;
}

const PrivacyPolicy = (props: IPrivacyPolicy) => {
  return (
    <Grid>
      <MainNav cartQty={props.cartQty} />
      <PagesNav />
      <Grid>
        <Grid>
          <h1 className="main-title">privacy policy</h1>
        </Grid>
        <Grid>{ReactHtmlParser(props.privacyPolicyContent)}</Grid>
      </Grid>
      <FooterC />
    </Grid>
  );
};

export async function getStaticProps() {
  const cartResponse = await IndexAPI.get(`/cart`);

  const privacyPolicyResponse = await IndexAPI.get(`/privacyPolicy`);

  return {
    props: {
      cartQty: cartResponse.data.data.cart.length,
      privacyPolicyContent:
        privacyPolicyResponse.data.data.privacyPolicy[0].content,
    },
    revalidate: 1,
  };
}

export default PrivacyPolicy;
