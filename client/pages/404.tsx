import MainNav from "../components/users/mainNav";
import PagesNav from "../components/users/pagesNav";
import FooterC from "../components/footer";
import Head from "next/head";
import IndexAPI from "../apis/indexAPI";

const PageNotFoundC = (props: any) => {
  return (
    <div>
      <Head>
        <title>artHouse19-404</title>
      </Head>
      <MainNav cartQty={props.cartQty} />
      <PagesNav />
      <div className="main-body">
        <h1>Page Not Found (404)</h1>
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

export default PageNotFoundC;
