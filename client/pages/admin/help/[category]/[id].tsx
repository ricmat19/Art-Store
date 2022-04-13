import IndexAPI from "../../../../apis/indexAPI";
import { useState } from "react";
import { useRouter } from "next/router";
import AdminMainNav from "../../../../components/admin/mainNav";
import AdminPagesNav from "../../../../components/admin/pagesNav";
import FooterC from "../../../../components/footer";
import { Grid } from "@mui/material";

const HelpArticle = (props: any) => {
  const [title, setTitle] = useState<string>(props.helpArticle[0].title);
  const [content, setContent] = useState<string>(props.helpArticle[0].article);

  const router = useRouter();

  const updateArticle = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      await IndexAPI.put(
        `/admin/help/${props.helpArticle[0].category}/${props.helpArticle[0].id}`,
        {
          title,
          content,
        }
      );
      router.push(`/admin/help/${props.helpArticle[0].category}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid>
      <AdminMainNav />
      <AdminPagesNav />
      <Grid>
        <form>
          <Grid sx={{ display: "grid", gap: "10px", margin: "50px 20vw" }}>
            <Grid>
              <label>Title:</label>
              <input
                className="full-width"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </Grid>
            <Grid>
              <label>Content:</label>
              <textarea
                className="full-width"
                onChange={(e) => setContent(e.target.value)}
                value={content}
                rows={50}
              />
            </Grid>
            <Grid sx={{ textAlign: "center" }}>
              <button type="submit" onClick={updateArticle}>
                Submit
              </button>
            </Grid>
          </Grid>
        </form>

        <Grid>{props.helpArticle.title}</Grid>
        <Grid>{props.helpArticle.article}</Grid>
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
  params: { category: any; id: any };
}) {
  const category = context.params.category;
  const id = context.params.id;
  const helpArticle = await IndexAPI.get(`/admin/help/${category}/${id}`);

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
