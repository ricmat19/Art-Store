/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import IndexAPI from "../../../apis/indexAPI";
import FooterC from "../../../components/footer";
import MediaNav from "../../../components/users/media/mediaNav";
import MainNav from "../../../components/users/mainNav";
import PagesNav from "../../../components/users/pagesNav";
// import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Grid } from "@mui/material";

interface IMedia {
  mediaListings: any;
  cartQty: any;
  mediaCategories: any;
}
const Media = (props: IMedia) => {
  const [pageNumber, setPageNumber] = useState<number>(0);

  const itemsPerPage: number = 9;
  const pagesVisted: number = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(props.mediaListings.length / itemsPerPage);
  const changePage = ({ selected }: { selected: number }): void => {
    setPageNumber(selected);
  };

  const router = useRouter();

  const displayPostDetails = async (id: string) => {
    try {
      router.push(`/media/blog/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const displayPost = props.mediaListings
    .slice(pagesVisted, pagesVisted + itemsPerPage)
    .map((post: any) => {
      return (
        <Grid key={post.id}>
          <Grid className="pointer" onClick={() => displayPostDetails(post.id)}>
            <Grid className="image-container">
              <img
                className="thumbnail"
                src={post.imageBuffer}
                alt="blog-thumbnail"
              />
            </Grid>
            <Grid className="one-column-thumbnail-footer">
              <h3 className="align-center">{post.title}</h3>
            </Grid>
          </Grid>
        </Grid>
      );
    });

  return (
    <Grid>
      <Head>
        <title>artHouse19-Media</title>
      </Head>
      <MainNav cartQty={props.cartQty} />
      <PagesNav />
      <Grid className="main-body">
        <Grid>
          <MediaNav medias={props.mediaCategories} />
          <Grid className="gallery-menu">{displayPost}</Grid>
        </Grid>
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
  return {
    fallback: false,
    paths: [
      {
        params: {
          media: "blog",
        },
      },
      {
        params: {
          media: "channel",
        },
      },
      {
        params: {
          media: "podcast",
        },
      },
    ],
  };
}

export async function getStaticProps(context: { params: { media: string } }) {
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
      mediaCategories: media,
      mediaListings: mediaResponse.data.data.posts,
      cartQty: cartResponse.data.data.cart.length,
    },
    revalidate: 1,
  };
}

export default Media;
