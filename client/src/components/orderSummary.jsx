import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const OrderSummaryC = (props) => {
  const [cart, setCart] = useState([]);
  const [cartPrices, setCartPrices] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCart(props.cartProducts);
        setCartPrices(props.cartPrices);
        setSubtotal(props.subtotal);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  });

  return (
    <div className="order-summary">
      {cart &&
        cartPrices &&
        cart.map((item, index) => {
          return (
            <div className="order-item" key={item.id}>
              <div className="order-item-details">
                <div className="order-item-info">
                  <img
                    className="order-item-thumbnail"
                    src={`data:image/png;base64,${item.imageBuffer}`}
                    alt="Thumbnail"
                  />
                  <div className="order-item-title">{item.title}</div>
                </div>
                <div className="order-item-price">
                  <span>${cartPrices[index]}.00</span>
                </div>
              </div>
            </div>
          );
        })}
      <hr className="checkout-hr" />
      <div className="two-column-div">
        <p className="align-left">subtotal</p>
        <p className="align-right">${subtotal}.00</p>
      </div>
    </div>
  );
};

OrderSummaryC.propTypes = {
  cartProducts: PropTypes.array,
  cartPrices: PropTypes.array,
  subtotal: PropTypes.number,
};

export default OrderSummaryC;
