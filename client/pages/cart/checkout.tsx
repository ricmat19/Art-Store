import { useRef, useState } from "react";
// import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import OrderSummaryC from "../../components/users/cart/orderSummary";
import MainNav from "../../components/users/mainNav";
import PagesNav from "../../components/users/pagesNav";
import FooterC from "../../components/footer";
import IndexAPI from "../../apis/indexAPI";
import { Grid } from '@mui/material';
import {
  CardElement,
  // useStripe,
  Elements,
  // useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Head from "next/head";
// import { ICart } from "../../interfaces";
// import { CartContext } from "../context/CartContext";

const CheckoutC = (props: any) => {
  // const stripe: any = useStripe();
  // const elements: any = useElements();

  const [cart] = useState(props.cart);
  const [cartPrices] = useState(props.priceArray);
  const [subtotal] = useState<number>(props.sub);
  const [email, setEmail] = useState<string>("");
  const [firstname, setFirstName] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [suite, setSuite] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const emailInput = useRef(null);
  const firstNameInput = useRef(null);
  const lastNameInput = useRef(null);
  const addressInput = useRef(null);
  const suiteInput = useRef(null);
  const cityInput = useRef(null);
  const stateInput = useRef(null);
  const zipcodeInput = useRef(null);
  const phoneInput = useRef(null);

  const router = useRouter();

  // const {cart, setCart, qty} = useContext(CartContext);

  let stripePromise = loadStripe("");
  if (process.env.NEXT_PUBLIC_STRIPEPUBLIC !== undefined) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPEPUBLIC);
  }

  const handlePayment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // const { err, paymentMethod } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: elements.getElement(CardElement),
    // });
    // if (!err && paymentMethod !== undefined) {
    //   try {
    //     await IndexAPI.put(`/cart/deleteAll`);

    //     router.push("/");
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }

    // if (!err && paymentMethod !== undefined) {
    try {
      await IndexAPI.put(`/cart/deleteAll`);

      router.push("/");
    } catch (err) {
      console.log(err);
    }
    // }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontFamily: "Rajdhani",
      },
    },
    hidePostalCode: true,
  };

  return (
    <Grid>
      <Head>
        <title>artHouse19-Checkout</title>
        <meta name="description" content="artHouse19 checkout page."></meta>
      </Head>
      <MainNav cartQty={cart.length} />
      <PagesNav />
      <Grid className="checkout-div">
        <Elements stripe={stripePromise}>
          <form className="checkout-info" onSubmit={handlePayment}>
            <h1>checkout information</h1>
            <Grid className="checkout-info-div">
              <Grid className="checkout-email-div">
                <input
                  type="email"
                  ref={emailInput}
                  value={email}
                  name="email"
                  placeholder="email"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Grid>
              <Grid className="two-column-div">
                <input
                  type="text"
                  ref={firstNameInput}
                  value={firstname}
                  name="firstname"
                  placeholder="First Name"
                  required
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <input
                  type="text"
                  ref={lastNameInput}
                  value={lastname}
                  name="lastname"
                  placeholder="Last Name"
                  required
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </Grid>
              <Grid className="checkout-address-div">
                <input
                  type="text"
                  ref={addressInput}
                  value={address}
                  name="address"
                  placeholder="Address"
                  required
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </Grid>
              <Grid className="checkout-suite-div">
                <input
                  type="text"
                  ref={suiteInput}
                  value={suite}
                  name="suite"
                  placeholder="apartment, suite, etc. (optional)"
                  onChange={(e) => {
                    setSuite(e.target.value);
                  }}
                />
              </Grid>
              <Grid className="three-column-div">
                <input
                  type="text"
                  ref={cityInput}
                  value={city}
                  name="city"
                  placeholder="city"
                  required
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
                <select
                  ref={stateInput}
                  value={state}
                  name="state"
                  placeholder="state"
                  required
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                >
                  <option>Alabama</option>
                  <option>Alaska</option>
                  <option>Arizona</option>
                  <option>Arkansas</option>
                  <option>California</option>
                  <option>Colorado</option>
                  <option>Connecticut</option>
                  <option>Delaware</option>
                  <option>Florida</option>
                  <option>Georgia</option>
                  <option>Hawaii</option>
                  <option>Idaho</option>
                  <option>Illinois</option>
                  <option>Indiana</option>
                  <option>Iowa</option>
                  <option>Kansas</option>
                  <option>Kentucky</option>
                  <option>Louisiana</option>
                  <option>Maine</option>
                  <option>Maryland</option>
                  <option>Massachusetts</option>
                  <option>Michigan</option>
                  <option>Minnesota</option>
                  <option>Mississippi</option>
                  <option>Missouri</option>
                  <option>Montana</option>
                  <option>Nebraska</option>
                  <option>Nevada</option>
                  <option>New Hampshire</option>
                  <option>New Jersey</option>
                  <option>New Mexico</option>
                  <option>New York</option>
                  <option>North Carolina</option>
                  <option>North Dakota</option>
                  <option>Ohio</option>
                  <option>Oklahoma</option>
                  <option>Oregon</option>
                  <option>Pennsylvania</option>
                  <option>Rhode Island</option>
                  <option>South Carolina</option>
                  <option>South Dakota</option>
                  <option>Tennessee</option>
                  <option>Texas</option>
                  <option>Utah</option>
                  <option>Vermont</option>
                  <option>Virginia</option>
                  <option>Washington</option>
                  <option>West Virginia</option>
                  <option>Wisconsin</option>
                  <option>Wyoming</option>
                </select>
                <input
                  type="number"
                  ref={zipcodeInput}
                  value={zipcode}
                  name="zipcode"
                  placeholder="ZIP code"
                  required
                  onChange={(e) => {
                    setZipcode(e.target.value);
                  }}
                />
              </Grid>
              <Grid className="checkout-phone-div">
                <input
                  type="tel"
                  ref={phoneInput}
                  value={phone}
                  name="phone"
                  placeholder="phone (optional)"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Grid>
              <h1>payment information</h1>
              <Grid>
                <Grid>
                  <Grid className="grid payment-input">
                    <CardElement
                      className="card-element"
                      options={cardElementOptions}
                    />
                  </Grid>
                  <Grid className="grid payment-input">
                    <input type="text" placeholder="name on card" required />
                  </Grid>
                  <Grid className="two-column-div checkout-disclaimer-container">
                    <input type="checkbox" required />
                    <Grid className="align-justify">
                      By clicking the button below, you are accepting that no
                      real purchases will be made, no payments will be
                      processed, and no personal information, such as: names,
                      addresses, and credit card information will be used.
                    </Grid>
                  </Grid>
                  <Grid className="credit-card-option">
                    <button className="justify-right">pay</button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Elements>
        <Grid className="order-summary-container">
          <OrderSummaryC
            cartProducts={cart}
            cartPrices={cartPrices}
            subtotal={subtotal}
          />
        </Grid>
      </Grid>
      <FooterC />
    </Grid>
  );
};

