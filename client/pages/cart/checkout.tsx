import { useState } from "react";
import { useRouter } from "next/router";
import OrderSummary from "../../components/users/cart/orderSummary";
import MainNav from "../../components/users/mainNav";
import PagesNav from "../../components/users/pagesNav";
import Footer from "../../components/footer";
import IndexAPI from "../../apis/indexAPI";
import { Grid, MenuItem } from "@mui/material";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Head from "next/head";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { clearCartReducer } from "../../reducers/cartReducers";
import { useAppDispatch } from "../../hooks";

//Cart checkout prop interface
interface ICheckoutForm {
  router: string[];
}
interface ICheckout {
  cart: any;
  priceArray: string[];
  sub: number | (() => number);
}

//Cart checkout Formik form initial values
const initialValues = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  suite: "",
  city: "",
  state: "",
  zipCode: "",
  phone: "",
};

//Cart checkout Formik form onSubmit function
const onSubmit = async (
  values: ICheckoutForm,
  onSubmitProps: { resetForm: () => void }
) => {
  try {
    //Remove all items from the cart after form submission
    await IndexAPI.put(`/cart/deleteAll`);

    //Route back to store page
    values.router.push("/");
  } catch (err) {
    console.log(err);
  }
  onSubmitProps.resetForm();
};

//Cart checkout Formik form validation schema
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
  zipCode: Yup.string().required("ZipCode is required"),
  phone: Yup.string().required("Phone Number is required"),
});

