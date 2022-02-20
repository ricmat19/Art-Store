import { FC, useEffect } from "react";
// import { useRouter } from "next/router";
// import IndexAPI from "../../../apis/indexAPI";
import FooterC from "../../../components/footer";
import MainNav from "../../../components/users/mainNav";
import PagesNav from "../../../components/users/pagesNav";
import { Grid } from "@mui/material";

const BlogPost: FC = () => {
  //   const { media, id } = useRouter();

  //   const [, setTitle] = useState<string>("");
  //   const [, setInfo] = useState<string>("");
  //   const [, setImageBuffer] = useState("../../images/loading.svg");

  useEffect((): void => {
    const fetchData = async () => {
      try {
        // const mediaResponse = await IndexAPI.get(
        //   `/admin/medias/${media}/${id}`
        // );
        // console.log(mediaResponse.data.data.media)
        // if (mediaResponse.data.data.media.imagekey !== null) {
        //   let imagesResponse = await IndexAPI.get(
        //     `/images/${mediaResponse.data.data.media.imagekey}`,
        //     {
        //       responseType: "arraybuffer",
        //     }
        //   ).then((response) =>
        //     Buffer.from(response.data, "binary").toString("base64")
        //   );
        //   setImageBuffer(`data:image/png;base64,${imagesResponse}`);
        // }
        // setTitle(mediaResponse.data.data.media.title);
        // setInfo(mediaResponse.data.data.media.info);
        // setSelectedProduct(mediaResponse.data.data.media)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <Grid>
      <MainNav />
      <PagesNav cartQty={cartQty} />
      <Grid className="main-body item-details"></Grid>
      <FooterC />
    </Grid>
  );
};

export default BlogPost;
