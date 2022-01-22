import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";
import IndexAPI from "../apis/indexAPI";
import CartModalC from "./cartSummaryModal";
import HeaderC from "./header";
import FooterC from "./footer";

const ProductsC = () => {
  const [, setCart] = useState([]);
  const [cartState, setCartState] = useState(false);
  const [cartQty, setCartQty] = useState(0);
  const [cartCost, setCartCost] = useState(0);

  // const { product } = useParams();
  const [ products, setProducts ] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const itemsPerPage = 9;
  const pagesVisted = pageNumber * itemsPerPage;

  const displayItems = products
    .slice(pagesVisted, pagesVisted + itemsPerPage)
    .map((item) => {
      return (
        <div
          className="products-item-div"
          key={item.id}
          onClick={() => displayItem(item.product, item.id)}
        >
          <div className="products-item">
            <img className="products-thumbnail" src={item.imageBuffer} />
          </div>
          <div className="products-thumbnail-footer">
            <h3 className="align-center">{item.title}</h3>
            <h3 className="align-center">${item.price}.00</h3>
          </div>
        </div>
      );
    });

  const pageCount = Math.ceil(products.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  let history = useHistory();

  let productResponse;
  useEffect(() => {
    const fetchData = async () => {
      try {
        productResponse = await IndexAPI.get(`/products/print`);
        // productResponse = await IndexAPI.get(`/products/${product}`);

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

        const cartResponse = await IndexAPI.get(`/cart`);
        setCart(cartResponse.data.data.cart);

        setCartQty(cartResponse.data.data.cart.length);

        let price = 0;
        for (let i = 0; i < cartResponse.data.data.cart.length; i++) {
          price += parseInt(cartResponse.data.data.cart[i].price);
        }
        setCartCost(price);

        if (cartResponse.length !== 0) {
          setCartState(true);
        } else {
          setCartState(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const displayItem = async (product, id) => {
    try {
      history.push(`/products/${product}/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <CartModalC cartState={cartState} cartQty={cartQty} cartCost={cartCost} />
      <HeaderC />
      <div className="main-body">
        {/* <div className="center subtitle-div">
          <a className="subtitle-anchor" href="/products/print">
            <h2 className="title">2D Prints</h2>
          </a>
          <a className="subtitle-anchor" href="/products/model">
            <h2 className="title">3D Models</h2>
          </a>
          <a className="subtitle-anchor" href="/products/comic">
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
  );
};

export default ProductsC;
