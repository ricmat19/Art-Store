import { useState } from "react";
// import React, { useContext } from "react";
import CartProductsC from "../../components/cartProducts";
import HeaderC from "../../components/header";
import FooterC from "../../components/footer";
import IndexAPI from "../../apis/indexAPI";
// import { CartContext } from "../context/cartContext";

const CartC = (props: any) => {
  const [cart, setCart] = useState(props.cart);

  // const {cart, setCart } = useContext(CartContext);

  return (
    <div>
      <HeaderC cartQty={cart.length} />
      <div className="main-body">
        <div>
          <div className="align-center">
            <h1>Shopping Cart</h1>
          </div>
          <div className="cart-table">
            <div className="table-headers">
              <h3>item</h3>
              <h3 className="align-center">quantity</h3>
              <h3 className="align-right">price</h3>
            </div>
            <hr className="no-margin" />
            <div className="full-height">
              <CartProductsC setCart={setCart} />
            </div>
          </div>
        </div>
        <FooterC />
      </div>
    </div>
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
    return{
      props: {
        cart: cartResponse.data.data.cart
      },
      revalidate: 1
    }
}

export default CartC;
