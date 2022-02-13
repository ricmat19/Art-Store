import { useEffect, useState } from "react";
import HeaderC from "../components/header";
import FooterC from "../components/footer";
import Head from "next/head";
import IndexAPI from "../apis/indexAPI";

const PageNotFoundC = () => {

  const [cart, setCart] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
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
        setCart(cartResponse.data.data.cart);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Head>
        <title>artHouse19-404</title>
      </Head>
      <HeaderC cartQty={cart.length}/>
      <div className="main-body">
        <h1>Page Not Found (404)</h1>
        <FooterC />
      </div>
    </div>
  );
};

export default PageNotFoundC;
