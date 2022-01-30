import React, { useEffect, useState } from "react";
import CartModalC from "./cartSummaryModal";
import HeaderC from "./header";
import FooterC from "./footer";
import IndexAPI from "../apis/indexAPI";

const AboutC = () => {
  const [, setCart] = useState([]);
  const [cartState, setCartState] = useState(false);
  const [cartQty, setCartQty] = useState(0);
  const [cartCost, setCartCost] = useState(0);

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

  return (
    <div>
      <CartModalC cartState={cartState} cartQty={cartQty} cartCost={cartCost} />
      <HeaderC />
      <div className="main-body">
        <div>
          <div className="align-center">
            <h1>about</h1>
          </div>
          <div className="profile-info">
            <div className="profile-image-div">
              <div className="big-image-div">
                <img
                  className="big-image"
                  src="../images/profile-image.jpg"
                  alt="Profile"
                />
              </div>
              <div></div>
              <div></div>
            </div>
            <div className="about-info">
              <h3>&emsp; &emsp; {process.env.REACT_APP_INFO_PARAGRAPH_1}</h3>
              <h3>&emsp; &emsp; {process.env.REACT_APP_INFO_PARAGRAPH_2}</h3>
            </div>
          </div>
        </div>
        <FooterC />
      </div>
    </div>
  );
};

export default AboutC;
