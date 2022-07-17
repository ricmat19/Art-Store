/* eslint-disable @next/next/no-img-element */
// import { useRouter } from "next/router";
import IndexAPI from "../../../apis/indexAPI";
import Footer from "../../../components/footer";
import MainNav from "../../../components/users/mainNav";
import { Grid } from "@mui/material";
import ReactHtmlParser from "react-html-parser";
import PagesNav from "../../../components/users/pagesNav";

// Blog post prop interface
interface IBlogPost {
  selectedMedia: {
    title: string;
    image_url: string | undefined;
    content: string;
  };
  cartQty: number;
}

//Blog post functional component
const BlogPost = (props: IBlogPost) => {
  // const [title] = useState(props.title);
  // const [info] = useState(props.info);

  //Blog post component
  return (
    <Grid>
      {/* Main navigation component */}
      <MainNav cartQty={props.cartQty} />
      <PagesNav />
      <Grid className="main-body">
        <Grid>
          {/* Blog post banner image */}
          <Grid xs={12} sx={{ textAlign: "center" }}>
            {console.log(props.selectedMedia.image_url)}
            <img
              className="banner-image"
              src={props.selectedMedia.image_url}
              alt="banner-image"
            />
          </Grid>
          {/* Blog post title */}
          <h1>{props.selectedMedia.title}</h1>
          {/* Blog post content */}
          <Grid sx={{ margin: "50px 20vw", textAlign: "justify" }}>
            {ReactHtmlParser(props.selectedMedia.content)}
          </Grid>
        </Grid>
        {/* Footer component */}
        <Footer />
      </Grid>
    </Grid>
  );
};

// Create routes for blog posts
export async function getStaticPaths() {
  // const mediaResponse = await IndexAPI.get(`/media`);
  const blogResponse = await IndexAPI.get(`/media/blog`);

  return {
    fallback: false,
    paths:
      // mediaResponse.data.data.medias.map(
      //   (media: any) => ({
      //     params: {
      //       media: media.type,
      //     },
      //   }),
      blogResponse.data.data.posts.map((post: { id: string }) => ({
        params: {
          media: "blog",
          post: post.id,
        },
      })),
    // ),
  };
}

export async function getStaticProps(context: {
  params: { media: string; post: string };
}) {
  const media = context.params.media;
  const post = context.params.post;

  //Get cart content
  const cartResponse = await IndexAPI.get(`/cart`);

  //Get the selected blog post
  const mediaResponse = await IndexAPI.get(`/media/${media}/${post}`);

  //Provide the selected blog post's image buffer, selected blog post's content, cart content, and cart quantity as a props to the blog post component
  return {
    props: {
      selectedMedia: mediaResponse.data.data.post,
      cart: cartResponse.data.data.cart,
      cartQty: cartResponse.data.data.cart.length,
    },
    revalidate: 1,
  };
}

export default BlogPost;
