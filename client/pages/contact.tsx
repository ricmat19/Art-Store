import { useState, useRef } from "react";
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
const onSubmit = (onSubmitProps: any) => {
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const subjectInput = useRef(null);
  const messageInput = useRef(null);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await IndexAPI.post("/contact", {
        name: name,
        email: email,
        subject: subject,
        message: message,
      });

      // nameInput.current.value = "";
      // emailInput.current.value = "";
      // subjectInput.current.value = "";
      // messageInput.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };

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
              {(formik) => {
                <Form className="contact-form" method="POST" action="/contact">
                  <Grid className="subject-line">
                    <Field
                      type="text"
                      ref={nameInput}
                      onChange={(e: any) => setName(e.target.value)}
                      name="name"
                      placeholder="your name..."
                    />
                    <ErrorMessage name="email" component="div">
                      {(errorMsg) => (
                        <Grid className="errorMsg">{errorMsg}</Grid>
                      )}
                    </ErrorMessage>
                  </Grid>
                  <Grid className="subject-line">
                    <Field
                      type="email"
                      ref={emailInput}
                      onChange={(e: any) => setEmail(e.target.value)}
                      name="email"
                      placeholder="your email..."
                      required
                    />
                    <ErrorMessage name="email" component="div">
                      {(errorMsg) => (
                        <Grid className="errorMsg">{errorMsg}</Grid>
                      )}
                    </ErrorMessage>
                  </Grid>
                  <Grid className="subject-line">
                    <Field
                      type="text"
                      ref={subjectInput}
                      onChange={(e: any) => setSubject(e.target.value)}
                      name="subject"
                      placeholder="the subject..."
                      required
                    />
                    <ErrorMessage name="email" component="div">
                      {(errorMsg) => (
                        <Grid className="errorMsg">{errorMsg}</Grid>
                      )}
                    </ErrorMessage>
                  </Grid>
                  <Grid className="subject-line">
                    <Field
                      name="message"
                      ref={messageInput}
                      onChange={(e: any) => setMessage(e.target.value)}
                      placeholder="your message..."
                      rows={7}
                      required
                    />
                  </Grid>
                  <Grid className="align-right">
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      disabled={!formik.isValid}
                    >
                      submit
                    </button>
                  </Grid>
                </Form>;
              }}
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
