import { useState, useRef } from "react";
import IndexAPI from "../apis/indexAPI";
import HeaderC from "../components/header";
import FooterC from "../components/footer";
import Head from "next/head";

const ContactC = (props: any) => {
  const [cart] = useState(props.cart);

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
    <div>
      <Head>
        <title>artHouse19-Contact</title>
        <meta name="description" content="Contact page if you want to reach out to artHouse19"></meta>
      </Head>
      <HeaderC cartQty={cart.length}/>
      <div className="main-body">
        <div>
          <div className="align-center">
            <h1>contact</h1>
          </div>
          <div className="form-div">
            <form className="contact-form" method="POST" action="/contact">
              <div className="subject-line">
                <input
                  type="text"
                  ref={nameInput}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  placeholder="your name..."
                />
              </div>
              <div className="subject-line">
                <input
                  type="email"
                  ref={emailInput}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  placeholder="your email..."
                  required
                />
              </div>
              <div className="subject-line">
                <input
                  type="text"
                  ref={subjectInput}
                  onChange={(e) => setSubject(e.target.value)}
                  name="subject"
                  placeholder="the subject..."
                  required
                />
              </div>
              <div className="subject-line">
                <textarea
                  name="message"
                  ref={messageInput}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="your message..."
                  rows={7}
                  required
                ></textarea>
              </div>
              <div className="align-right">
                <button onClick={handleSubmit} type="submit">
                  submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <FooterC />
      </div>
    </div>
  );
};

export async function getStaticProps() {

  const cartResponse = await IndexAPI.get(`/cart`);

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

  return {
    props: {
      cart: cartResponse.data.data.cart
    },
    revalidate: 1,
  };
}

export default ContactC;
