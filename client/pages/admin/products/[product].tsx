/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import IndexAPI from "../../../apis/indexAPI";
import AdminMainNav from "../../../components/admin/mainNav";
import AdminPagesNav from "../../../components/admin/pagesNav";
import Footer from "../../../components/footer";
import { IProduct } from "../../../interfaces";
import Head from "next/head";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminProductsNav from "../../../components/admin/products/productNav";
import AdminAddProduct from "../../../components/admin/products/createProductModal";
import AdminUpdateProduct from "../../../components/admin/products/updateProductModal";
import AdminDeleteProduct from "../../../components/admin/products/deleteProductModal";
import { Button, Grid } from "@mui/material";

interface IProducts {
  product: IProduct[];
}

//Admin product functional component
const AdminProduct = (props: IProducts) => {
  // Admin product states
  const [loginStatus, setLoginStatus] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [addOpen, setAddOpen] = useState(false);
  const [updateProduct, setUpdateProduct] = useState<IProduct>();
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState<IProduct>();
  const [deleteOpen, setDeleteOpen] = useState(false);

  //Handles the opening/closing of the create product modal
  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => setAddOpen(false);

  //Handles the opening/closing of the update product modal
  const handleUpdateOpen = () => setUpdateOpen(true);
  const handleUpdateClose = () => setUpdateOpen(false);

  //Handles the opening/closing of the delete product modal
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  // Setup pagination and number of items per page
  const itemsPerPage = 9;
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(props.product.length / itemsPerPage);
  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  // Set the product selected to update and open the product update modal
  const displayUpdateModal = (id: string) => {
    for (let i = 0; i < props.product.length; i++) {
      if (props.product[i].id === id) {
        setUpdateProduct(props.product[i]);
      }
    }
    handleUpdateOpen();
  };

  // Set the product selected to delete and open the product delete modal
  const displayDeleteModal = (id: string) => {
    for (let i = 0; i < props.product.length; i++) {
      if (props.product[i].id === id) {
        setDeleteProduct(props.product[i]);
      }
    }
    handleDeleteOpen();
  };

  //Map through the list of products and setup their templates
  const displayProducts = props.product
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((product: IProduct) => {
      return (
        <Grid key={product.id}>
          <Grid className="pointer">
            {/* Display the product image */}
            <Grid className="image-container">
              <img
                className="thumbnail"
                src={product.imageBuffer}
                alt="Thumbnail"
              />
            </Grid>
            {/* Display the product title and price */}
            <Grid className="two-column-thumbnail-footer">
              <h3 className="align-center">{product.title}</h3>
              <h3 className="align-center">${product.price}.00</h3>
            </Grid>
          </Grid>
          <Grid>
            <Grid className="admin-button-div">
              {/*  Button to select the product for deletion and display the product delete modal */}
              <Grid>
                <button
                  onClick={() => displayDeleteModal(product.id)}
                  className="delete"
                >
                  Delete
                </button>
              </Grid>
              {/*  Button to select the product for update and display the product update modal */}
              <Grid>
                <button
                  onClick={() => displayUpdateModal(product.id)}
                  type="submit"
                  className="update"
                >
                  Update
                </button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    });

  // Get the current login status and set its state
  useEffect(() => {
    const fetchData = () => {
      try {
        const loginResponse = IndexAPI.get(`/login`);
        setLoginStatus(loginResponse.data.data.loggedIn);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  // Render based on the current login status
  if (loginStatus) {
    return (
      <Grid>
        <Head>
          <title>artHouse19-Admin Products</title>
        </Head>
        {/* Admin create product modal component */}
        <AdminAddProduct open={addOpen} handleClose={handleAddClose} />
        {/* Admin update product modal component */}
        <AdminUpdateProduct
          updateProduct={updateProduct}
          open={updateOpen}
          handleClose={handleUpdateClose}
        />
        {/* Admin delete product modal component */}
        <AdminDeleteProduct
          deleteProduct={deleteProduct}
          open={deleteOpen}
          handleClose={handleDeleteClose}
        />
        {/* Admin main nav component */}
        <AdminMainNav />
        {/* Admin pages nav component */}
        <AdminPagesNav />
        <Grid className="main-body">
          <Grid>
            {/* Admin product navigation menu */}
            <AdminProductsNav activeProducts={props.product} />
            <Grid className="plus-icon-div">
              {/* Button to display create product modal */}
              <Button
                onClick={handleAddOpen}
                sx={{
                  fontFamily: "Rajdhani",
                  fontSize: "20px",
                  color: "white",
                  textTransform: "none",
                }}
              >
                <FontAwesomeIcon className="plus-icon" icon={faPlus} />
              </Button>
            </Grid>
            {/* Display the list of mapped products */}
            <Grid className="gallery-menu">{displayProducts}</Grid>
          </Grid>
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
            pageRangeDisplayed={5}
            marginPagesDisplayed={5}
          />
          <Footer />
        </Grid>
      </Grid>
    );
  } else {
    return <Grid></Grid>;
  }
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
  //Get a list of all products
  const activeProducts: string[] = [];
  const productsResponse = await IndexAPI.get(`/admin/products`);
  for (let i = 0; i < productsResponse.data.data.products.length; i++) {
    if (
      !activeProducts.includes(productsResponse.data.data.products[i].product)
    ) {
      activeProducts.push(productsResponse.data.data.products[i].product);
    }
  }

  //Get all products of a specific type
  const product = context.params.product;
  const productResponse = await IndexAPI.get(`/products/${product}`);

  //Create and add product image buffer to all products in the product object
  if (productResponse.data.data.product !== undefined) {
    for (let i = 0; i < productResponse.data.data.product.length; i++) {
      if (productResponse.data.data.product[i].imagekey !== null) {
        const imagesResponse = await IndexAPI.get(
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
  }

  //Provide the selected product type and products as props to the product component
  return {
    props: {
      activeProducts: activeProducts,
      product: productResponse.data.data.product,
    },
    revalidate: 1,
  };
}

export default AdminProduct;
