import { useState, useEffect, useRef } from "react";
// import React, { useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useParams } from "react-router";
import IndexAPI from "../../apis/indexAPI";
import HeaderC from "../../components/header";
import FooterC from "../../components/footer";
// import {CartContext} from "../context/CartContext";

const ProductDetailsC = (props: any) => {

  const { product, id } = useParams();
  const [addedModal, setAddedModal] = useState("modal-bg");
  const [imageBuffer] = useState(props.imageBuffer);
  const [selectedProduct] = useState(props.selectedProduct);
  const [cartQty, setCartQty] = useState(props.cartQty);
  const [uniqueItem, setUniqueItem] = useState();

  const router = useRouter();
  router.query.product;

  const addedRef = useRef();

  // const {cart} = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        document.addEventListener("mousedown", (event) => {
          if (addedRef.current !== null) {
            if (!addedRef.current.contains(event.target)) {
              setAddedModal("modal-bg");
            }
          }
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const addToCart = async (e) => {
    e.preventDefault();
    try {
      const cartPostResponse = await IndexAPI.post("/cart", {
        id: id,
      });
      setUniqueItem(cartPostResponse.data.data.uniqueItem);

      const cartResponse = await IndexAPI.get(`/cart`);
      setCartQty(cartResponse.data.data.cart.length);

      setAddedModal("modal-bg active");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* Added to Cart */}
      <div className={addedModal}>
        <form>
          <div ref={addedRef} className="added-content modal-content">
            <h1 className="header">Item Added</h1>
            <div>
              {selectedProduct.title} has {!uniqueItem ? "already" : ""} been
              added to your cart.
            </div>
            <div className="grid two-column-div">
              <button
                className="added-button"
                onClick={() => router.push("/")}
              >
              continue shopping
              </button>
              <button
                className="added-button"
                onClick={() => router.push("/cart")}
              >
                view cart
              </button>
            </div>
          </div>
        </form>
      </div>

      <HeaderC cartQty={cartQty} />
      <div className="main-body">
        <div className="item-details">
          <div className="image-div">
            <div className="justify-center">
              <img
                className="big-image"
                src={imageBuffer}
                alt="product image"
              />
            </div>
          </div>
          <form method="POST" action="/cart">
            <div className="info-div">
              <h1>{selectedProduct && selectedProduct.title}</h1>
              <div className="info-detail-div">
                <label>price:</label>
                <h3 className="top-margin">
                  ${selectedProduct && selectedProduct.price}.00
                </h3>
              </div>
              <div className="info-detail-div">
                <label>info:</label>
                <h3 className="top-margin">
                  {selectedProduct && selectedProduct.info}
                </h3>
              </div>
              <hr className="top-margin" />
              <div className="align-center">
                <button onClick={addToCart}>Add To Cart</button>
              </div>
            </div>
          </form>
        </div>
        <FooterC />
      </div>
    </div>
  );
};

export async function getStaticProps() {
  try {
    const productResponse = await IndexAPI.get(
      `/products/${product}/${id}`
    );

    let imageBuffer = "";
    if (productResponse.data.data.item.imagekey !== null) {
      let imagesResponse = await IndexAPI.get(
        `/images/${productResponse.data.data.item.imagekey}`,
        {
          responseType: "arraybuffer",
        }
      ).then((response) =>
        Buffer.from(response.data, "binary").toString("base64")
      );

      imageBuffer = `data:image/png;base64,${imagesResponse}`;
    }

    const cartResponse = await IndexAPI.get(`/cart`);

    return{
      props: {
        imageBuffer: imageBuffer,
        selectedProduct: productResponse.data.data.item,
        cart: cartResponse.data.data.cart,
        cartQty: cartResponse.data.data.cart.length
      }
    }
  } catch (err) {
    console.log(err);
  }
}

export default ProductDetailsC;
