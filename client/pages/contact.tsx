import { useState, useRef } from "react";
import IndexAPI from "../apis/indexAPI";
import MainNav from "../components/users/mainNav";
import PagesNav from "../components/users/pagesNav";
import FooterC from "../components/footer";
import Head from "next/head";
import { Grid } from "@mui/material";

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
            <form className="contact-form" method="POST" action="/contact">
              <Grid className="subject-line">
                <input
                  type="text"
                  ref={nameInput}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  placeholder="your name..."
                />
              </Grid>
              <Grid className="subject-line">
                <input
                  type="email"
                  ref={emailInput}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  placeholder="your email..."
                  required
                />
              </Grid>
              <Grid className="subject-line">
                <input
                  type="text"
                  ref={subjectInput}
                  onChange={(e) => setSubject(e.target.value)}
                  name="subject"
                  placeholder="the subject..."
                  required
                />
              </Grid>
              <Grid className="subject-line">
                <textarea
                  name="message"
                  ref={messageInput}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="your message..."
                  rows={7}
                  required
                ></textarea>
              </Grid>
              <Grid className="align-right">
                <button onClick={handleSubmit} type="submit">
                  submit
                </button>
              </Grid>
            </form>
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
