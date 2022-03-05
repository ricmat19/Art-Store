/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import IndexAPI from "../../../apis/indexAPI";
import AdminMainNav from "../../../components/admin/mainNav";
import AdminPagesNav from "../../../components/admin/pagesNav";
import FooterC from "../../../components/footer";
import { IProduct } from "../../../interfaces";
import Head from "next/head";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminProductsNav from "../../../components/admin/products/productNav";
import AdminAddProduct from "../../../components/admin/products/addProduct";
import AdminDeleteProduct from "../../../components/admin/products/deleteProduct";
import { Button, Grid } from "@mui/material";

const AdminProduct = (props: any) => {
  const [loginStatus, setLoginStatus] = useState<boolean>(true);
  const [product] = useState<IProduct[]>(props.product);
  const [deleteProduct, setDeleteProduct] = useState<any>();
  const [pageNumber, setPageNumber] = useState<number>(0);

  const [addOpen, setAddOpen] = useState(false);
  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => setAddOpen(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  const itemsPerPage = 9;
  const pagesVisted = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(product.length / itemsPerPage);
  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  const displayDeleteModal = (id: any) => {
    for (let i = 0; i < product.length; i++) {
      if (product[i].id === id) {
        setDeleteProduct(product[i]);
      }
    }
    handleDeleteOpen();
  };

  const displayItems = product
    .slice(pagesVisted, pagesVisted + itemsPerPage)
    .map((item: any) => {
      return (
        <Grid key={item.id}>
          <Grid className="pointer">
            <Grid className="products-item">
              <img
                className="products-thumbnail"
                src={item.imageBuffer}
                alt="Thumbnail"
              />
            </Grid>
            <Grid className="products-thumbnail-footer">
              <h3 className="align-center">{item.title}</h3>
              <h3 className="align-center">${item.price}.00</h3>
            </Grid>
          </Grid>
          <Grid>
            <Grid className="admin-products-button-div">
              <Grid>
                <button
                  onClick={() => displayDeleteModal(item.id)}
                  className="delete"
                >
                  Delete
                </button>
              </Grid>
              <Grid>
                <button
                  // onClick={() => displayUpdateProductModal(item.id)}
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
        <AdminDeleteProduct
          deleteProduct={deleteProduct}
          open={deleteOpen}
          handleClose={handleDeleteClose}
        />
        <AdminMainNav />
        <AdminPagesNav />
        <Grid className="main-body">
          <Grid>
            <AdminProductsNav products={props.product} />
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
  } else {
    return <div></div>;
  }
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
      product: productResponse.data.data.product,
    },
    revalidate: 1,
  };
}

export default AdminProduct;
