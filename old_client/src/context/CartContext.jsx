import React, { useEffect, useState, createContext } from "react";
import IndexAPI from "../apis/indexAPI";
import PropTypes from "prop-types";

export const CartContext = createContext();

function CartContextProvider(props) {
  const [cart, setCart] = useState([]);
  const [qty, setQty] = useState([]);

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
        setQty(cartResponse.data.data.qty);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [props]);

  return (
    <CartContext.Provider value={{ cart, setCart, qty }}>
      {props.children}
    </CartContext.Provider>
  );
}

CartContextProvider.propTypes = {
  children: PropTypes.any,
};

export default CartContextProvider;
