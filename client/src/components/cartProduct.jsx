import React, { useEffect, useState } from "react";
import IndexAPI from "../apis/indexAPI";
import PropTypes from "prop-types";

const CartProductC = (props) => {
  const [prices, setPrices] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartQty, setCartQty] = useState([]);
  const [subtotal, setSubtotal] = useState();

  let sub = 0;
  let priceArray = [];
  let qtyArray = [];
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
        setCart(cartResponse.data.data.cart)

        if (priceArray.length === 0) {
          for (let i = 0; i < props.cart.length; i++) {
            sub += parseInt(props.cart[i].price);
          }
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

  const deleteFromCart = async (id) => {
    try {
      await IndexAPI.put("/cart/delete", {
        id: id,
      });

      const cartResponse = await IndexAPI.get(`/cart`);
      props.setCart(cartResponse.data.data.cart)

    } catch (err) {
      console.log(err);
    }
  };

  const setItemQty = async (item, e) => {
    try {
      setPrices(priceArray);
      for (let i = 0; i < props.cart.length; i++) {
        if (props.cart[i].id === item.id) {
          priceArray[i] = props.cart[i].price * e;
        } else {
          if (prices[i] !== undefined) {
            priceArray[i] = prices[i];
          } else {
            priceArray[i] = parseInt(props.cart[i].price);
          }
        }

        if (props.cart[i].id === item.id) {
          qtyArray[i] = parseInt(e);
        } else {
          if (cartQty[i] !== undefined) {
            qtyArray[i] = cartQty[i];
          } else {
            qtyArray[i] = 1;
          }
        }
      }
      setPrices(priceArray);
      setCartQty(qtyArray);
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
    <div className="cart-items">
      {console.log(cart)}
      {cart &&
        cart.map((item, index) => {
          priceArray.push(parseInt(item.price));

          let itemPrice = ``;
          if (prices[index] === undefined) {
            itemPrice = item.price;
          } else {
            itemPrice = prices[index];
          }

          return (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-details">
                <div className="cart-item-info">
                  <span
                    className="delete-button"
                    onClick={() => deleteFromCart(item.id)}
                  >
                    X
                  </span>
                  <span className="cart-item-div">
                    <img
                      className="cart-item-thumbnail"
                      src={`data:image/png;base64,${item.imageBuffer}`}
                      alt="Thumbnail"
                    />
                  </span>
                  <div className="cart-item-title">{item.title}</div>
                </div>
                <div className="cart-item-qty">
                  <input
                    onChange={(event) => setItemQty(item, event.target.value)}
                    className="item-qty-input"
                    type="number"
                    placeholder="1"
                  />
                </div>
                <div className="cart-item-price">
                  <span>${itemPrice}.00</span>
                </div>
              </div>
              <hr className="item-hr" />
            </div>
          );
        })}
      <div className="align-right subtotal-div">
        <span>subtotal</span>
        <span>${subtotal}.00</span>
      </div>
    </div>
  );
};

CartProductC.propTypes = {
  cart: PropTypes.array,
  setCart: PropTypes.func
};

export default CartProductC;
