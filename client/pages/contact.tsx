import IndexAPI from "../apis/indexAPI";
import MainNav from "../components/users/mainNav";
import PagesNav from "../components/users/pagesNav";
import Footer from "../components/footer";
import Head from "next/head";
import { Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

//Contact prop interface
interface IContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}
interface IContact {
  cartQty: number | null | undefined;
}

//Contact Formik form initial values
const initialValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

//Contact Formik form onSubmit function
const onSubmit = async (
  values: IContactForm,
  onSubmitProps: { resetForm: () => void }
) => {
  // Submit the contact form to be emailed
  await IndexAPI.post("/contact", {
    name: values.name,
    email: values.email,
    subject: values.subject,
    message: values.message,
  });
  onSubmitProps.resetForm();
};

//Contact Formik form validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
});

//Contact functional component
const Contact = (props: IContact) => {
  // Contact component
  return (
    <Grid>
      <Head>
        <title>artHouse19-Contact</title>
        <meta
          name="description"
          content="Contact page if you want to reach out to artHouse19"
        ></meta>
      </Head>
      {/* Main navigation component */}
      <MainNav cartQty={props.cartQty} />
      {/* Pages navigation component */}
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
              {/* Contact form */}
              <Form className="contact-form" method="POST" action="/contact">
                <Grid className="subject-line">
                  {/* Input field for name */}
                  <Field as="input" name="name" placeholder="your name..." />
                  <ErrorMessage name="name" component="div">
                    {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
                  </ErrorMessage>
                </Grid>
                <Grid className="subject-line">
                  {/* Input field for email */}
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
                  {/* Input field for subject */}
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
                  {/* Textbox input field for message */}
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
                {/* Contact form submit button */}
                <Grid className="align-right">
                  <button type="submit">submit</button>
                </Grid>
              </Form>
            </Formik>
          </Grid>
        </Grid>
        {/* Footer component */}
        <Footer />
      </Grid>
    </Grid>
  );
};

export async function getStaticProps() {
  // Get cart content
  const cartResponse = await IndexAPI.get(`/cart`);

  //Provide the cart quantity as a prop to the contact component
  return {
    props: {
      cartQty: cartResponse.data.data.cart.length,
    },
    revalidate: 1,
  };
}

export default Contact;
