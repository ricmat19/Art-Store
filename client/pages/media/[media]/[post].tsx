// import { useRouter } from "next/router";
import IndexAPI from "../../../apis/indexAPI";
import FooterC from "../../../components/footer";
import MainNav from "../../../components/users/mainNav";
import PagesNav from "../../../components/users/pagesNav";
import { Grid } from "@mui/material";

const BlogPost = (props: any) => {
  // const [title] = useState(props.title);
  // const [info] = useState(props.info);
  // const [imageBuffer] = useState(props.imageBuffer);

  console.log(props.selectedMedia.content);
  return (
    <Grid>
      <MainNav cartQty={props.cartQty} />
      <PagesNav />
      <Grid
        className="main-body item-details"
        // dangerouslySetInnerHTML={{__html: props.selectedMedia.content}}
      ></Grid>
      <FooterC />
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
  params: { media: any; post: any };
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
