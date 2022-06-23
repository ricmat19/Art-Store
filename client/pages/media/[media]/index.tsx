/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import IndexAPI from "../../../apis/indexAPI";
import Footer from "../../../components/footer";
import MediaNav from "../../../components/users/media/mediaNav";
import MainNav from "../../../components/users/mainNav";
import PagesNav from "../../../components/users/pagesNav";
// import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Grid } from "@mui/material";

// Media prop interface
interface IMedia {
  mediaCategories: string[];
  mediaPosts: {
    id: string;
    title: string;
    imageBuffer: string;
  }[];
  cartQty: number;
}

//Media functional component
const Media = (props: IMedia) => {
  // Media states
  const [pageNumber, setPageNumber] = useState<number>(0);

  //Next router function
  const router = useRouter();

  // Setup pagination and number of items per page
  const itemsPerPage = 9;
  const pagesVisited: number = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(props.mediaPosts.length / itemsPerPage);
  const changePage = ({ selected }: { selected: number }): void => {
    setPageNumber(selected);
  };

  // Route to the selected blog post's detail page
  const displayPostDetails = async (id: string) => {
    try {
      await router.push(`/media/blog/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  //Map through the list of blog posts and setup their templates
  const displayPost = props.mediaPosts
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((post) => {
      return (
        <Grid key={post.id}>
          {/* Route to the selected blog post's page on click */}
          <Grid className="pointer" onClick={() => displayPostDetails(post.id)}>
            <Grid className="image-container">
              <img
                className="thumbnail"
                src={post.imageBuffer}
                alt="blog-thumbnail"
              />
            </Grid>
            {/* Route post's title */}
            <Grid className="one-column-thumbnail-footer">
              <h3 className="align-center">{post.title}</h3>
            </Grid>
          </Grid>
        </Grid>
      );
    });

  // Media component
  return (
    <Grid>
      <Head>
        <title>artHouse19-Media</title>
      </Head>
      {/* Main navigation component */}
      <MainNav cartQty={props.cartQty} />
      {/* Pages navigation component */}
      <PagesNav />
      <Grid className="main-body">
        <Grid>
          {/* Display the media navigation menu */}
          <MediaNav media={props} />
          {/* Display all posts of the current media subject */}
          <Grid className="gallery-menu">{displayPost}</Grid>
        </Grid>
        {/* Pagination component */}
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
      {/* Footer component */}
      <Footer />
    </Grid>
  );
};

// Create a path for the list of media types
export function getStaticPaths() {
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
  const media = context.params.media;

  // Get all items in the cart
  const cartResponse = await IndexAPI.get(`/cart`);

  //Get a list of all media posts of the selected subject
  const mediaResponse = await IndexAPI.get(`/media/${media}`);

  //Create and add media post image buffer to all media posts in the media subject's object
  for (let i = 0; i < mediaResponse.data.data.posts.length; i++) {
    if (mediaResponse.data.data.posts[i].imagekey !== null) {
      const imagesResponse = await IndexAPI.get(
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

  //Provide the media category, media posts, and cart quantity as props to the media component
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
