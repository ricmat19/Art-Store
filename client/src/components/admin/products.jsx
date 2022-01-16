import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useHistory, useParams } from "react-router-dom";
import IndexAPI from "../../apis/indexAPI";
import AdminHeaderC from "./header";
import FooterC from "../footer";
// import Buffer from "buffer";

const AdminProductsC = () => {
  const { product } = useParams();
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const itemsPerPage = 9;
  const pagesVisted = pageNumber * itemsPerPage;

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
                alt="thumbnail"
              />
            </div>
            <div className="products-thumbnail-footer">
              <div className="Title">{item.title}</div>
              <div className="Price">${item.price}.00</div>
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
                  onClick={() => handleUpdate(item.id)}
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

  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
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
              console.log(response)
              // Buffer.from(response.data, "binary").toString("base64")
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

  const handleUpdate = async (id) => {
    try {
      history.push(`/admin/update/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <AdminHeaderC />
      <div className="main-body">
        <div className="center subtitle-div">
          <a className="subtitle-anchor" href="/admin/products/2D">
            <p className="title">2D art</p>
          </a>
          <a className="subtitle-anchor" href="/admin/products/3D">
            <p className="title">3D art</p>
          </a>
          <a className="subtitle-anchor" href="/admin/products/comic">
            <p className="title">comics</p>
          </a>
        </div>
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
  );
};

export default AdminProductsC;
