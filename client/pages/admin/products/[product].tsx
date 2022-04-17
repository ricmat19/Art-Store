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
import AdminAddProduct from "../../../components/admin/products/createProduct";
import AdminUpdateProduct from "../../../components/admin/products/updateProduct";
import AdminDeleteProduct from "../../../components/admin/products/deleteProduct";
import { Button, Grid } from "@mui/material";

const AdminProduct = (props: any) => {
  const [loginStatus, setLoginStatus] = useState<boolean>(true);
  const [product] = useState<IProduct[]>(props.product);
  const [activeProducts] = useState<IProduct[]>(props.activeProducts);

  const [pageNumber, setPageNumber] = useState<number>(0);

  const [addOpen, setAddOpen] = useState(false);
  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => setAddOpen(false);

  const [updateProduct, setUpdateProduct] = useState<any>();
  const [updateOpen, setUpdateOpen] = useState(false);
  const handleUpdateOpen = () => setUpdateOpen(true);
  const handleUpdateClose = () => setUpdateOpen(false);

  const [deleteProduct, setDeleteProduct] = useState<any>();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  const itemsPerPage = 9;
  const pagesVisted = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(product.length / itemsPerPage);
  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  const displayUpdateModal = (id: any) => {
    for (let i = 0; i < product.length; i++) {
      if (product[i].id === id) {
        setUpdateProduct(product[i]);
      }
    }
    handleUpdateOpen();
  };

  const displayDeleteModal = (id: any) => {
    for (let i = 0; i < product.length; i++) {
      if (product[i].id === id) {
        setDeleteProduct(product[i]);
      }
    }
    handleDeleteOpen();
  };

  const displayProducts = product
    .slice(pagesVisted, pagesVisted + itemsPerPage)
    .map((product: any) => {
      return (
        <Grid key={product.id}>
          <Grid className="pointer">
            <Grid className="image-container">
              <img
                className="thumbnail"
                src={product.imageBuffer}
                alt="Thumbnail"
              />
            </Grid>
            <Grid className="two-column-thumbnail-footer">
              <h3 className="align-center">{product.title}</h3>
              <h3 className="align-center">${product.price}.00</h3>
            </Grid>
          </Grid>
          <Grid>
            <Grid className="admin-button-div">
              <Grid>
                <button
                  onClick={() => displayDeleteModal(product.id)}
                  className="delete"
                >
                  Delete
                </button>
              </Grid>
              <Grid>
                <button
                  onClick={() => displayUpdateModal(product.id)}
                  type="submit"
                >
                  Update
                </button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginResponse = await IndexAPI.get(`/login`);
        setLoginStatus(loginResponse.data.data.loggedIn);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  if (loginStatus) {
    return (
      <Grid>
        <Head>
          <title>artHouse19-Admin Products</title>
        </Head>
        <AdminAddProduct open={addOpen} handleClose={handleAddClose} />
        <AdminUpdateProduct
          updateProduct={updateProduct}
          open={updateOpen}
          handleClose={handleUpdateClose}
        />
        <AdminDeleteProduct
          deleteProduct={deleteProduct}
          open={deleteOpen}
          handleClose={handleDeleteClose}
        />
        <AdminMainNav />
        <AdminPagesNav />
        <Grid className="main-body">
          <Grid>
            <AdminProductsNav activeProducts={activeProducts} />
            <Grid className="plus-icon-div">
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
            <Grid className="gallery-menu">{displayProducts}</Grid>
          </Grid>
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

export async function getStaticPaths() {
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

export async function getStaticProps(context: { params: { product: any } }) {
  const activeProducts: string[] = [];
  const productsResponse = await IndexAPI.get(`/admin/products`);
  for (let i = 0; i < productsResponse.data.data.products.length; i++) {
    if (
      !activeProducts.includes(productsResponse.data.data.products[i].product)
    ) {
      activeProducts.push(productsResponse.data.data.products[i].product);
    }
  }

  const product = context.params.product;
  const productResponse = await IndexAPI.get(`/products/${product}`);

  if (productResponse.data.data.product !== undefined) {
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
  }

  return {
    props: {
      activeProducts: activeProducts,
      product: productResponse.data.data.product,
    },
    revalidate: 1,
  };
}

export default AdminProduct;
