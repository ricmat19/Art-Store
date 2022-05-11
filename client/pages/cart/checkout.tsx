import { useState } from "react";
import { useRouter } from "next/router";
import OrderSummaryC from "../../components/users/cart/orderSummary";
import MainNav from "../../components/users/mainNav";
import PagesNav from "../../components/users/pagesNav";
import FooterC from "../../components/footer";
import IndexAPI from "../../apis/indexAPI";
import { Grid, MenuItem } from "@mui/material";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Head from "next/head";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { clearCart } from "../../features/cart/cartSlice";

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
const onSubmit = (values: any, onSubmitProps: any) => {
  try {
    IndexAPI.put(`/cart/deleteAll`);

    values.router.push("/");
  } catch (err) {
    console.log(err);
  }
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

  const router = useRouter();

  const dispatch = useDispatch();

  // const {cart, setCart, qty} = useContext(CartContext);

  let stripePromise = loadStripe("");
  if (process.env.NEXT_PUBLIC_STRIPEPUBLIC !== undefined) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPEPUBLIC);
  }

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
            initialValues={{
              initialValues: initialValues,
              router: router,
            }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            validateOnMount
          >
            <Form className="checkout-info">
              <h1>checkout information</h1>
              <Grid className="checkout-info-div">
                <Grid className="checkout-email-div">
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
                  <Field as="input" type="text" name="suite" />
                  <ErrorMessage name="suite" component="div">
                    {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
                  </ErrorMessage>
                </Grid>
                <Grid className="select-three-column-div">
                  <Grid sx={{ display: "grid" }}>
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
                    <Field as="input" name="state" placeholder="state">
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
                    <Field
                      as="input"
                      type="number"
                      name="zipcode"
                      placeholder="ZIP code"
                    />
                    <ErrorMessage name="zipcode" component="div">
                      {(errorMsg) => (
                        <Grid className="errorMsg">{errorMsg}</Grid>
                      )}
                    </ErrorMessage>
                  </Grid>
                </Grid>
                <Grid className="checkout-phone-div">
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
                      <CardElement
                        className="card-element"
                        options={cardElementMenuItems}
                      />
                    </Grid>
                    <Grid className="grid payment-input">
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
                      <Field type="checkbox" required />
                      <Grid className="align-justify">
                        By clicking the button below, you are accepting that no
                        real purchases will be made, no payments will be
                        processed, and no personal information, such as: names,
                        addresses, and credit card information will be used.
                      </Grid>
                    </Grid>
                    <Grid className="credit-card-MenuItem">
                      <button
                        className="justify-right"
                        onClick={() => dispatch(clearCart())}
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
