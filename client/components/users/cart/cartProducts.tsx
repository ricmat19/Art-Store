/* eslint-disable @next/next/no-img-element */
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import IndexAPI from "../../../apis/indexAPI";
import PropTypes from "prop-types";
import { ICart } from "../../../interfaces";
import { Grid } from "@mui/material";

// import { CartContext } from "../context/CartContext";

const CartProducts: FC = (props: any) => {
  const [cart, setCart] = useState<ICart[]>([]);
  const [prices, setPrices] = useState<number[]>([]);
  const [cartQty, setCartQty] = useState<number[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [hasQty, setHasQty] = useState(false);

  const router = useRouter();

  // const { cart } = useContext(CartContext);

  let sub: number = 0;
  let priceArray: number[] = [];
  let qtyArray: number[] = [];
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

  const deleteFromCart = async (id: string) => {
    try {
      await IndexAPI.put("/cart/delete", {
        id: id,
      });

      const cartResponse = await IndexAPI.get(`/cart`);
      props.setCart(cartResponse.data.data.cart);

      if (cart.length === 0) {
        sub = 0;
      } else {
        for (let i = 0; i < cart.length; i++) {
          sub += parseInt(cart[i].price);
        }
      }
      setSubtotal(sub);

      const resetPricesArray = [];
      for (let i = 0; i < cart.length; i++) {
        resetPricesArray.push(parseInt(cart[i].price));
      }
      setPrices(resetPricesArray);
    } catch (err) {
      console.log(err);
    }
  };

  const setItemQty = async (item: ICart, e: string) => {
    try {
      setPrices(priceArray);
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === item.id) {
          priceArray[i] = parseInt(cart[i].price) * parseInt(e);
        } else {
          if (prices[i] !== undefined) {
            priceArray[i] = prices[i];
          } else {
            // priceArray[i] = parseInt(cart[i].price);
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

      await IndexAPI.put("/cart/quantity", {
        cartQty: qtyArray,
      });

      sub = 0;
      sub = priceArray.reduce(function (a, b) {
        return a + b;
      }, 0);
      setSubtotal(sub);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid className="full-height">
      {cart &&
        cart.map((item: ICart) => {
          // priceArray.push(parseInt(item.price));
          // let itemPrice = ``;
          // if (prices[index] === undefined) {
          //   itemPrice = item.price;
          // } else {
          //   itemPrice = prices[index];
          // }
          return (
            <Grid key={item.id}>
              <Grid className="cart-item-details">
                <Grid className="cart-item-info">
                  <span
                    className="pointer"
                    onClick={() => deleteFromCart(item.id)}
                  >
                    <h3>X</h3>
                  </span>
                  <span className="cart-item-div">
                    <img
                      className="cart-item-thumbnail"
                      src={`data:image/png;base64,${item.imageBuffer}`}
                      alt="Thumbnail"
                    />
                  </span>
                  <Grid className="cart-item-title">{item.title}</Grid>
                </Grid>
                <Grid className="cart-item-qty">
                  <input
                    onChange={(event) => setItemQty(item, event.target.value)}
                    className="item-qty-input"
                    type="number"
                    min="1"
                    placeholder="0"
                  />
                </Grid>
                <Grid className="align-right">
                  <span>${item.price}.00</span>
                </Grid>
              </Grid>
              <hr className="no-margin" />
            </Grid>
          );
        })}
      <Grid className="align-right subtotal-div">
        <span>subtotal</span>
        <span>${subtotal}.00</span>
      </Grid>
      {hasQty ? (
        <Grid className="align-right no-margin">
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

CartProducts.propTypes = {
  cart: PropTypes.array,
  setCart: PropTypes.func,
};

export default CartProducts;
