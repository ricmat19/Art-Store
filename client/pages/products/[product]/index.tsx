/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import IndexAPI from "../../../apis/indexAPI";
import MainNav from "../../../components/users/mainNav";
import PagesNav from "../../../components/users/pagesNav";
import FooterC from "../../../components/footer";
// import { IProduct } from "../../../interfaces";
import Head from "next/head";
import { Grid } from "@mui/material";
import ProductsNav from "../../../components/users/products/productsNav";

const Products = (props: any) => {
  const [cartQty] = useState<number>(props.cart.length);
  const [products] = useState(props.products);
  const [pageNumber, setPageNumber] = useState<number>(0);

  const itemsPerPage = 9;
  const pagesVisted = pageNumber * itemsPerPage;

  const displayItems = products
    .slice(pagesVisted, pagesVisted + itemsPerPage)
    .map((item: any) => {
      return (
        <Grid
          className="pointer"
          key={item.id}
          onClick={() => displayItem(item.product, item.id)}
        >
          <Grid className="products-item">
            <img
              className="products-thumbnail"
              src={item.imageBuffer}
              alt={item.title}
            />
          </Grid>
          <Grid className="products-thumbnail-footer">
            <h3 className="align-center">{item.title}</h3>
            <h3 className="align-center">${item.price}.00</h3>
          </Grid>
        </Grid>
      );
    });

  const pageCount = Math.ceil(products.length / itemsPerPage);

  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  const router = useRouter();

  const displayItem = async (product: string, id: string) => {
    try {
      router.push(`/products/${product}/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid>
      <Head>
        <title>artHouse19-Store</title>
        <meta
          name="description"
          content="View a full list of the products available in artHouse19!"
        ></meta>
      </Head>
      <MainNav cartQty={cartQty} />
      <PagesNav productsAmount={products.length} />
      <Grid className="main-body">
        <Grid>
          <ProductsNav products={products} />
          <Grid className="products-menu">{displayItems}</Grid>
          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationButtons"}
            previousLinkClassName={"prevButton"}
            nextLinkClassName={"nextButton"}
            disabledClassName={"disabledButton"}
            activeClassName={"activeButton"}
          />
        </Grid>
        <FooterC />
      </Grid>
    </Grid>
  );
};

export async function getStaticPaths() {
  const productsResponse = await IndexAPI.get(`/products`);

  const products: string[] = [];
  for (let i = 0; i < productsResponse.data.data.products.length; i++) {
    if (!products.includes(productsResponse.data.data.products.product)) {
      products.push(productsResponse.data.data.products[i].product);
    }
  }

  return {
    fallback: false,
    paths: products.map((product: any) => ({
      params: {
        product: product,
      },
    })),
  };
}

export async function getStaticProps(context: { params: { product: any } }) {
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

  const product = context.params.product;
  const productResponse = await IndexAPI.get(`/products/${product}`);

  for (let i = 0; i < productResponse.data.data.product.length; i++) {
    if (productResponse.data.data.product[i].imagekey !== null) {
      let imagesResponse = await IndexAPI.get(
        `/images/${productResponse.data.data.product[i].imagekey}`,
        {
          responseType: "arraybuffer",
        }
      ).then((response) =>
        Buffer.from(response.data, "binary").toString("base64")
      );

      productResponse.data.data.product[
        i
      ].imageBuffer = `data:image/png;base64,${imagesResponse}`;
    }
  }
  return {
    props: {
      products: productResponse.data.data.product,
      cart: cartResponse.data.data.cart,
    },
    revalidate: 1,
  };
}

export default Products;
