/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
// import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ICart } from "../../../interfaces";
import { Grid } from '@mui/material';
// import { CartContext } from "../context/CartContext";

interface ICartSummary {
  cartProducts: ICart[];
  cartPrices: any;
  subtotal: number;
}

const OrderSummary = (props: ICartSummary) => {
  const [cart] = useState<ICart[]>(props.cartProducts);
  const [cartPrices] = useState(props.cartPrices);
  const [subtotal] = useState<number>(props.subtotal);

  // const { cart, setCart } = useContext(CartContext);

  return (
    <Grid>
      {cart &&
        cartPrices &&
        cart.map((item: any, index: number) => {
          return (
            <Grid key={item.id}>
              <Grid className="order-item">
                <Grid className="order-item-details">
                  <Grid className="order-item-info">
                    <img
                      className="order-item-thumbnail"
                      src={`data:image/png;base64,${item.imageBuffer}`}
                      alt="Thumbnail"
                    />
                    <Grid className="align-left">
                      <h3>{item.title}</h3>
                    </Grid>
                  </Grid>
                  <Grid className="align-right">
                    <span>
                      <h3 className="align-right">${cartPrices[index]}.00</h3>
                    </span>
                  </Grid>
                </Grid>
              </Grid>
              {index !== cart.length - 1 ? <hr className="no-margin" /> : ""}
            </Grid>
          );
        })}
      <hr className="no-margin" />
      <Grid className="two-column-div">
        <h3 className="align-left">subtotal</h3>
        <h3 className="align-right">${subtotal}.00</h3>
      </Grid>
    </Grid>
  );
};

OrderSummary.propTypes = {
  cartProducts: PropTypes.array,
  cartPrices: PropTypes.array,
  subtotal: PropTypes.number,
};

export default OrderSummary;
