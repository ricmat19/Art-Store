import { FC, useState } from "react";
// import { useRouter } from "next/router";
import IndexAPI from "../../../apis/indexAPI";
import FooterC from "../../../components/footer";
import MainNav from "../../../components/users/mainNav";
import PagesNav from "../../../components/users/pagesNav";
import { Grid } from "@mui/material";

const BlogPost: FC = (props: any) => {
  const [cartQty] = useState<number>(props.cart.length);

    // const [title] = useState(props.title);
    // const [info] = useState(props.info);
    // const [imageBuffer] = useState(props.imageBuffer);

  return (
    <Grid>
      <MainNav />
      <PagesNav cartQty={cartQty} />
      <Grid className="main-body item-details"></Grid>
      <FooterC />
    </Grid>
  );
};

export async function getStaticPaths() {
  const mediaResponse = await IndexAPI.get(`/media`);

  return {
    fallback: false,
    paths: mediaResponse.data.data.media.map((media: any) => ({
      params: {
        media: media.media,
        id: media.id
      },
    })),
  };
}

export async function getStaticProps(context: {
  params: { media: any; id: any };
}) {
  const media = context.params.media;
  const id = context.params.id;
  const mediaResponse = await IndexAPI.get(`/media/${media}/${id}`);

  let imageBuffer = "";
  if (mediaResponse.data.data.media.imagekey !== null) {
    let imagesResponse = await IndexAPI.get(
      `/images/${mediaResponse.data.data.media.imagekey}`,
      {
        responseType: "arraybuffer",
      }
    ).then((response) =>
      Buffer.from(response.data, "binary").toString("base64")
    );

    imageBuffer = `data:image/png;base64,${imagesResponse}`;
  }

  const cartResponse = await IndexAPI.get(`/cart`);

  return {
    props: {
      imageBuffer: imageBuffer,
      selectedMedia: mediaResponse.data.data.media,
      cart: cartResponse.data.data.cart,
      cartQty: cartResponse.data.data.cart.length,
    },
    revalidate: 1,
  };
}

export default BlogPost;
