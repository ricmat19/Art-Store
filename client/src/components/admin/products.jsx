import React, { useEffect, useState, useRef } from "react";
import { Redirect } from "react-router";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";
import IndexAPI from "../../apis/indexAPI";
import AdminHeaderC from "./header";
import AdminCreateProductC from "./createProduct";
import AdminUpdateProductC from "./updateProduct";
import AdminDeleteProductC from "./deleteProduct";
import FooterC from "../footer";

const AdminProductsC = () => {
  const { product } = useParams();
  const [loginStatus, setLoginStatus] = useState(true);
  const [createProductModal, setCreateProductModal] = useState("create-bg");
  const [updateItem, setUpdateItem] = useState("");
  const [updateProductModal, setUpdateProductModal] = useState("update-bg");
  const [deleteItem, setDeleteItem] = useState("");
  const [deleteProductModal, setDeleteProductModal] = useState("delete-bg");
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const itemsPerPage = 9;
  const pagesVisted = pageNumber * itemsPerPage;

  const displayCreateProductModal = () => {
    setCreateProductModal("create-bg create-product");
  };

  const displayUpdateProductModal = (id) => {
    setUpdateItem(id);
    setUpdateProductModal("update-bg update-product");
  };

  const displayDeleteProductModal = (id) => {
    setDeleteItem(id);
    setDeleteProductModal("delete-bg delete-product");
  };

  const createProductRef = useRef();
  const updateProductRef = useRef();
  const deleteProductRef = useRef();

  const displayItems = products
    .slice(pagesVisted, pagesVisted + itemsPerPage)
    .map((item) => {
      return (
        <div key={item.id}>
          <div className="products-item-div">
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
                  onClick={() => displayDeleteProductModal(item.id)}
                  className="delete"
                >
                  Delete
                </button>
              </div>
              <div>
                <button
                  onClick={() => displayUpdateProductModal(item.id)}
                  // onClick={() => handleUpdate(item.id)}
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

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginResponse = await IndexAPI.get(`/login`);
        setLoginStatus(loginResponse.data.data.loggedIn);

        document.addEventListener("mousedown", (event) => {
          if (createProductRef.current !== null) {
            if (!createProductRef.current.contains(event.target)) {
              setCreateProductModal("create-bg");
            }
          }
          if (updateProductRef.current !== null) {
            if (!updateProductRef.current.contains(event.target)) {
              setUpdateProductModal("update-bg");
            }
          }
          if (deleteProductRef.current !== null) {
            if (!deleteProductRef.current.contains(event.target)) {
              setDeleteProductModal("delete-bg");
            }
          }
        });

        const productResponse = await IndexAPI.get(
          `/admin/products/${product}`
        );

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
        setProducts(productResponse.data.data.product);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  console.log(loginStatus)
  if (loginStatus) {
    return (
      <div>
        <AdminHeaderC />
        <div className={createProductModal}>
          <div ref={createProductRef} className="create-product-container">
            <AdminCreateProductC />
          </div>
        </div>
        <div className={updateProductModal}>
          <div ref={updateProductRef} className="update-product-container">
            <AdminUpdateProductC updateItem={updateItem} />
          </div>
        </div>
        <div className={deleteProductModal}>
          <div ref={deleteProductRef} className="delete-product-container">
            <AdminDeleteProductC
              deleteItem={deleteItem}
              products={products}
              setProducts={setProducts}
            />
          </div>
        </div>
        <div className="main-body">
          <div>
            <div className="align-center">
              <h1>store</h1>
            </div>
            <div className="plus-icon-div">
              <span onClick={displayCreateProductModal}>
                <i className="fas fa-plus plus-icon"></i>
              </span>
            </div>
            {/* <div className="align-center subtitle-div">
          <a className="subtitle-anchor" href="/admin/products/print">
            <h2>2D Prints</h2>
          </a>
          <a className="subtitle-anchor" href="/admin/products/model">
            <h2>3D Models</h2>
          </a>
          <a className="subtitle-anchor" href="/admin/products/comic">
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
    return <Redirect to="/admin/login" />;
  }
};

export default AdminProductsC;
