/* eslint-disable @next/next/no-img-element */
import IndexAPI from "../apis/indexAPI";
import { useState } from "react";
import MainNav from "../components/users/mainNav";
import PagesNav from "../components/users/pagesNav";
import FooterC from "../components/footer";
import { Grid } from "@mui/material";
import ReactPaginate from "react-paginate";
import Head from "next/head";

const Collection = (props: any) => {
  const [pageNumber, setPageNumber] = useState<number>(0);

  const itemsPerPage = 9;
  const pagesVisted = pageNumber * itemsPerPage;

  const displayCollectionItems = props.collection
    .slice(pagesVisted, pagesVisted + itemsPerPage)
    .map((item: any) => {
      return (
        <Grid
          className="pointer"
          key={item.id}
          onClick={() => displayCollectionItems(item.product, item.id)}
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

  const pageCount = Math.ceil(props.collection.length / itemsPerPage);

  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  return (
    <Grid>
      <Head>
        <title>artHouse19-Collection</title>
        <meta name="description" content="Your collection."></meta>
      </Head>
      <MainNav cartQty={props.cartQty} />
      <PagesNav />
      <Grid>
        <Grid>
          <h1 className="main-title">collection</h1>
        </Grid>
        <Grid sx={{ display: "grid", justifyContent: "center" }}>
          <button>create collection</button>
        </Grid>
        <Grid className="gallery-menu">{displayCollectionItems}</Grid>
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

  const collectionResponse = await IndexAPI.get(`/collections`);

  const userCollection = [];
  for (let i = 0; i < collectionResponse.data.data.collection.length; i++) {
    if (
      collectionResponse.data.data.collection[i].collection_user ===
      "ric19mat@gmail.com"
    ) {
      userCollection.push(collectionResponse.data.data.collection[i].item);
    }
  }

  const userCollectionProducts = [];
  const productsResponse = await IndexAPI.get(`/products`);
  for (let i = 0; i < productsResponse.data.data.products.length; i++) {
    for (let j = 0; j < userCollection.length; j++) {
      if (productsResponse.data.data.products[i].id === userCollection[j]) {
        userCollectionProducts.push(productsResponse.data.data.products[i]);
      }
    }
  }

  for (let i = 0; i < userCollectionProducts.length; i++) {
    if (userCollectionProducts[i].imagekey !== null) {
      let imagesResponse = await IndexAPI.get(
        `/images/${userCollectionProducts[i].imagekey}`,
        {
          responseType: "arraybuffer",
        }
      ).then((response) =>
        Buffer.from(response.data, "binary").toString("base64")
      );

      userCollectionProducts[
        i
      ].imageBuffer = `data:image/png;base64,${imagesResponse}`;
    }
  }

  return {
    props: {
      collection: userCollectionProducts,
      cartQty: cartResponse.data.data.cart.length,
    },
    revalidate: 1,
  };
}

export default Collection;
