import { useEffect, useState } from "react";
import IndexAPI from "../apis/indexAPI";
import HeaderC from "../components/header";
import FooterC from "../components/footer";
import Head from "next/head";

const AboutC = () => {

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
        <title>artHouse19-About</title>
        <meta name="description" content="About the artHouse19 and its creator."></meta>
      </Head>
      <HeaderC cartQty={cart.length}/>
      <div className="main-body">
        <div>
          <div className="align-center">
            <h1>about</h1>
          </div>
          <div className="profile-info">
            {/* <div> */}
            {/* <div className="profile-image-div">
              <div className="justify-center">
                <img
                  className="big-image"
                  src="images/profile-image.jpg"
                  alt="profile"
                />
              </div>
              <div></div>
              <div></div>
            </div> */}
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
