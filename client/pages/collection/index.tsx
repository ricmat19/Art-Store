/* eslint-disable @next/next/no-img-element */
import IndexAPI from "../../apis/indexAPI";
import { useState } from "react";
import { useRouter } from "next/router";
import MainNav from "../../components/users/mainNav";
import PagesNav from "../../components/users/pagesNav";
import FooterC from "../../components/footer";
import { Grid } from "@mui/material";
import ReactPaginate from "react-paginate";
import Head from "next/head";

interface ICollection {
  collectionGroups: any[];
  cartQty: number | null | undefined;
}

const Collection = (props: ICollection) => {
  const [pageNumber, setPageNumber] = useState<number>(0);

  const itemsPerPage = 9;
  const pagesVisted = pageNumber * itemsPerPage;

  const displayCollectionGroups = props.collectionGroups
    .slice(pagesVisted, pagesVisted + itemsPerPage)
    .map((group: any) => {
      return (
        <Grid
          className="pointer"
          key={group.collection_group}
          onClick={() => displayCollectionGroup(group)}
        >
          <Grid className="image-container">
            <h1>{group}</h1>
          </Grid>
        </Grid>
      );
    });

  const router = useRouter();

  const displayCollectionGroup = async (group: string) => {
    try {
      router.push(`/collection/${group}`);
    } catch (err) {
      console.log(err);
    }
  };

  const pageCount = Math.ceil(props.collectionGroups.length / itemsPerPage);

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
        <Grid className="gallery-menu">{displayCollectionGroups}</Grid>
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