export async function getStaticProps() {
  const cartResponse = await IndexAPI.get(`/cart`);

  let cartPriceArray: number[] = [];
  for (let i = 0; i < cartResponse.data.data.cart.length; i++) {
    let itemSummaryPrice =
      cartResponse.data.data.cart[i].price * cartResponse.data.data.qty[i];
    cartPriceArray.push(itemSummaryPrice);
  }
  // for (let i = 0; i < cart.length; i++) {
  //   let itemSummaryPrice = cart[i].price * qty[i];
  //   cartPriceArray.push(parseInt(itemSummaryPrice));
  // }

  for (let i = 0; i < cartResponse.data.data.cart.length; i++) {
    if (cartResponse.data.data.cart[i].imagekey !== null) {
      // for (let i = 0; i < cart.length; i++) {
      //   if (cart[i].imagekey !== null) {
      let imagesResponse = await IndexAPI.get(
        `/images/${cartResponse.data.data.cart[i].imagekey}`,
        // `/images/${cart[i].imagekey}`,
        {
          responseType: "arraybuffer",
        }
      ).then((response) =>
        Buffer.from(response.data, "binary").toString("base64")
      );

      cartResponse.data.data.cart[i].imageBuffer = imagesResponse;
      // cart[i].imageBuffer = imagesResponse;
    }
  }

  let sub = cartPriceArray.reduce(function (a, b) {
    return a + b;
  }, 0);

  return {
    props: {
      cart: cartResponse.data.data.cart,
      priceArray: cartPriceArray,
      sub: sub,
    },
    revalidate: 1,
  };
}

export default CheckoutC;
