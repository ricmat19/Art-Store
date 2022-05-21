import IndexAPI from "../apis/indexAPI";
import MainNav from "../components/users/mainNav";
import PagesNav from "../components/users/pagesNav";
import FooterC from "../components/footer";
import { Grid } from "@mui/material";
import ReactHtmlParser from "react-html-parser";

interface ITermsOfService {
  cartQty: number | null | undefined;
  termsOfServiceContent: string;
}

const TermsOfService = (props: ITermsOfService) => {
  return (
    <Grid>
      <MainNav cartQty={props.cartQty} />
      <PagesNav />
      <Grid sx={{ margin: "30px 100px" }}>
        <Grid>
          <Grid className="page-header">
            <h1 className="main-title">artHouse19 terms of service</h1>
          </Grid>
          <Grid className="container">
            {ReactHtmlParser(props.termsOfServiceContent)}
          </Grid>
        </Grid>
        <FooterC />
      </Grid>
    </Grid>
  );
};

export async function getStaticProps() {
  const cartResponse = await IndexAPI.get(`/cart`);

  const termsOfServiceResponse = await IndexAPI.get(`/termsOfService`);

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
