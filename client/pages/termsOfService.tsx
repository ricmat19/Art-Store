import IndexAPI from "../apis/indexAPI";
import MainNav from "../components/users/mainNav";
import PagesNav from "../components/users/pagesNav";
import Footer from "../components/footer";
import { Grid } from "@mui/material";
import ReactHtmlParser from "react-html-parser";

// Terms of Service prop interface
interface ITermsOfService {
  cartQty: number;
  termsOfServiceContent: string;
}

//Terms of Service functional component
const TermsOfService = (props: ITermsOfService) => {

  // Terms of service component
  return (
    <Grid>
      {/* Main navigation component */}
      <MainNav cartQty={props.cartQty} />
      {/* Pages navigation component */}
      <PagesNav />
      <Grid sx={{ margin: "30px 100px" }}>
        <Grid>
          <Grid className="page-header">
            <h1 className="main-title">artHouse19 terms of service</h1>
          </Grid>
          {/* Terms of Service content */}
          <Grid className="container">
            {ReactHtmlParser(props.termsOfServiceContent)}
          </Grid>
        </Grid>
        <Footer />
      </Grid>
    </Grid>
  );
};

export async function getStaticProps() {
  // Get cart content
  const cartResponse = await IndexAPI.get(`/cart`);

  // Get terms of service content
  const termsOfServiceResponse = await IndexAPI.get(`/termsOfService`);

  //Provide the cart quantity and terms of service content as a props to the terms of service component
  return {
    props: {
      cartQty: cartResponse.data.data.cart.length,
      termsOfServiceContent:
        termsOfServiceResponse.data.data.termsOfService[0].content,
    },
    revalidate: 1,
  };
}

export default TermsOfService;
