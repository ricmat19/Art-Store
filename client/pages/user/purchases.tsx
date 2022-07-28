/* eslint-disable @next/next/no-img-element */
import { IPurchases } from "../../interfaces";
import MainNav from "../../components/users/mainNav";
import PagesNav from "../../components/users/pagesNav";
import Footer from "../../components/footer";
import IndexAPI from "../../apis/indexAPI";
import Head from "next/head";
import { Grid } from "@mui/material";

//Purchases functional component
const Purchases = (props: IPurchases) => {
  // Purchases component
  return (
    <Grid>
      <Head>
        <title>artHouse19-Purchase History</title>
        <meta
          name="description"
          content="artHouse19 purchase history page."
        ></meta>
      </Head>
      <MainNav cartQty={props.cartQty} />
      <PagesNav />
      <Grid className="main-body">
        {/* Purchases title row */}
        <Grid>
          <Grid className="align-center">
            <h1 className="main-title">Purchase History</h1>
          </Grid>
          <Grid className="cart-table">
            <Grid
              sx={{
                display: "grid",
                gridTemplateColumns: "auto auto auto auto auto",
              }}
            >
              <h3>item</h3>
              <h3>date</h3>
              <h3>price</h3>
              {/* <h3 className="align-right">payment method</h3> */}
              <h3 className="align-right">receipt</h3>
              <h3 className="align-right">invoice</h3>
            </Grid>
            <hr className="no-margin" />
            <Grid className="full-height">
              {/* Map through all items in the user's purchase history */}
              {props.purchases &&
                props.purchases.map((item: IPurchases) => {
                  return (
                    <Grid key={item.id}>
                      <Grid
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "auto auto auto auto auto",
                        }}
                      >
                        <Grid className="purchases-item-info">
                          {/* Display item title */}
                          <Grid className="purchases-item-title">
                            <Grid>{item.title}</Grid>
                            <span className="cart-item-div">
                              <img
                                alt="title"
                                className="cart-item-thumbnail"
                                src={item.image_url}
                              />
                            </span>
                          </Grid>
                        </Grid>
                        {/* Enter in the item quantity to be purchased */}
                        <Grid className="purchases-item-date">
                          {/* Display item date */}
                          <Grid className="purchases-item-date">
                            {item.purchase_date}
                          </Grid>
                        </Grid>
                        {/* Price of 1 unit of the relevant product */}
                        <Grid>
                          <span>${item.price}.00</span>
                        </Grid>
                        <Grid className="align-right">
                          <button>receipt</button>
                        </Grid>
                        <Grid className="align-right">
                          <button>invoice</button>
                        </Grid>
                      </Grid>
                      <hr className="no-margin" />
                    </Grid>
                  );
                })}
              {/* Subtotal of all purchased items multiplied by the quantity purchased */}
              {/* <Grid className="align-right subtotal-div">
                <span>subtotal</span>
                <span>${subtotal}.00</span>
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
        {/* Footer component */}
        <Footer />
      </Grid>
    </Grid>
  );
};

export async function getStaticProps() {
  // Get cart content
  const cartResponse = await IndexAPI.get(`/cart`);
  // Get purchase history content
  const purchasesResponse = await IndexAPI.get(`/purchases`);

  //Provide the purchases object as a prop to the checkout component
  return {
    props: {
      cartQty: cartResponse.data.data.cart.length,
      purchases: purchasesResponse.data.data.purchases,
    },
    revalidate: 1,
  };
}

export default Purchases;
