import IndexAPI from "../apis/indexAPI";
import MainNav from "../components/users/mainNav";
import PagesNav from "../components/users/pagesNav";
import Footer from "../components/footer";
import { Grid } from "@mui/material";
import ReactHtmlParser from "react-html-parser";

// Privacy policy prop interface
interface IPrivacyPolicy {
  cartQty: number;
  privacyPolicyContent: string;
}

// Privacy policy functional component
const PrivacyPolicy = (props: IPrivacyPolicy) => {

  // Privacy policy component
  return (
    <Grid>
      {/* Main navigation component */}
      <MainNav cartQty={props.cartQty} />
      {/* Pages navigation component */}
      <PagesNav />
      <Grid>
        <Grid>
          <h1 className="main-title">privacy policy</h1>
        </Grid>
        {/* Privacy policy content */}
        <Grid>{ReactHtmlParser(props.privacyPolicyContent)}</Grid>
      </Grid>
      <Footer />
    </Grid>
  );
};

export async function getStaticProps() {
  // Get cart content
  const cartResponse = await IndexAPI.get(`/cart`);

  // Get privacy policy content
  const privacyPolicyResponse = await IndexAPI.get(`/privacyPolicy`);

  //Provide the cart quantity and privacy policy as a props to the privacy policy component
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
