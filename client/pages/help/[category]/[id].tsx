import IndexAPI from "../../../apis/indexAPI";
import MainNav from "../../../components/users/mainNav";
import PagesNav from "../../../components/users/pagesNav";
import FooterC from "../../../components/footer";
import ReactHtmlParser from "react-html-parser";
import { Grid } from "@mui/material";

const HelpArticle = (props: any) => {
  return (
    <Grid>
      <MainNav />
      <PagesNav />
      <Grid>
        <form>
          <Grid sx={{ display: "grid", gap: "10px", margin: "50px 20vw" }}>
            <Grid>
              <h1>{props.helpArticle[0].title}</h1>
            </Grid>
            <Grid>{ReactHtmlParser(props.helpArticle[0].article)}</Grid>
          </Grid>
        </form>
      </Grid>
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
  params: { category: string; id: string };
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
