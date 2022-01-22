import React, { useEffect, useState, useRef } from "react";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";
import IndexAPI from "../../apis/indexAPI";
import AdminHeaderC from "./header";
import AdminCreateProductC from "./createProduct";
import AdminUpdateProductC from "./updateProduct";
import FooterC from "../footer";

const AdminProductsC = () => {
  const { product } = useParams();
  const [createProductModal, setCreateProductModal] = useState("create-bg");
  const [updateItem, setUpdateItem] = useState("");
  const [updateProductModal, setUpdateProductModal] = useState("update-bg");
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

  const createProductRef = useRef();
  const updateProductRef = useRef();

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
          <div className="admin-buttons">
            <div className="admin-products-button-div text-center">
              <div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="btn form-button delete"
                >
                  Delete
                </button>
              </div>
              <div>
                <button
                  onClick={() => displayUpdateProductModal(item.id)}
                  // onClick={() => handleUpdate(item.id)}
                  type="submit"
                  className="btn form-button"
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
        });

        const productResponse = await IndexAPI.get(
          `/admin/products/${product}`
        );
        console.log(productResponse);

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

  const handleDelete = async (id) => {
    try {
      await IndexAPI.delete(`/admin/delete/${id}`);
      setProducts(
        products.filter((item) => {
          return item.id !== id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

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
          <AdminUpdateProductC updateItem={updateItem}/>
        </div>
      </div>
      <div className="main-body">
        <div>
          <div className="center">
            <h1>store</h1>
          </div>
          <div className="plus-icon-div">
            <span onClick={displayCreateProductModal}>
              <i className="fas fa-plus plus-icon"></i>
            </span>
          </div>
          {/* <div className="center subtitle-div">
          <a className="subtitle-anchor" href="/admin/products/print">
            <h2 className="title">2D Prints</h2>
          </a>
          <a className="subtitle-anchor" href="/admin/products/model">
            <h2 className="title">3D Models</h2>
          </a>
          <a className="subtitle-anchor" href="/admin/products/comic">
            <h2 className="title">Comics</h2>
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
};

export default AdminProductsC;
