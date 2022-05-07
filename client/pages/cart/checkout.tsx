import { useRef, useState } from "react";
import { useRouter } from "next/router";
import OrderSummaryC from "../../components/users/cart/orderSummary";
import MainNav from "../../components/users/mainNav";
import PagesNav from "../../components/users/pagesNav";
import FooterC from "../../components/footer";
import IndexAPI from "../../apis/indexAPI";
import { Grid, Select, MenuItem } from "@mui/material";
import {
  CardElement,
  // useStripe,
  Elements,
  // useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Head from "next/head";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  suite: "",
  city: "",
  state: "",
  zipcode: "",
  phone: "",
};
const onSubmit = (onSubmitProps: any) => {
  onSubmitProps.resetForm();
};
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  address: Yup.string().required("Address is required"),
  suite: Yup.string().required("Suite is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zipcode: Yup.string().required("Zipcode is required"),
  phone: Yup.string().required("Phone Number is required"),
});

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

  const cardElementMenuItems = {
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
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            validateOnMount
          >
            {(formik) => {
              <Form className="checkout-info" onSubmit={handlePayment}>
                <h1>checkout information</h1>
                <Grid className="checkout-info-div">
                  <Grid className="checkout-email-div">
                    <Field
                      type="email"
                      ref={emailInput}
                      value={email}
                      name="email"
                      placeholder="email"
                      required
                      onChange={(e: any) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <ErrorMessage name="email" component="div">
                      {(errorMsg) => (
                        <Grid className="errorMsg">{errorMsg}</Grid>
                      )}
                    </ErrorMessage>
                  </Grid>
                  <Grid className="two-column-div">
                    <Field
                      type="text"
                      ref={firstNameInput}
                      value={firstname}
                      name="firstName"
                      placeholder="First Name"
                      required
                      onChange={(e: any) => {
                        setFirstName(e.target.value);
                      }}
                    />
                    <ErrorMessage name="email" component="div">
                      {(errorMsg) => (
                        <Grid className="errorMsg">{errorMsg}</Grid>
                      )}
                    </ErrorMessage>
                    <Field
                      type="text"
                      ref={lastNameInput}
                      value={lastname}
                      name="lastName"
                      placeholder="Last Name"
                      required
                      onChange={(e: any) => {
                        setLastName(e.target.value);
                      }}
                    />
                    <ErrorMessage name="email" component="div">
                      {(errorMsg) => (
                        <Grid className="errorMsg">{errorMsg}</Grid>
                      )}
                    </ErrorMessage>
                  </Grid>
                  <Grid className="checkout-address-div">
                    <Field
                      type="text"
                      ref={addressInput}
                      value={address}
                      name="address"
                      placeholder="Address"
                      required
                      onChange={(e: any) => {
                        setAddress(e.target.value);
                      }}
                    />
                    <ErrorMessage name="email" component="div">
                      {(errorMsg) => (
                        <Grid className="errorMsg">{errorMsg}</Grid>
                      )}
                    </ErrorMessage>
                  </Grid>
                  <Grid className="checkout-suite-div">
                    <Field
                      type="text"
                      ref={suiteInput}
                      value={suite}
                      name="suite"
                      placeholder="apartment, suite, etc. (MenuItemal)"
                      onChange={(e: any) => {
                        setSuite(e.target.value);
                      }}
                    />
                    <ErrorMessage name="email" component="div">
                      {(errorMsg) => (
                        <Grid className="errorMsg">{errorMsg}</Grid>
                      )}
                    </ErrorMessage>
                  </Grid>
                  <Grid className="select-three-column-div">
                    <Field
                      type="text"
                      ref={cityInput}
                      value={city}
                      name="city"
                      placeholder="city"
                      required
                      onChange={(e: any) => {
                        setCity(e.target.value);
                      }}
                    />
                    <ErrorMessage name="email" component="div">
                      {(errorMsg) => (
                        <Grid className="errorMsg">{errorMsg}</Grid>
                      )}
                    </ErrorMessage>
                    <Select
                      ref={stateInput}
                      value={state}
                      name="state"
                      placeholder="state"
                      required
                      onChange={(e: any) => {
                        setState(e.target.value);
                      }}
                    >
                      <MenuItem value={"Alabama"}>Alabama</MenuItem>
                      <MenuItem value={"Alaska"}>Alaska</MenuItem>
                      <MenuItem value={"Arizona"}>Arizona</MenuItem>
                      <MenuItem value={"Arkansas"}>Arkansas</MenuItem>
                      <MenuItem value={"California"}>California</MenuItem>
                      <MenuItem value={"Colorado"}>Colorado</MenuItem>
                      <MenuItem value={"Connecticut"}>Connecticut</MenuItem>
                      <MenuItem value={"Delaware"}>Delaware</MenuItem>
                      <MenuItem value={"Florida"}>Florida</MenuItem>
                      <MenuItem value={"Georgia"}>Georgia</MenuItem>
                      <MenuItem value={"Hawaii"}>Hawaii</MenuItem>
                      <MenuItem value={"Idaho"}>Idaho</MenuItem>
                      <MenuItem value={"Illinois"}>Illinois</MenuItem>
                      <MenuItem value={"Indiana"}>Indiana</MenuItem>
                      <MenuItem value={"Iowa"}>Iowa</MenuItem>
                      <MenuItem value={"Kansas"}>Kansas</MenuItem>
                      <MenuItem value={"Kentucky"}>Kentucky</MenuItem>
                      <MenuItem value={"Louisiana"}>Louisiana</MenuItem>
                      <MenuItem value={"Maine"}>Maine</MenuItem>
                      <MenuItem value={"Maryland"}>Maryland</MenuItem>
                      <MenuItem value={"Michigan"}>Michigan</MenuItem>
                      <MenuItem value={"Minnesota"}>Minnesota</MenuItem>
                      <MenuItem value={"Mississippi"}>Mississippi</MenuItem>
                      <MenuItem value={"Missouri"}>Missouri</MenuItem>
                      <MenuItem value={"Montana"}>Montana</MenuItem>
                      <MenuItem value={"Nebraska"}>Nebraska</MenuItem>
                      <MenuItem value={"Nevada"}>Nevada</MenuItem>
                      <MenuItem value={"New Hampshire"}>New Hampshire</MenuItem>
                      <MenuItem value={"New Jersey"}>New Jersey</MenuItem>
                      <MenuItem value={"New Mexico"}>New Mexico</MenuItem>
                      <MenuItem value={"New York"}>New York</MenuItem>
                      <MenuItem value={"North Carolina"}>
                        North Carolina
                      </MenuItem>
                      <MenuItem value={"North Dakota"}>North Dakota</MenuItem>
                      <MenuItem value={"Ohio"}>Ohio</MenuItem>
                      <MenuItem value={"Oklahoma"}>Oklahoma</MenuItem>
                      <MenuItem value={"Oregon"}>Oregon</MenuItem>
                      <MenuItem value={"Pennsylvania"}>Pennsylvania</MenuItem>
                      <MenuItem value={"Rhode Island"}>Rhode Island</MenuItem>
                      <MenuItem value={"South Carolina"}>
                        South Carolina
                      </MenuItem>
                      <MenuItem value={"South Dakota"}>South Dakota</MenuItem>
                      <MenuItem value={"Tennessee"}>Tennessee</MenuItem>
                      <MenuItem value={"Texas"}>Texas</MenuItem>
                      <MenuItem value={"Utah"}>Utah</MenuItem>
                      <MenuItem value={"Vermont"}>Vermont</MenuItem>
                      <MenuItem value={"Virginia"}>Virginia</MenuItem>
                      <MenuItem value={"Washington"}>Washington</MenuItem>
                      <MenuItem value={"West Virginia"}>West Virginia</MenuItem>
                      <MenuItem value={"Wisconsin"}>Wisconsin</MenuItem>
                      <MenuItem value={"Wyoming"}>Wyoming</MenuItem>
                    </Select>
                    <Field
                      type="number"
                      ref={zipcodeInput}
                      value={zipcode}
                      name="zipcode"
                      placeholder="ZIP code"
                      required
                      onChange={(e: any) => {
                        setZipcode(e.target.value);
                      }}
                    />
                    <ErrorMessage name="email" component="div">
                      {(errorMsg) => (
                        <Grid className="errorMsg">{errorMsg}</Grid>
                      )}
                    </ErrorMessage>
                  </Grid>
                  <Grid className="checkout-phone-div">
                    <Field
                      type="tel"
                      ref={phoneInput}
                      value={phone}
                      name="phone"
                      placeholder="phone (MenuItemal)"
                      onChange={(e: any) => {
                        setPhone(e.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid>
                  <h1>payment information</h1>
                  <Grid>
                    <Grid className="grid">
                      <Grid className="grid payment-input">
                        <CardElement
                          className="card-element"
                          options={cardElementMenuItems}
                        />
                      </Grid>
                      <Grid className="grid payment-input">
                        <Field
                          type="text"
                          placeholder="name on card"
                          required
                        />
                        <ErrorMessage name="email" component="div">
                          {(errorMsg) => (
                            <Grid className="errorMsg">{errorMsg}</Grid>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid className="two-column-div checkout-disclaimer-container">
                        <Field type="checkbox" required />
                        <Grid className="align-justify">
                          By clicking the button below, you are accepting that
                          no real purchases will be made, no payments will be
                          processed, and no personal information, such as:
                          names, addresses, and credit card information will be
                          used.
                        </Grid>
                      </Grid>
                      <Grid className="credit-card-MenuItem">
                        <button
                          className="justify-right"
                          disabled={!formik.isValid}
                        >
                          pay
                        </button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>;
            }}
          </Formik>
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
