/* eslint-disable @next/next/no-img-element */
import { FC, useState } from "react";
import IndexAPI from "../../../apis/indexAPI";
import FooterC from "../../../components/footer";
import MediaNav from "../../../components/users/media/mediaNav";
import MainNav from "../../../components/users/mainNav";
import PagesNav from "../../../components/users/pagesNav";
// import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Grid } from "@mui/material";

const Media: FC = (props: any) => {
  const [media] = useState(props.media);
  const [pageNumber, setPageNumber] = useState<number>(0);

  const itemsPerPage: number = 9;
  const pagesVisted: number = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(media.length / itemsPerPage);

  const changePage = ({ selected }: { selected: number }): void => {
    setPageNumber(selected);
  };

  const displayBlog = media
    .slice(pagesVisted, pagesVisted + itemsPerPage)
    .map((post: any) => {
      return (
        <Grid
          className="collection-item-div"
          key={post.id}
          onClick={() => displayPost(post.id)}
        >
          <Grid className="collection-item">
            <img
              className="collection-thumbnail"
              src={post.imageBuffer}
              alt="collection-thumbnail"
            />
          </Grid>
          <Grid>
            <Grid>{post.title}</Grid>
          </Grid>
        </Grid>
      );
    });

  //   let navigation = useNavigate();

  const displayPost = async (id: string) => {
    try {
      console.log(id);
      //   navigation(`/medias/blog/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid>
      <MainNav cartQty={props.cartQty} />
      <PagesNav />
      <Grid className="main-body">
        <MediaNav medias={media} />
        <Grid className="collection-menu">{}</Grid>
        <Grid className="thumbnail-display">{displayBlog}</Grid>
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationButtons"}
          previousLinkClassName={"prevButton"}
          nextLinkClassName={"nextButton"}
          disabledClassName={"disabledButton"}
          activeClassName={"activeButton"}
          pageRangeDisplayed={5}
          marginPagesDisplayed={5}
        />
      </Grid>
      <FooterC />
    </Grid>
  );
};

export async function getStaticPaths() {
  const mediaResponse = await IndexAPI.get(`/media`);

  const media: string[] = [];
  for (let i = 0; i < mediaResponse.data.data.medias.length; i++) {
    if (!media.includes(mediaResponse.data.data.medias.type)) {
      media.push(mediaResponse.data.data.medias[i].type);
    }
  }

  return {
    fallback: false,
    paths: media.map((media: any) => ({
      params: {
        media: media,
      },
    })),
  };
}

export async function getStaticProps(context: { params: { media: any } }) {
  const cartResponse = await IndexAPI.get(`/cart`);

  const media = context.params.media;
  const mediaResponse = await IndexAPI.get(`/media/${media}`);

  for (let i = 0; i < mediaResponse.data.data.posts.length; i++) {
    if (mediaResponse.data.data.posts[i].imagekey !== null) {
      let imagesResponse = await IndexAPI.get(
        `/images/${mediaResponse.data.data.posts[i].imagekey}`,
        {
          responseType: "arraybuffer",
        }
      ).then((response) =>
        Buffer.from(response.data, "binary").toString("base64")
      );

      mediaResponse.data.data.posts[
        i
      ].imageBuffer = `data:image/png;base64,${imagesResponse}`;
    }
  }
  return {
    props: {
      media: mediaResponse.data.data.posts,
      cartQty: cartResponse.data.data.cart.length,
    },
    revalidate: 1,
  };
}

export default Media;
