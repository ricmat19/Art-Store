import React, { useState, useRef, useEffect } from "react";
import IndexAPI from "../apis/indexAPI";
import CartModalC from "./cartSummaryModal";
import HeaderC from "./header";
import FooterC from "./footer";

const ContactC = () => {
  const [, setCart] = useState([]);
  const [cartState, setCartState] = useState(false);
  const [cartQty, setCartQty] = useState(0);
  const [cartCost, setCartCost] = useState(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const subjectInput = useRef(null);
  const messageInput = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartResponse = await IndexAPI.get(`/cart`);
        setCart(cartResponse.data.data.cart);

        setCartQty(cartResponse.data.data.cart.length);

        let price = 0;
        for (let i = 0; i < cartResponse.data.data.cart.length; i++) {
          price += parseInt(cartResponse.data.data.cart[i].price);
        }
        setCartCost(price);

        if (cartResponse.length !== 0) {
          setCartState(true);
        } else {
          setCartState(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await IndexAPI.post("/contact", {
        name: name,
        email: email,
        subject: subject,
        message: message,
      });

      nameInput.current.value = "";
      emailInput.current.value = "";
      subjectInput.current.value = "";
      messageInput.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <CartModalC cartState={cartState} cartQty={cartQty} cartCost={cartCost} />
      <HeaderC />
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
                  rows="7"
                  required
                ></textarea>
              </div>
              <div className="form-button-div">
                <button
                  onClick={handleSubmit}
                  type="submit"
                >
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

export default ContactC;
