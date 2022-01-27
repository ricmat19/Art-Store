import React, { useEffect, useRef, useState } from "react";
import OrderSummaryC from "./orderSummary";
import HeaderC from "./header";
import FooterC from "./footer";
import IndexAPI from "../apis/indexAPI";
// import { useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutC = () => {

  const stripe = useStripe();
  const elements = useElements();

  const [cart, setCart] = useState([]);
  const [cartPrices, setCartPrices] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  // const [, setShipment] = useState(null);

  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [suite, setSuite] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phone, setPhone] = useState("");

  const emailInput = useRef(null);
  const firstNameInput = useRef(null);
  const lastNameInput = useRef(null);
  const addressInput = useRef(null);
  const suiteInput = useRef(null);
  const cityInput = useRef(null);
  const stateInput = useRef(null);
  const zipcodeInput = useRef(null);
  const phoneInput = useRef(null);

  let cartPriceArray = [];
  let sub = 0;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartResponse = await IndexAPI.get(`/cart`);

        for (let i = 0; i < cartResponse.data.data.cart.length; i++) {
          let itemSummaryPrice =
            cartResponse.data.data.cart[i].price *
            cartResponse.data.data.qty[i];
          cartPriceArray.push(parseInt(itemSummaryPrice));
        }

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

        setCartPrices(cartPriceArray);

        sub = cartPriceArray.reduce(function (a, b) {
          return a + b;
        }, 0);
        setSubtotal(sub);

        setCart(cartResponse.data.data.cart);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  // let history = useHistory();
  // const handleCheckout = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await IndexAPI.post("/shipment", {
  //       email: email,
  //       firstname: firstname,
  //       lastname: lastname,
  //       address: address,
  //       suite: suite,
  //       city: city,
  //       state: state,
  //       zipcode: zipcode,
  //       phone: phone,
  //     });

  //     setShipment(response.data.data.newShipment);

  //     history.push(`/shipping`);

  //     // emailInput.current.value = "";
  //     // firstNameInput.current.value = "";
  //     // lastNameInput.current.value = "";
  //     // addressInput.current.value = "";
  //     // suiteInput.current.value = "";
  //     // cityInput.current.value = "";
  //     // stateInput.current.value = "";
  //     // zipcodeInput.current.value = "";
  //     // phoneInput.current.value = "";
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handlePayment = async (e) => {
    e.preventDefault();
    const { err, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!err) {
      try {
        const { id } = paymentMethod;
        const response = await IndexAPI.post(`/payment`, {
          amount: 1000,
          id: id,
        });

        if (response.data.success) {
          console.log("Successful payment!");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log(err);
    }
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
    <div>
      <HeaderC />
      <div className="checkout-div">
        <form className="checkout-info" method="POST">
          {/* <h1>express checkout</h1>
          <div className="express-checkout-button-div">
            <button>PayPal</button>
          </div>
          <hr className="checkout-hr" /> */}
          <h1>checkout information</h1>
          {/* <div> */}
            <div className="checkout-info-div">
              <div className="checkout-email-div">
                <input
                  type="email"
                  ref={emailInput}
                  value={email}
                  name="email"
                  placeholder="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="two-column-div">
                <input
                  type="text"
                  ref={firstNameInput}
                  value={firstname}
                  name="firstname"
                  placeholder="First Name"
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
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
              <div className="checkout-address-div">
                <input
                  type="text"
                  ref={addressInput}
                  value={address}
                  name="address"
                  placeholder="Address"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>
              <div className="checkout-suite-div">
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
              </div>
              <div className="three-column-div">
                <input
                  type="text"
                  ref={cityInput}
                  value={city}
                  name="city"
                  placeholder="city"
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
                <select
                  ref={stateInput}
                  value={state}
                  name="state"
                  placeholder="state"
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
                  onChange={(e) => {
                    setZipcode(e.target.value);
                  }}
                />
              </div>
              <div className="checkout-phone-div">
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
              </div>
              {/* <div className="two-column-div">
                <button onClick={handleCheckout}>continue to shipping</button>
                <a href="/cart">
                  <h1>return to cart</h1>
                </a>
              </div> */}
            </div>
          {/* </div> */}
          <div>
            <h1>payment information</h1>
            <div>
              <div className="payment-option">
                {/* <input
                  className="align-left"
                  type="radio"
                  name="payment-method"
                /> */}
                <label className="align-left">Credit Card</label>
              </div>
              <div>
                <form
                  method="POST"
                  onSubmit={handlePayment}
                >
                  <div className="grid payment-input">
                    <CardElement
                      className="card-element"
                      options={cardElementOptions}
                    />
                  </div>
                  <div className="grid payment-input">
                    <input type="text" placeholder="name on card" />
                  </div>
                  <div className="credit-card-option">
                    <button className="payment-button" type="submit">
                      pay
                    </button>
                  </div>
                </form>
                {/* <hr className="payment-hr" />
                <div className="payment-option">
                  <input
                    className="align-left"
                    type="radio"
                    name="payment-method"
                  />
                  <label className="align-left">PayPal</label>
                  <Paypal className="payment-button" />
                </div>
                <hr className="payment-hr" />
                <div className="payment-option">
                    <input className="align-left" type="radio" name="payment-method"/>
                    <label className="align-left">Amazon Pay</label>
                </div> */}
              </div>
            </div>
          </div>
        </form>
        <div className="order-summary-container">
            <OrderSummaryC
              cartProducts={cart}
              cartPrices={cartPrices}
              subtotal={subtotal}
            />
          {/* <div className="two-column-div checkout-discount">
            <input type="text" placeholder="discount code" />
            <button>apply</button>
          </div> */}
        </div>
      </div>
      <FooterC />
    </div>
  );
};

export default CheckoutC;
