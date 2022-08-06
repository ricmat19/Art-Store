import IndexAPI from "../../../apis/indexAPI";
import { useEffect, useState } from "react";
import MainNav from "../../../components/users/mainNav";
import PagesNav from "../../../components/users/pagesNav";
import Footer from "../../../components/footer";
import ReactHtmlParser from "react-html-parser";
import { Grid } from "@mui/material";

//Help article prop interface
interface IHelpArticle {
  cartQty: number;
  helpArticle: {
    title: string;
    article: string;
    create_date: Date;
    update_date: Date;
  }[];
}

// Help article functional component
const HelpArticle = (props: IHelpArticle) => {
  const [createMonth, setCreateMonth] = useState<number>(0);
  const [createDay, setCreateDay] = useState<number>(0);
  const [createYear, setCreateYear] = useState<number>(0);
  const [updateMonth, setUpdateMonth] = useState<number>(0);
  const [updateDay, setUpdateDay] = useState<number>(0);
  const [updateYear, setUpdateYear] = useState<number>(0);

  useEffect(() => {
    const fetchData = () => {
      try {
        const articleCreateDate = new Date(props.helpArticle[0].create_date);
        setCreateMonth(articleCreateDate.getMonth() + 1);
        setCreateDay(articleCreateDate.getDate());
        setCreateYear(articleCreateDate.getFullYear());
        const articleUpdateDate = new Date(props.helpArticle[0].update_date);
        setUpdateMonth(articleUpdateDate.getMonth() + 1);
        setUpdateDay(articleUpdateDate.getDate());
        setUpdateYear(articleUpdateDate.getFullYear());
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    // Re-render if change to date events state
  }, []);

  // Help article component
  return (
    <Grid>
      {/* Main navigation component */}
      <MainNav cartQty={props.cartQty} />
      {/* Pages navigation component */}
      <PagesNav />
      <Grid>
        <Grid sx={{ display: "grid", gap: "10px", margin: "50px 20vw" }}>
          {/* Help article title */}
          <Grid>
            <h1>{props.helpArticle[0].title}</h1>
          </Grid>
          {/* Help article content */}
          <Grid>{ReactHtmlParser(props.helpArticle[0].article)}</Grid>
          <Grid>
            <Grid>
              <p>
                Published: {createMonth}/{createDay}/{createYear}
              </p>
            </Grid>
            <Grid>
              <p>
                Last Updated: {updateMonth}/{updateDay}/{updateYear}
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* Footer component */}
      <Footer />
    </Grid>
  );
};

// Create routes for help articles
export async function getStaticPaths() {
  const helpResponse = await IndexAPI.get(`/help`);

  return {
    fallback: false,
    paths: helpResponse.data.data.helpArticles.map(
      (article: { category: any; id: any }) => ({
        params: {
          category: article.category,
          id: article.id,
        },
      })
    ),
  };
}

export async function getStaticProps(context: {
  params: { category: string; id: string };
}) {
  const category = context.params.category;
  const id = context.params.id;

  //Get cart content
  const cartResponse = await IndexAPI.get(`/cart`);

  //Get the selected help article
  const helpArticle = await IndexAPI.get(`/help/${category}/${id}`);

  //Provide the selected help article and cart quantity as a props to the help article component
  return {
    props: {
      helpArticle: helpArticle.data.data.helpArticle,
      cartQty: cartResponse.data.data.cart.length,
    },
    revalidate: 1,
  };
}

export default HelpArticle;
