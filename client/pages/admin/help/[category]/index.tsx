import { useState } from "react";
import IndexAPI from "../../../../apis/indexAPI";
import AdminMainNav from "../../../../components/admin/mainNav";
import AdminPagesNav from "../../../../components/admin/pagesNav";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FooterC from "../../../../components/footer";
import { Button, Grid } from "@mui/material";
import Head from "next/head";

const HelpCategory = (props: any) => {
  const [addOpen, setAddOpen] = useState(false);
  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => setAddOpen(false);

  return (
    <Grid>
      <Head>
        <title>artHouse19-Admin Products</title>
      </Head>
      <AdminAddHelp open={addOpen} handleClose={handleAddClose} />
      <AdminMainNav cartQty={props.cartQty} />
      <AdminPagesNav />
      <Grid>
        <Grid className="plus-icon-div">
          <Button
            onClick={handleAddOpen}
            sx={{
              fontFamily: "Rajdhani",
              fontSize: "20px",
              color: "white",
              textTransform: "none",
            }}
          >
            <FontAwesomeIcon className="plus-icon" icon={faPlus} />
          </Button>
        </Grid>
        <Grid></Grid>
        <Grid></Grid>
      </Grid>
      <FooterC />
    </Grid>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          category: "gettingStarted",
        },
      },
      {
        params: {
          category: "accountProfile",
        },
      },
      {
        params: {
          category: "troubleshooting",
        },
      },
      {
        params: {
          category: "courseTaking",
        },
      },
      {
        params: {
          category: "purchasesRefunds",
        },
      },
    ],
    fallback: false,
  };
}

export async function getStaticProps(context: { params: { category: any } }) {
  const category = context.params.category;
  const helpCategoryResponse = await IndexAPI.get(`/help/${category}`);

  const cartResponse = await IndexAPI.get(`/cart`);

  return {
    props: {
      helpCategory: helpCategoryResponse.data.data.helpCategory,
      cartQty: cartResponse.data.data.cart.length,
    },
    revalidate: 1,
  };
}

export default HelpCategory;
