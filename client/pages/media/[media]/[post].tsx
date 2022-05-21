/* eslint-disable @next/next/no-img-element */
// import { useRouter } from "next/router";
import IndexAPI from "../../../apis/indexAPI";
import FooterC from "../../../components/footer";
import MainNav from "../../../components/users/mainNav";
import { Grid } from "@mui/material";
import ReactHtmlParser from "react-html-parser";
import { ReactChild, ReactFragment, ReactPortal } from "react";

interface ISelectedMedia {
  title: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined;
  content: string;
}
interface IBlogPost {
  cartQty: number | null | undefined;
  imageBuffer: string | undefined;
  selectedMedia: ISelectedMedia;
}

const BlogPost = (props: IBlogPost) => {
  // const [title] = useState(props.title);
  // const [info] = useState(props.info);
  // const [imageBuffer] = useState(props.imageBuffer);

  return (
    <Grid>
      <MainNav cartQty={props.cartQty} />
      <Grid className="main-body">
        <Grid>
          <Grid xs={12} sx={{ textAlign: "center" }}>
            <img
              className="banner-image"
              src={props.imageBuffer}
              alt="banner-image"
            />
          </Grid>
          <h1>{props.selectedMedia.title}</h1>
          <Grid sx={{ margin: "50px 20vw", textAlign: "justify" }}>
            {ReactHtmlParser(props.selectedMedia.content)}
          </Grid>
        </Grid>
        <FooterC />
      </Grid>
    </Grid>
  );
};

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
      blogResponse.data.data.posts.map((post: any) => ({
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
  const cartResponse = await IndexAPI.get(`/cart`);

  const media = context.params.media;
  const post = context.params.post;
  const mediaResponse = await IndexAPI.get(`/media/${media}/${post}`);

  let imageBuffer = "";
  if (mediaResponse.data.data.post.imagekey !== null) {
    let imagesResponse = await IndexAPI.get(
      `/images/${mediaResponse.data.data.post.imagekey}`,
      {
        responseType: "arraybuffer",
      }
    ).then((response) =>
      Buffer.from(response.data, "binary").toString("base64")
    );

    imageBuffer = `data:image/png;base64,${imagesResponse}`;
  }

  return {
    props: {
      imageBuffer: imageBuffer,
      selectedMedia: mediaResponse.data.data.post,
      cart: cartResponse.data.data.cart,
      cartQty: cartResponse.data.data.cart.length,
    },
    revalidate: 1,
  };
}

export default BlogPost;
