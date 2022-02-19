import { useState } from "react";
// import { useContext } from "react";
import CartProductsC from "../../components/users/cart/cartProducts";
import HeaderC from "../../components/users/navMenus/pagesNav";
import FooterC from "../../components/users/footer";
import IndexAPI from "../../apis/indexAPI";
import Head from "next/head";
import { Grid } from '@mui/material';
// import { CartContext } from "../../context/CartContext";

const CartC = (props: any) => {

  const [cart, setCart] = useState(props.cart);
  // const {cart, setCart } = useContext(CartContext);

  return (
    <Grid>
      <Head>
        <title>artHouse19-Cart</title>
        <meta name="description" content="artHouse19 cart page."></meta>
      </Head>
      <HeaderC cartQty={cart.length} />
      <Grid className="main-body">
        <Grid>
          <Grid className="align-center">
            <h1>Shopping Cart</h1>
          </Grid>
          <Grid className="cart-table">
            <Grid className="table-headers">
              <h3>item</h3>
              <h3 className="align-center">quantity</h3>
              <h3 className="align-right">price</h3>
            </Grid>
            <hr className="no-margin" />
            <Grid className="full-height">
              <CartProductsC setCart={setCart} />
            </Grid>
          </Grid>
        </Grid>
        <FooterC />
      </Grid>
    </Grid>
  );
};

export async function getStaticProps() {
  const cartResponse = await IndexAPI.get(`/cart`);

  for (let i = 0; i < cartResponse.data.data.cart.length; i++) {
    if (cartResponse.data.data.cart[i].imagekey !== null) {
      let imagesResponse = await IndexAPI.get(
        `/images/${cartResponse.data.data.cart[i].imagekey}`,
        {
          responseType: "arraybuffer",
        }
      ).then((response) =>
        Buffer.from(response.data, "binary").toString("base64")
      );

      cartResponse.data.data.cart[i].imageBuffer = imagesResponse;
    }
  }
  return {
    props: {
      cart: cartResponse.data.data.cart,
    },
    revalidate: 1,
  };
}

export default CartC;
