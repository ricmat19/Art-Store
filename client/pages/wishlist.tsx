/* eslint-disable @next/next/no-img-element */
import IndexAPI from "../apis/indexAPI";
import { useState } from "react";
import MainNav from "../components/users/mainNav";
import PagesNav from "../components/users/pagesNav";
import FooterC from "../components/footer";
import { Grid } from "@mui/material";
import ReactPaginate from "react-paginate";
import Head from "next/head";

const Wishlist = (props: any) => {
  const [pageNumber, setPageNumber] = useState<number>(0);

  const itemsPerPage = 9;
  const pagesVisted = pageNumber * itemsPerPage;

  const displayWishlistItems = props.wishlist
    .slice(pagesVisted, pagesVisted + itemsPerPage)
    .map((item: any) => {
      return (
        <Grid
          className="pointer"
          key={item.id}
          onClick={() => displayWishlistItems(item.product, item.id)}
        >
          <Grid className="image-container">
            <img
              className="thumbnail"
              src={item.imageBuffer}
              alt={item.title}
            />
          </Grid>
          <Grid className="two-column-thumbnail-footer">
            <h3 className="align-center">{item.title}</h3>
            <h3 className="align-center">${item.price}.00</h3>
          </Grid>
        </Grid>
      );
    });

  const pageCount = Math.ceil(props.wishlist.length / itemsPerPage);

  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  return (
    <Grid>
      <Head>
        <title>artHouse19-Wishlist</title>
        <meta name="description" content="Your wishlist."></meta>
      </Head>
      <MainNav cartQty={props.cartQty} />
      <PagesNav />
      <Grid>
        <Grid>
          <h1 className="main-title">wishlist</h1>
        </Grid>
        <Grid sx={{ display: "grid", justifyContent: "center" }}>
          <button>create collection</button>
        </Grid>
        <Grid className="gallery-menu">{displayWishlistItems}</Grid>
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
        />
      </Grid>
      <FooterC />
    </Grid>
  );
};

export async function getStaticProps() {
  const cartResponse = await IndexAPI.get(`/cart`);

  const wishlistResponse = await IndexAPI.get(`/wishlist`);

  const userWishlist = [];
  for (let i = 0; i < wishlistResponse.data.data.wishlist.length; i++) {
    if (
      wishlistResponse.data.data.wishlist[i].wishlist_user ===
      "ric19mat@gmail.com"
    ) {
      userWishlist.push(wishlistResponse.data.data.wishlist[i].item);
    }
  }

  const userWishlistProducts = [];
  const productsResponse = await IndexAPI.get(`/products`);
  for (let i = 0; i < productsResponse.data.data.products.length; i++) {
    for (let j = 0; j < userWishlist.length; j++) {
      if (productsResponse.data.data.products[i].id === userWishlist[j]) {
        userWishlistProducts.push(productsResponse.data.data.products[i]);
      }
    }
  }

  for (let i = 0; i < userWishlistProducts.length; i++) {
    if (userWishlistProducts[i].imagekey !== null) {
      let imagesResponse = await IndexAPI.get(
        `/images/${userWishlistProducts[i].imagekey}`,
        {
          responseType: "arraybuffer",
        }
      ).then((response) =>
        Buffer.from(response.data, "binary").toString("base64")
      );

      userWishlistProducts[
        i
      ].imageBuffer = `data:image/png;base64,${imagesResponse}`;
    }
  }

  return {
    props: {
      wishlist: userWishlistProducts,
      cartQty: cartResponse.data.data.cart.length,
    },
    revalidate: 1,
  };
}

export default Wishlist;
