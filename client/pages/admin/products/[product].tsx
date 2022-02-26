/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
// import { Redirect } from "react-router";
import ReactPaginate from "react-paginate";
import IndexAPI from "../../../apis/indexAPI";
import AdminMainNav from "../../../components/admin/mainNav";
import AdminPagesNav from "../../../components/admin/pagesNav";
// import AdminCreateProductC from "../../components/admin/modals/createProduct";
// import AdminUpdateProductC from "../../components/admin/modals/updateProduct";
// import AdminDeleteProductC from "../../components/admin/modals/deleteProduct";
import FooterC from "../../../components/footer";
import { IProduct } from "../../../interfaces";
import Head from "next/head";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AdminProductsNav from "../../../components/admin/products/productNav";

const AdminProducts = (props: any) => {
  const [loginStatus, setLoginStatus] = useState<boolean>(true);
  // const [createProductModal, setCreateProductModal] =
  //   useState<string>("modal-bg");
  // const [updateItem, setUpdateItem] = useState<string>("");
  // const [updateProductModal, setUpdateProductModal] =
  //   useState<string>("modal-bg");
  // const [deleteItem, setDeleteItem] = useState<string>("");
  // const [deleteProductModal, setDeleteProductModal] =
  //   useState<string>("modal-bg");
  const [products] = useState<IProduct[]>(props.products);
  const [pageNumber, setPageNumber] = useState<number>(0);

  const itemsPerPage = 9;
  const pagesVisted = pageNumber * itemsPerPage;

  // const displayCreateProductModal = () => {
  //   setCreateProductModal("modal-bg active");
  // };

  // const displayUpdateProductModal = (id: SetStateAction<string>) => {
  //   setUpdateItem(id);
  //   setUpdateProductModal("modal-bg active");
  // };

  // const displayDeleteProductModal = (id: SetStateAction<string>) => {
  //   setDeleteItem(id);
  //   setDeleteProductModal("modal-bg active");
  // };

  // const createProductRef = useRef();
  // const updateProductRef = useRef();
  // const deleteProductRef = useRef();

  const displayItems = products
    .slice(pagesVisted, pagesVisted + itemsPerPage)
    .map((item: any) => {
      return (
        <div key={item.id}>
          <div className="pointer">
            <div className="products-item">
              <img
                className="products-thumbnail"
                src={item.imageBuffer}
                alt="Thumbnail"
              />
            </div>
            <div className="products-thumbnail-footer">
              <h3 className="align-center">{item.title}</h3>
              <h3 className="align-center">${item.price}.00</h3>
            </div>
          </div>
          <div>
            <div className="admin-products-button-div">
              <div>
                <button
                  // onClick={() => displayDeleteProductModal(item.id)}
                  className="delete"
                >
                  Delete
                </button>
              </div>
              <div>
                <button
                  // onClick={() => displayUpdateProductModal(item.id)}
                  type="submit"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });

  const pageCount = Math.ceil(products.length / itemsPerPage);

  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginResponse = await IndexAPI.get(`/login`);
        setLoginStatus(loginResponse.data.data.loggedIn);

        // document.addEventListener("mousedown", (event) => {
        //   if (createProductRef.current !== null) {
        //     if (!createProductRef.current.contains(event.target)) {
        //       setCreateProductModal("modal-bg");
        //     }
        //   }
        //   if (updateProductRef.current !== null) {
        //     if (!updateProductRef.current.contains(event.target)) {
        //       setUpdateProductModal("modal-bg");
        //     }
        //   }
        //   if (deleteProductRef.current !== null) {
        //     if (!deleteProductRef.current.contains(event.target)) {
        //       setDeleteProductModal("modal-bg");
        //     }
        //   }
        // });
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  if (loginStatus) {
    return (
      <div>
        <Head>
          <title>artHouse19-Admin Products</title>
        </Head>
        <AdminMainNav />
        <AdminPagesNav />
        {/* <div className={createProductModal}>
          <div
            // ref={createProductRef}
            className="create-product-container"
          >
            <AdminCreateProductC />
          </div>
        </div>
        <div className={updateProductModal}>
          <div
            // ref={updateProductRef}
            className="update-product-container"
          >
            <AdminUpdateProductC updateItem={updateItem} />
          </div>
        </div>
        <div className={deleteProductModal}>
          <div
            // ref={deleteProductRef}
            className="delete-product-container"
          >
            <AdminDeleteProductC
              deleteItem={deleteItem}
              products={products}
              setProducts={setProducts}
            />
          </div>
        </div> */}
        <div className="main-body">
          <div>
            <AdminProductsNav products={props.products}/>
            <div className="plus-icon-div">
              {/* <span onClick={displayCreateProductModal}> */}
              <FontAwesomeIcon className="plus-icon" icon={faPlus}/>
              {/* </span> */}
            </div>
            {/* <div className="align-center subtitle-div">
          <a className="no-decoration" href="/admin/products/print">
            <h2>2D Prints</h2>
          </a>
          <a className="no-decoration" href="/admin/products/model">
            <h2>3D Models</h2>
          </a>
          <a className="no-decoration" href="/admin/products/comic">
            <h2>Comics</h2>
          </a>
          </div> */}
            <div className="products-menu">{displayItems}</div>
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
          </div>
          <FooterC />
        </div>
      </div>
    );
  } else {
    return "";
    // <Redirect to="/admin/login" />;
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
      products: productResponse.data.data.product
    },
    revalidate: 1,
  };
}

export default AdminProducts;
