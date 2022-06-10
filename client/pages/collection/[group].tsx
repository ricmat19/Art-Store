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

//Collection group prop interface
interface ICollectionGroups {
  collection: any[];
  cartQty: number | null | undefined;
}

//Collection group functional component
const CollectionGroups = (props: ICollectionGroups) => {
  //Collection group states
  const [pageNumber, setPageNumber] = useState<number>(0);

  // Setup pagination and number of items per page
  const itemsPerPage = 9;
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(props.collection.length / itemsPerPage);
  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  //Next router function
  const router = useRouter();

  //Next router attribute querying the current pages 'group' in the url
  const group = router.query.group;

  //Function to remove an item from the collection
  const removeFromCollectionGroup = async (
    e: { preventDefault: () => void },
    group: string | string[] | undefined,
    item: string
  ) => {
    try {
      await IndexAPI.delete(`/collections/delete/${group}/${item}`);
    } catch (err) {
      console.log(err);
    }
  };

  //Function routing to the selected item's detail page
  const displayItem = async (product: string, id: string) => {
    try {
      router.push(`/products/${product}/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  //Map the list of collection items within the current group into their own template
  const displayCollectionItems = props.collection
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((item: any) => {
      return (
        <Grid key={item.id}>
          {/* Routes to the items details page */}
          <Grid
            className="pointer"
            onClick={() => displayItem(item.product, item.id)}
          >
            {/* Displays the items image */}
            <Grid className="image-container">
              <img
                className="thumbnail"
                src={item.imageBuffer}
                alt={item.title}
              />
            </Grid>
          </Grid>
          <Grid>
            {/* Button to delete the item from the collection */}
            <button
              onClick={(e) => removeFromCollectionGroup(e, group, item.id)}
            >
              Remove
            </button>
          </Grid>
        </Grid>
      );
    });

  // Collection group's page component
  return (
    <Grid>
      <Head>
        <title>artHouse19-Collection</title>
        <meta name="description" content="Your collection."></meta>
      </Head>
      {/* Main navigation component */}
      <MainNav cartQty={props.cartQty} />
      {/* Pages navigation component */}
      <PagesNav />
      <Grid>
        {/* Display the current collection's title */}
        <Grid>
          <h1 className="main-title">Collection: {group}</h1>
        </Grid>
        {/* Display the current collection's items */}
        <Grid className="gallery-menu">{displayCollectionItems}</Grid>
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
        />
      </Grid>
      {/* Footer component */}
      <FooterC />
    </Grid>
  );
};

// Create a path for the list of collection groups
export async function getStaticPaths() {
  // Get list of collection groups
  const collectionGroupsResponse = await IndexAPI.get(`/collection/groups`);

  // Map collection groups as parameters
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
  // Get cart content
  const cartResponse = await IndexAPI.get(`/cart`);

  // Get all items in the selected collection group
  const group = context.params.group;
  const collectionGroupResponse = await IndexAPI.get(
    `/collection/group/${group}`
  );

  //Get all items in the collection group that pertain to the specified user
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

  //Get a list of all products
  const userCollectionProducts = [];
  const productsResponse = await IndexAPI.get(`/products`);
  //Create list of all products that pertain to the current users selected collection group
  for (let i = 0; i < productsResponse.data.data.products.length; i++) {
    for (let j = 0; j < userCollection.length; j++) {
      if (productsResponse.data.data.products[i].id === userCollection[j]) {
        userCollectionProducts.push(productsResponse.data.data.products[i]);
      }
    }
  }

  //Create image buffer for all collection group items and add them to the collection object
  for (let i = 0; i < userCollectionProducts.length; i++) {
    if (userCollectionProducts[i].imageKey !== null) {
      let imagesResponse = await IndexAPI.get(
        `/images/${userCollectionProducts[i].imageKey}`,
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

  //Provide the collection and cart quantity as props to the collection group component
  return {
    props: {
      collection: userCollectionProducts,
      cartQty: cartResponse.data.data.cart.length,
    },
    revalidate: 1,
  };
}

export default CollectionGroups;
