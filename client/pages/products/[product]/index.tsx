/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import IndexAPI from "../../../apis/indexAPI";
import MainNav from "../../../components/users/mainNav";
import PagesNav from "../../../components/users/pagesNav";
import Footer from "../../../components/footer";
import Head from "next/head";
import { Grid } from "@mui/material";
import ProductsNav from "../../../components/users/products/productsNav";
import { IProduct } from "../../../interfaces";

// Products prop interface
interface IProducts {
  products: IProduct[];
  cartQty: number
}

//Products functional component
const Products = (props: IProducts) => {
  // Products states
  const [pageNumber, setPageNumber] = useState<number>(0);

  //Next router function
  const router = useRouter();

  // Setup pagination and number of items per page
  const itemsPerPage = 6;
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(props.products.length / itemsPerPage);

  // onPageChange ? (selectedItem: { selected: number }): void;

  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  // Route to the selected product's detail page
  const displayItem = async (product: string, id: string) => {
    try {
      await router.push(`/products/${product}/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  //Map through the list of products and setup their templates
  const displayItems = props.products
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map(
      (item: {
        id: string;
        product: string;
        image_url: string;
        title: string;
        price: string;
      }) => {
        return (
          // Route to the selected product's detail page
          <Grid
            className="pointer"
            key={item.id}
            onClick={() => displayItem(item.product, item.id)}
          >
            {/* Display the product's image */}
            <Grid className="image-container">
              <img
                className="thumbnail"
                src={item.image_url}
                alt={item.title}
              />
            </Grid>
            {/* Display the product's title and price */}
            <Grid className="two-column-thumbnail-footer">
              <h3 className="align-center">{item.title}</h3>
              <h3 className="align-center">${item.price}.00</h3>
            </Grid>
          </Grid>
        );
      }
    );

  // Product's component
  return (
    <Grid>
      <Head>
        <title>artHouse19-Store</title>
        <meta
          name="description"
          content="View a full list of the products available in artHouse19!"
        ></meta>
      </Head>
      {/* Main navigation component */}
      <MainNav cartQty={props.cartQty} />
      {/* Pages navigation component */}
      <PagesNav />
      <Grid>
        {/* Display the media navigation menu */}
        <ProductsNav products={props.products} />
        {/* Display all product items of the current product type */}
        <Grid className="gallery-menu">{displayItems}</Grid>
        {/* Pagination component */}
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
        {/* Footer component */}
        <Footer />
      </Grid>
    </Grid>
  );
};

// Create a path for the list of product types
export function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          product: "print",
        },
      },
      {
        params: {
          product: "painting",
        },
      },
      {
        params: {
          product: "sculpture",
        },
      },
      {
        params: {
          product: "model",
        },
      },
      {
        params: {
          product: "book",
        },
      },
      {
        params: {
          product: "comic",
        },
      },
    ],
  };
}

export async function getStaticProps(context: { params: { product: string } }) {
  const product = context.params.product;

  // Get all items in the cart
  const cartResponse = await IndexAPI.get(`/cart`);

  //Get a list of all products of the selected product type
  const productResponse = await IndexAPI.get(`/products/${product}`);

  //Provide the products and cart quantity as props to the products component
  return {
    props: {
      products: productResponse.data.data.product,
      cartQty: cartResponse.data.data.cart.length,
    },
    revalidate: 1,
  };
}

export default Products;
