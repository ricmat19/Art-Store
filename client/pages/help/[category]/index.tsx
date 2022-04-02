import IndexAPI from "../../../apis/indexAPI";
import MainNav from "../../../components/users/mainNav";
import PagesNav from "../../../components/users/pagesNav";
import FooterC from "../../../components/footer";
import { Grid } from "@mui/material";

const Help = (props: any) => {
  return (
    <Grid>
      <MainNav cartQty={props.cartQty} />
      <PagesNav />
      <Grid></Grid>
      <FooterC />
    </Grid>
  );
};

export async function getStaticPaths() {
  const helpResponse = await IndexAPI.get(`/help`);

  return {
    fallback: false,
    paths: helpResponse.data.data.helpArticles.map((article: any) => ({
      params: {
        category: article.category,
      },
    })),
  };
}

export async function getStaticProps(context: { params: { category: any } }) {
  const category = context.params.category;
  console.log(category);
  const helpCategoryResponse = await IndexAPI.get(`/help/${category}`);

  const cartResponse = await IndexAPI.get(`/cart`);

  return {
    props: {
      helpCategory: helpCategoryResponse.data.data.helpCategory,
      cartQty: cartResponse.data.data.cart.length,
    },
    revalidate: 1,
  };
}

export default Help;
