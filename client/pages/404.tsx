import { useState } from "react";
import MainNav from "../components/users/mainNav";
import PagesNav from "../components/users/pagesNav";
import FooterC from "../components/footer";
import Head from "next/head";
import IndexAPI from "../apis/indexAPI";

const PageNotFoundC = (props: any) => {
  const [cartQty] = useState(props.cart.length);

  return (
    <div>
      <Head>
        <title>artHouse19-404</title>
      </Head>
      <MainNav />
      <PagesNav cartQty={cartQty} />
      <div className="main-body">
        <h1>Page Not Found (404)</h1>
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
      cart: cartResponse.data.data.cart,
    },
    revalidate: 1,
  };
}

export default PageNotFoundC;
