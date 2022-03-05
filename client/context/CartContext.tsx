// import { useEffect, useState, createContext } from "react";
// import IndexAPI from "../apis/indexAPI";
// import PropTypes from "prop-types";
// import { ICart } from "../interfaces";

// export const CartContext = createContext(undefined);

function CartContextProvider() {
  //   const [cart, setCart] = useState<ICart[]>([]);
  //   const [qty, setQty] = useState<number[]>([]);
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const cartResponse = await IndexAPI.get(`/cart`);
  //         for (let i = 0; i < cartResponse.data.data.cart.length; i++) {
  //           if (cartResponse.data.data.cart[i].imagekey !== null) {
  //             let imagesResponse = await IndexAPI.get(
  //               `/images/${cartResponse.data.data.cart[i].imagekey}`,
  //               {
  //                 responseType: "arraybuffer",
  //               }
  //             ).then((response) =>
  //               Buffer.from(response.data, "binary").toString("base64")
  //             );
  //             cartResponse.data.data.cart[i].imageBuffer = imagesResponse;
  //           }
  //         }
  //         setCart(cartResponse.data.data.cart);
  //         setQty(cartResponse.data.data.qty);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     fetchData();
  //   }, [props]);
  //   return (
  //     <CartContext.Provider value={{ cart, setCart, qty }}>
  //       {props.children}
  //     </CartContext.Provider>
  //   );
}

// CartContextProvider.propTypes = {
//   children: PropTypes.any,
// };

export default CartContextProvider;
