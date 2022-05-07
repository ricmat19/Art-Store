import IndexAPI from "../apis/indexAPI";
import MainNav from "../components/users/mainNav";
import PagesNav from "../components/users/pagesNav";
import FooterC from "../components/footer";
import Head from "next/head";
import { Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};
const onSubmit = (values: any, onSubmitProps: any) => {
  IndexAPI.post("/contact", {
    name: values.name,
    email: values.email,
    subject: values.subject,
    message: values.message,
  });
  onSubmitProps.resetForm();
};
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
});

const Contact = (props: any) => {
  return (
    <Grid>
      <Head>
        <title>artHouse19-Contact</title>
        <meta
          name="description"
          content="Contact page if you want to reach out to artHouse19"
        ></meta>
      </Head>
      <MainNav cartQty={props.cartQty} />
      <PagesNav />
      <Grid className="main-body">
        <Grid>
          <Grid className="align-center">
            <h1 className="main-title">contact</h1>
          </Grid>
          <Grid className="form-div">
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
              validateOnChange={false}
              validateOnBlur={false}
              validateOnMount
            >
              <Form className="contact-form" method="POST" action="/contact">
                <Grid className="subject-line">
                  <Field as="input" name="name" placeholder="your name..." />
                  <ErrorMessage name="name" component="div">
                    {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
                  </ErrorMessage>
                </Grid>
                <Grid className="subject-line">
                  <Field
                    as="input"
                    type="email"
                    name="email"
                    placeholder="your email..."
                  />
                  <ErrorMessage name="email" component="div">
                    {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
                  </ErrorMessage>
                </Grid>
                <Grid className="subject-line">
                  <Field
                    as="input"
                    type="text"
                    name="subject"
                    placeholder="the subject..."
                  />
                  <ErrorMessage name="subject" component="div">
                    {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
                  </ErrorMessage>
                </Grid>
                <Grid className="subject-line">
                  <Field
                    as="textarea"
                    name="message"
                    placeholder="your message..."
                    rows={7}
                  />
                  <ErrorMessage name="message" component="div">
                    {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
                  </ErrorMessage>
                </Grid>
                <Grid className="align-right">
                  <button type="submit">submit</button>
                </Grid>
              </Form>
            </Formik>
          </Grid>
        </Grid>
        <FooterC />
      </Grid>
    </Grid>
  );
};

export async function getStaticProps() {
  const cartResponse = await IndexAPI.get(`/cart`);

  return {
    props: {
      cartQty: cartResponse.data.data.cart.length,
    },
    revalidate: 1,
  };
}

export default Contact;
