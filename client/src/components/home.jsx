import React, { useEffect, useState } from "react";
// import CartModalC from "./cartSummaryModal";
import HeaderC from "./header";
import CoverC from "./cover";
import FooterC from "./footer";
import IndexAPI from "../apis/indexAPI";

const HomeC = () => {
  const [setProducts] = useState([]);
  // const [, setCart] = useState([]);
  // const [cartState, setCartState] = useState(false);
  // const [cartQty, setCartQty] = useState(0);
  // const [cartCost, setCartCost] = useState(0);
  const [twoDImage, setTwoDImage] = useState("");
  const [threeDImage, setThreeDImage] = useState("");
  const [comicImage, setComicImage] = useState("");

  let productResponse;
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const cartResponse = await IndexAPI.get(`/cart`);
        // setCart(cartResponse.data.data.cart);

        // setCartQty(cartResponse.data.data.cart.length);

        // let price = 0;
        // for (let i = 0; i < cartResponse.data.data.cart.length; i++) {
        //   price += parseInt(cartResponse.data.data.cart[i].price);
        // }
        // setCartCost(price);

        // if (cartResponse.length !== 0) {
        //   setCartState(true);
        // } else {
        //   setCartState(false);
        // }

        productResponse = await IndexAPI.get(`/products`);
        console.log(productResponse.data.data.products)

        for (let i = 0; i < productResponse.data.data.products.length; i++) {
          if (productResponse.data.data.products[i].imagekey !== null) {
            let imagesResponse = await IndexAPI.get(
              `/images/${productResponse.data.data.products[i].imagekey}`,
              {
                responseType: "arraybuffer",
              }
            ).then((response) =>
              Buffer.from(response.data, "binary").toString("base64")
            );

            if (
              productResponse.data.data.products[i].product === "print"
            ) {
              setTwoDImage(`data:image/png;base64,${imagesResponse}`);
            }
            if (
              productResponse.data.data.products[i].product === "model"
            ) {
              setThreeDImage(`data:image/png;base64,${imagesResponse}`);
            }
            if (
              productResponse.data.data.products[i].product === "comic"
            ) {
              setComicImage(`data:image/png;base64,${imagesResponse}`);
            }
          }
        }
        setProducts(productResponse.data.data.products);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* <CartModalC cartState={cartState} cartQty={cartQty} cartCost={cartCost} /> */}
      <HeaderC />
      <CoverC/>
      <div className="main-body home-menu">
        <a href="products/print">
          <div className="menu-item">
            <img className="menu-image" src={twoDImage} alt="2D Print" />
            <p className="title">2D Prints</p>
          </div>
        </a>
        <a href="products/model">
          <div className="menu-item">
            <img className="menu-image" src={threeDImage} alt="3D Model" />
            <p className="title">3D Models</p>
          </div>
        </a>
        <a href="products/comic">
          <div className="menu-item">
            <img className="menu-image" src={comicImage} alt="Comic" />
            <p className="title">Comics</p>
          </div>
        </a>
      </div>
      <FooterC />
    </div>
  );
};

export default HomeC;
