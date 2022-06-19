/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import IndexAPI from "../../../apis/indexAPI";
// import PropTypes from "prop-types";
import { ICart } from "../../../interfaces";
import { Grid } from "@mui/material";
import {
  getCartReducer,
  removeFromCartReducer,
  setCartQtyReducer,
} from "../../../reducers/cartReducers";
import { useAppDispatch } from "../../../hooks";

//Cart Products props interface
interface ICartProducts {
  setCart: (arg0: any) => void;
}

//Cart Products functional component
const CartProducts = (props: ICartProducts) => {
  //Cart Products states
  const [cart, setCart] = useState<ICart[]>([]);
  const [prices, setPrices] = useState<number[]>([]);
  const [cartQty, setCartQty] = useState<number[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [hasQty, setHasQty] = useState(false);

  //NextJS router
  const router = useRouter();

  //Redux dispatch
  const dispatch = useAppDispatch();

  let sub = 0;
  const priceArray: number[] = [];
  const qtyArray: number[] = [];
  useEffect(() => {
    const fetchData = () => {
      try {
        //Get all items in cart
        const cartResponse = IndexAPI.get(`/cart`);

        //Add cart item images to get '/cart' json response
        for (let i = 0; i < cartResponse.data.data.cart.length; i++) {
          if (cartResponse.data.data.cart[i].imagekey !== null) {
            const imagesResponse = await IndexAPI.get(
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

        //Set the cart subtotal
        if (cart.length === 0) {
          sub = 0;
        } else {
          sub = priceArray.reduce(function (a, b) {
            return a + b;
          }, 0);
        }
        if (prices.length === 0) {
          setSubtotal(sub);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [props]);

  //Delete an item from the cart
  const deleteFromCart = async (id: string) => {
    try {
      //Redux request to delete an item from the cart
      await dispatch(removeFromCartReducer(id));
      // await IndexAPI.put("/cart/delete", {
      //   id: id,
      // });

      //Request and set the updated cart after item deleted
      const cartResponse = await dispatch(getCartReducer());
      // const cartResponse = await IndexAPI.get(`/cart`);
      props.setCart(cartResponse.payload.cart.length);

      //Set the cart subtotal
      if (cart.length === 0) {
        sub = 0;
      } else {
        for (let i = 0; i < cart.length; i++) {
          sub += parseInt(cart[i].price);
        }
      }
      setSubtotal(sub);

      //Resets the array of prices in the cart after an item is deleted
      const resetPricesArray = [];
      for (let i = 0; i < cart.length; i++) {
        resetPricesArray.push(parseInt(cart[i].price));
      }
      setPrices(resetPricesArray);
    } catch (err) {
      console.log(err);
    }
  };

  //Set the quantity of items in the cart and calculate the total price
  const setItemQty = async (item: ICart, e: string) => {
    try {
      setPrices(priceArray);
      //Calculate the current total price of items in the cart
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === item.id) {
          priceArray[i] = parseInt(cart[i].price) * parseInt(e);
        } else {
          if (prices[i] !== undefined) {
            priceArray[i] = prices[i];
          } else {
            priceArray[i] = 0;
          }
        }
        setPrices(priceArray);

        if (cart[i].id === item.id) {
          qtyArray[i] = parseInt(e);
        } else {
          if (cartQty[i] !== undefined) {
            qtyArray[i] = cartQty[i];
          } else {
            qtyArray[i] = 0;
          }
        }
        setCartQty(qtyArray);

        for (let i = 0; i < qtyArray.length; i++) {
          if (qtyArray[i] <= 0 || isNaN(qtyArray[i])) {
            setHasQty(false);
            break;
          } else {
            setHasQty(true);
          }
        }
      }

      //Redux request the item quantities in cart table
      await dispatch(setCartQtyReducer(qtyArray));
      // await IndexAPI.put("/cart/quantity", {
      //   cartQty: qtyArray,
      // });

      //Set the cart subtotal
      sub = 0;
      sub = priceArray.reduce(function (a, b) {
        return a + b;
      }, 0);
      setSubtotal(sub);
    } catch (err) {
      console.log(err);
    }
  };

  //Cart product component on cart page
  return (
    <Grid className="full-height">
      {/* Map through all items in the cart */}
      {cart &&
        cart.map((item: ICart) => {
          return (
            <Grid key={item.id}>
              <Grid className="cart-item-details">
                <Grid className="cart-item-info">
                  {/* Delete item from cart button */}
                  <span
                    className="pointer"
                    onClick={() => deleteFromCart(item.id)}
                  >
                    <h3>X</h3>
                  </span>
                  {/* Display item thumbnail */}
                  <span className="cart-item-div">
                    <img
                      className="cart-item-thumbnail"
                      src={`data:image/png;base64,${item.imageBuffer}`}
                      alt="Thumbnail"
                    />
                  </span>
                  {/* Display item title */}
                  <Grid className="cart-item-title">{item.title}</Grid>
                </Grid>
                {/* Enter in the item quantity to be purchased */}
                <Grid className="cart-item-qty">
                  <input
                    onChange={(event) => setItemQty(item, event.target.value)}
                    className="item-qty-input"
                    type="number"
                    min="1"
                    placeholder="0"
                  />
                </Grid>
                {/* Price of 1 unit of the relevant product */}
                <Grid className="align-right">
                  <span>${item.price}.00</span>
                </Grid>
              </Grid>
              <hr className="no-margin" />
            </Grid>
          );
        })}
      {/* Subtotal of all cart items multiplied by the quantity specified */}
      <Grid className="align-right subtotal-div">
        <span>subtotal</span>
        <span>${subtotal}.00</span>
      </Grid>
      {/* Display checkout button only if a quantity greater that 0 is provided for all products in the cart */}
      {hasQty ? (
        <Grid className="align-right no-margin">
          {/* Routes to the checkout page */}
          <button>
            <Grid onClick={() => router.push("/cart/checkout")}>Checkout</Grid>
          </button>
        </Grid>
      ) : (
        ""
      )}
    </Grid>
  );
};

// CartProducts.propTypes = {
//   cart: PropTypes.array,
//   setCart: PropTypes.func,
// };

export default CartProducts;
