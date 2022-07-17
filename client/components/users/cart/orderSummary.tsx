/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
// import PropTypes from "prop-types";
import { ICart } from "../../../interfaces";
import { Grid } from "@mui/material";

//Order Summary props interface
interface ICartSummary {
  cartProducts: ICart[];
  cartPrices: string[];
  subtotal: number;
}

//Order Summary functional component
const OrderSummary = (props: ICartSummary) => {
  //Order Summary states
  const [cart] = useState<ICart[]>(props.cartProducts);
  const [cartPrices] = useState(props.cartPrices);
  const [subtotal] = useState<number>(props.subtotal);

  return (
    <Grid>
      {/* Map through all items in the cart */}
      {cart &&
        cartPrices &&
        cart.map((item: ICart, index: number) => {
          return (
            <Grid key={item.id}>
              <Grid className="order-item">
                <Grid className="order-item-details">
                  <Grid className="order-item-info">
                    {/* Display item thumbnail */}
                    <img
                      className="order-item-thumbnail"
                      src={item.image_url}
                      alt="Thumbnail"
                    />
                    {/* Display item title */}
                    <Grid className="align-left">
                      <h3>{item.title}</h3>
                    </Grid>
                  </Grid>
                  {/* Display item price */}
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
      {/* Subtotal of all cart items multiplied by the quantity specified */}
      <Grid className="two-column-div">
        <h3 className="align-left">subtotal</h3>
        <h3 className="align-right">${subtotal}.00</h3>
      </Grid>
    </Grid>
  );
};

// OrderSummary.propTypes = {
//   cartProducts: PropTypes.array,
//   cartPrices: PropTypes.array,
//   subtotal: PropTypes.number,
// };

export default OrderSummary;
