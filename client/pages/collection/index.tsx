/* eslint-disable @next/next/no-img-element */
import IndexAPI from "../../apis/indexAPI";
import { useState } from "react";
import { useRouter } from "next/router";
import MainNav from "../../components/users/mainNav";
import PagesNav from "../../components/users/pagesNav";
import FooterC from "../../components/footer";
import CreateCollection from "../../components/users/createCollection";
import { Grid } from "@mui/material";
import ReactPaginate from "react-paginate";
import Head from "next/head";

//Collection props interface
interface ICollectionGroup {
  collection_group: string;
}
interface ICollection {
  collectionGroups: ICollectionGroup[];
  cartQty: number;
}

//Collection functional component
const Collection = (props: ICollection) => {
  //Collection states
  const [pageNumber, setPageNumber] = useState(0);
  const [createCollectionOpen, setCreateCollectionOpen] = useState(false);

  //Next router function
  const router = useRouter();

  // Setup pagination and number of items per page
  const itemsPerPage = 9;
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(props.collectionGroups.length / itemsPerPage);

  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  //Handles the opening/closing of the add to collection modal
  const handleCreateCollectionOpen = () => setCreateCollectionOpen(true);
  const handleCreateCollectionClose = () => setCreateCollectionOpen(false);

  //Display the collection modal
  const displayCollectionModal = (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();
      handleCreateCollectionOpen();
    } catch (err) {
      console.log(err);
    }
  };

  //Map through the list of collection groups and setup their templates
  const displayCollectionGroups = props.collectionGroups
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((group: ICollectionGroup) => {
      return (
        // Route to the collection group's page on click
        <Grid
          className="pointer"
          key={group.collection_group}
          onClick={() => displayCollectionGroup(group)}
        >
          {/* Display the collection group's name */}
          <Grid className="image-container">
            <h1>{group}</h1>
          </Grid>
        </Grid>
      );
    });

  // Route to the selected collection group's page
  const displayCollectionGroup = async (group: ICollectionGroup) => {
    try {
      await router.push(`/collection/${group}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid>
      <Head>
        <title>artHouse86-Collection</title>
        <meta name="description" content="Your collection."></meta>
      </Head>
      <CreateCollection
        open={createCollectionOpen}
        handleClose={handleCreateCollectionClose}
      />
      {/* Main navigation component */}
      <MainNav cartQty={props.cartQty} />
      {/* Pages navigation component */}
      <PagesNav />
      <Grid>
        <Grid>
          <h1 className="main-title">collection</h1>
        </Grid>
        {/* Button to create a collection */}
        <Grid sx={{ display: "grid", justifyContent: "center" }}>
          <button onClick={(e) => displayCollectionModal(e)}>
            create collection
          </button>
        </Grid>
        {/* Display te list of collection groups */}
        <Grid className="gallery-menu">{displayCollectionGroups}</Grid>
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
      <FooterC />
    </Grid>
  );
};

export async function getStaticProps() {
  const cartResponse = await IndexAPI.get(`/cart`);

  const collectionGroupsResponse = await IndexAPI.get(`/collection/groups`);

  const collectionGroups = [];
  for (let i = 0; i < collectionGroupsResponse.data.data.groups.length; i++) {
    collectionGroups.push(
      collectionGroupsResponse.data.data.groups[i].collection_group
    );
  }

  return {
    props: {
      collectionGroups: collectionGroups,
      cartQty: cartResponse.data.data.cart.length,
    },
    revalidate: 1,
  };
}

export default Collection;