//Cart checkout functional component
const Checkout = (props: ICheckout) => {
  //Cart checkout states
  const [cart] = useState(props.cart);
  const [cartPrices] = useState(props.priceArray);
  const [subtotal] = useState<number>(props.sub);

  //Next router function
  const router = useRouter();

  //Redux function
  const dispatch = useAppDispatch();

  // const stripe: any = useStripe();
  // const elements: any = useElements();

  //Stripe function
  let stripePromise = loadStripe("");
  if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC !== undefined) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC);
  }

  //Set style for card element menu items
  const cardElementMenuItems = {
    style: {
      base: {
        fontFamily: "Rajdhani",
      },
    },
    hidePostalCode: true,
  };

  //Function to clear the cart and then route back to cart page
  const clearCart = async () => {
    try {
      await dispatch(clearCartReducer());
      await router.push("/cart");
    } catch (err) {
      console.log(err);
    }
  };

  //Checkout component
  return (
    <Grid>
      <Head>
        <title>artHouse19-Checkout</title>
        <meta name="description" content="artHouse19 checkout page."></meta>
      </Head>
      {/* Main navigation component */}
      <MainNav cartQty={cart.length} />
      {/* Pages navigation component */}
      <PagesNav />
      <Grid className="checkout-div">
        {/* Stripe element component */}
        <Elements stripe={stripePromise}>
          <Formik
            initialValues={{
              initialValues: initialValues,
              // router: router,
            }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            validateOnMount
          >
            {/* Checkout form */}
            <Form className="checkout-info">
              <h1>checkout information</h1>
              <Grid className="checkout-info-div">
                <Grid className="checkout-email-div">
                  {/* Checkout form email input field */}
                  <Field
                    type="email"
                    name="email"
                    placeholder="email"
                    as="input"
                  />
                  <ErrorMessage name="email" component="div">
                    {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
                  </ErrorMessage>
                </Grid>
                <Grid className="two-column-div">
                  <Grid sx={{ display: "grid" }}>
                    {/* Checkout form first name input field */}
                    <Field
                      as="input"
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                    />
                    <ErrorMessage name="firstName" component="div">
                      {(errorMsg) => (
                        <Grid className="errorMsg">{errorMsg}</Grid>
                      )}
                    </ErrorMessage>
                  </Grid>
                  <Grid sx={{ display: "grid" }}>
                    {/* Checkout form last name input field */}
                    <Field
                      as="input"
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                    />
                    <ErrorMessage name="lastName" component="div">
                      {(errorMsg) => (
                        <Grid className="errorMsg">{errorMsg}</Grid>
                      )}
                    </ErrorMessage>
                  </Grid>
                </Grid>
                <Grid className="checkout-address-div">
                  {/* Checkout form address input field */}
                  <Field
                    as="input"
                    type="text"
                    name="address"
                    placeholder="Address"
                  />
                  <ErrorMessage name="address" component="div">
                    {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
                  </ErrorMessage>
                </Grid>
                <Grid className="checkout-suite-div">
                  {/* Checkout form suite input field */}
                  <Field as="input" type="text" name="suite" />
                  <ErrorMessage name="suite" component="div">
                    {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
                  </ErrorMessage>
                </Grid>
                <Grid className="select-three-column-div">
                  <Grid sx={{ display: "grid" }}>
                    {/* Checkout form city input field */}
                    <Field
                      as="input"
                      type="text"
                      name="city"
                      placeholder="city"
                    />
                    <ErrorMessage name="city" component="div">
                      {(errorMsg) => (
                        <Grid className="errorMsg">{errorMsg}</Grid>
                      )}
                    </ErrorMessage>
                  </Grid>
                  <Grid sx={{ display: "grid" }}>
                    {/* Checkout form state drop-down input field */}
                    <Field as="select" name="state" placeholder="state">
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
                    </Field>
                    <ErrorMessage name="state" component="div">
                      {(errorMsg) => (
                        <Grid className="errorMsg">{errorMsg}</Grid>
                      )}
                    </ErrorMessage>
                  </Grid>
                  <Grid sx={{ display: "grid" }}>
                    {/* Checkout form zip code input field */}
                    <Field
                      as="input"
                      type="number"
                      name="zip code"
                      placeholder="ZIP code"
                    />
                    <ErrorMessage name="zip code" component="div">
                      {(errorMsg) => (
                        <Grid className="errorMsg">{errorMsg}</Grid>
                      )}
                    </ErrorMessage>
                  </Grid>
                </Grid>
                <Grid className="checkout-phone-div">
                  {/* Checkout form telephone input field */}
                  <Field
                    as="input"
                    type="tel"
                    name="phone"
                    placeholder="phone #"
                  />
                  <ErrorMessage name="phone" component="div">
                    {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
                  </ErrorMessage>
                </Grid>
              </Grid>
              <Grid>
                <h1>payment information</h1>
                <Grid>
                  <Grid className="grid">
                    <Grid className="grid payment-input">
                      {/* ? */}
                      <CardElement
                        className="card-element"
                        options={cardElementMenuItems}
                      />
                    </Grid>
                    <Grid className="grid payment-input">
                      {/* Checkout form payment method input field */}
                      <Field
                        as="input"
                        type="text"
                        name="payment"
                        placeholder="name on card"
                      />
                      <ErrorMessage name="payment" component="div">
                        {(errorMsg) => (
                          <Grid className="errorMsg">{errorMsg}</Grid>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid className="two-column-div checkout-disclaimer-container">
                      {/* Checkout form payment confirmation checkbox input field */}
                      <Field type="checkbox" required />
                      <Grid className="align-justify">
                        By clicking the button below, you are accepting that no
                        real purchases will be made, no payments will be
                        processed, and no personal information, such as: names,
                        addresses, and credit card information will be used.
                      </Grid>
                    </Grid>
                    <Grid className="credit-card-MenuItem">
                      {/* Checkout submit button, clearing cart */}
                      <button
                        className="justify-right"
                        onClick={() => clearCart()}
                      >
                        pay
                      </button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Elements>
        <Grid className="order-summary-container">
          {/* Order summary component */}
          <OrderSummary
            cartProducts={cart}
            cartPrices={cartPrices}
            subtotal={subtotal}
          />
        </Grid>
      </Grid>
      {/* Footer component */}
      <Footer />
    </Grid>
  );
};

export async function getStaticProps() {
  // Get cart content
  const cartResponse = await IndexAPI.get(`/cart`);

  //Calculate the price of each item in the cart multiplied by it's quantity
  const cartPriceArray: number[] = [];
  for (let i = 0; i < cartResponse.data.data.cart.length; i++) {
    const itemSummaryPrice =
      cartResponse.data.data.cart[i].price * cartResponse.data.data.qty[i];
    cartPriceArray.push(itemSummaryPrice);
  }

  //Calculate the cart's subtotal
  const sub = cartPriceArray.reduce(function (a, b) {
    return a + b;
  }, 0);

  //Create and add image buffer to all items in cart object
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

  //Provide the cart object and cart prices as props to the checkout component
  return {
    props: {
      cart: cartResponse.data.data.cart,
      priceArray: cartPriceArray,
      sub: sub,
    },
    revalidate: 1,
  };
}

export default Checkout;
