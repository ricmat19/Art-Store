import IndexAPI from "../apis/indexAPI";
import MainNav from "../components/users/mainNav";
import PagesNav from "../components/users/pagesNav";
import FooterC from "../components/footer";
import Head from "next/head";

const AboutC = (props: any) => {
  return (
    <div>
      <Head>
        <title>artHouse19-About</title>
        <meta
          name="description"
          content="About the artHouse19 and its creator."
        ></meta>
      </Head>
      <MainNav cartQty={props.cartQty} />
      <PagesNav />
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
              <h3>&emsp; &emsp; {process.env.NEXT_PUBLIC_INFO_PARAGRAPH_1}</h3>
              <h3>&emsp; &emsp; {process.env.NEXT_PUBLIC_INFO_PARAGRAPH_2}</h3>
            </div>
          </div>
        </div>
        <FooterC />
      </div>
    </div>
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

export default AboutC;
