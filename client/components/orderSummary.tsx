/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
// import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ICart } from "../interfaces";
// import { CartContext } from "../context/CartContext";

interface ICartSummary {
  cartProducts: ICart[],
  cartPrices: ICart[],
  subtotal: number,
}

const OrderSummaryC = (props:ICartSummary) => {
  const [cart, setCart] = useState<ICart[]>([]);
  const [cartPrices, setCartPrices] = useState<ICart[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);

  // const { cart, setCart } = useContext(CartContext);

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
    <div>
      {cart &&
        cartPrices &&
        cart.map((item: any, index: number) => {
          return (
            <>
              <div className="order-item" key={item.id}>
                <div className="order-item-details">
                  <div className="order-item-info">
                    <img
                      className="order-item-thumbnail"
                      src={`data:image/png;base64,${item.imageBuffer}`}
                      alt="Thumbnail"
                    />
                    <div className="align-left">
                      <h3>{item.title}</h3>
                    </div>
                  </div>
                  <div className="align-right">
                    <span>
                      <h3 className="align-right">${cartPrices[index]}.00</h3>
                    </span>
                  </div>
                </div>
              </div>
              {index !== cart.length - 1 ? <hr className="no-margin" /> : ""}
            </>
          );
        })}
      <hr className="no-margin" />
      <div className="two-column-div">
        <h3 className="align-left">subtotal</h3>
        <h3 className="align-right">${subtotal}.00</h3>
      </div>
    </div>
  );
};

OrderSummaryC.propTypes = {
  cartProducts: PropTypes.object,
  cartPrices: PropTypes.array,
  subtotal: PropTypes.number,
};

export default OrderSummaryC;
