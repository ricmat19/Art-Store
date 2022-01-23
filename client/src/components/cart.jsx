import React, { useEffect, useState } from "react";
import CartProductC from "./cartProduct";
import HeaderC from "./header";
import FooterC from "./footer";
import IndexAPI from "../apis/indexAPI";

const CartC = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
        setCart(cartResponse.data.data.cart);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <HeaderC cartQty={cart.length}/>
      <div className="main-body">
        <div>
          <div className="center">
            <p className="title">Shopping Cart</p>
          </div>
          <div className="cart-table">
            <div className="table-headers">
              <p>item</p>
              <p className="align-center">quantity</p>
              <p className="align-right">price</p>
            </div>
            <hr className="table-hr" />
            <div className="cart-items-container">
              <CartProductC setCart={setCart}/>
            </div>
            <div className="align-right cart-button">
              <button>
                <a href="/checkout">Checkout</a>
              </button>
            </div>
          </div>
        </div>
        <FooterC />
      </div>
    </div>
  );
};

export default CartC;
