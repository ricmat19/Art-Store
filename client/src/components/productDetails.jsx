import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import IndexAPI from "../apis/indexAPI";
import CartModalC from "./cartSummaryModal";
import HeaderC from "./header";
import FooterC from "./footer";

const ProductDetailsC = () => {
  const [, setCart] = useState([]);
  const [cartState, setCartState] = useState(false);
  const [cartQty, setCartQty] = useState(0);
  const [cartCost, setCartCost] = useState(0);

  const { product, id } = useParams();
  const { selectedProduct, setSelectedProduct } = useState([]);

  const [imageBuffer, setImageBuffer] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await IndexAPI.get(
          `/products/${product}/${id}`
        );

        if (productResponse.data.data.item.imagekey !== null) {
          let imagesResponse = await IndexAPI.get(
            `/images/${productResponse.data.data.item.imagekey}`,
            {
              responseType: "arraybuffer",
            }
          ).then((response) =>
            Buffer.from(response.data, "binary").toString("base64")
          );

          setImageBuffer(`data:image/png;base64,${imagesResponse}`);
        }
        setSelectedProduct(productResponse.data.data.item);

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

  const addToCart = async (e) => {
    e.preventDefault();
    try {
      const response = await IndexAPI.post("/cart", {
        id: id,
      });

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // const imageURL = async (imagekey) =>{

  //     const imagesResponse = await IndexAPI.get(`/images/${imagekey}`, {
  //         responseType: 'arraybuffer'
  //     })
  //     .then(response => Buffer.from(response.data, 'binary').toString('base64'))
  //     console.log(imagesResponse)
  //     setImages(imagesResponse);
  // }

  // onChange={imageURL(selectedItem.imagekey)}

  return (
    <div>
      <CartModalC cartState={cartState} cartQty={cartQty} cartCost={cartCost} />
      <HeaderC />
      <div className="main-body item-details">
        <div className="item-images">
          <div className="image-div">
            <div className="big-image-div">
              <img className="big-image" src={imageBuffer} alt="product image" />
            </div>
          </div>
        </div>
        <form className="item-form" method="POST" action="/cart">
          <div className="info-div">
            <p className="title">{selectedProduct && selectedProduct.title}</p>
            <div className="info-detail-div">
              <label>price:</label>
              <p className="no-margin">
                ${selectedProduct && selectedProduct.price}.00
              </p>
            </div>
            <div className="info-detail-div">
              <label>quantity:</label>
              <p className="no-margin">{selectedProduct && selectedProduct.qty}</p>
            </div>
            <div className="info-detail-div">
              <label>info:</label>
              <p className="no-margin">{selectedProduct && selectedProduct.info}</p>
            </div>
            <hr className="no-margin" />
            <div className="cart-options">
              <button onClick={addToCart}>Add To Cart</button>
            </div>
          </div>
        </form>
      </div>
      <FooterC />
    </div>
  );
};

export default ProductDetailsC;
