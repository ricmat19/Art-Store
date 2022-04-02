import IndexAPI from "../../../../apis/indexAPI";
import AdminMainNav from "../../../../components/admin/mainNav";
import AdminPagesNav from "../../../../components/admin/pagesNav";
import FooterC from "../../../../components/footer";
import { Grid } from "@mui/material";

const HelpArticle = (props: any) => {
  return (
    <Grid>
      <AdminMainNav cartQty={props.cartQty} />
      <AdminPagesNav />
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
        id: article.id,
      },
    })),
  };
}

export async function getStaticProps(context: {
  params: { category: any; id: any };
}) {
  const category = context.params.category;
  const id = context.params.id;
  const helpArticle = await IndexAPI.get(`/help/${category}/${id}`);

  const cartResponse = await IndexAPI.get(`/cart`);

  return {
    props: {
      helpArticle: helpArticle.data.data.helpArticle,
      cartQty: cartResponse.data.data.cart.length,
    },
    revalidate: 1,
  };
}

export default HelpArticle;
