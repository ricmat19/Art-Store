/* eslint-disable @next/next/no-img-element */
import IndexAPI from "../../apis/indexAPI";
import { useState } from "react";
import MainNav from "../../components/users/mainNav";
import PagesNav from "../../components/users/pagesNav";
import FooterC from "../../components/footer";
import { Grid } from "@mui/material";
import ReactPaginate from "react-paginate";
import Head from "next/head";
import { useRouter } from "next/router";

const CollectionGroups = (props: any) => {
  const [pageNumber, setPageNumber] = useState<number>(0);

  const itemsPerPage = 9;
  const pagesVisted = pageNumber * itemsPerPage;

  const router = useRouter();
  const group = router.query.group;

  const removeFromCollectionGroup = async (
    e: { preventDefault: () => void },
    group: any,
    item: any
  ) => {
    try {
      await IndexAPI.delete(`/collections/delete/${group}/${item}`);
    } catch (err) {
      console.log(err);
    }
  };

  const displayCollectionItems = props.collection
    .slice(pagesVisted, pagesVisted + itemsPerPage)
    .map((item: any) => {
      return (
        <Grid key={item.id}>
          <Grid
            className="pointer"
            onClick={() => displayItem(item.product, item.id)}
          >
            <Grid className="image-container">
              <img
                className="thumbnail"
                src={item.imageBuffer}
                alt={item.title}
              />
            </Grid>
          </Grid>
          <Grid>
            <button
              onClick={(e) => removeFromCollectionGroup(e, group, item.id)}
            >
              Remove
            </button>
          </Grid>
        </Grid>
      );
    });

  const displayItem = async (product: string, id: string) => {
    try {
      router.push(`/products/${product}/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

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
          <h1 className="main-title">Collection: {group}</h1>
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

export async function getStaticPaths() {
  const collectionGroupsResponse = await IndexAPI.get(`/collection/groups`);

  return {
    fallback: false,
    paths: collectionGroupsResponse.data.data.groups.map((groups: any) => ({
      params: {
        group: groups.collection_group,
      },
    })),
  };
}

export async function getStaticProps(context: { params: { group: any } }) {
  const cartResponse = await IndexAPI.get(`/cart`);

  const group = context.params.group;
  const collectionGroupResponse = await IndexAPI.get(
    `/collection/group/${group}`
  );

  const userCollection = [];
  for (
    let i = 0;
    i < collectionGroupResponse.data.data.groupItems.length;
    i++
  ) {
    if (
      collectionGroupResponse.data.data.groupItems[i].collection_user ===
      "ric19mat@gmail.com"
    ) {
      userCollection.push(collectionGroupResponse.data.data.groupItems[i].item);
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

export default CollectionGroups;
