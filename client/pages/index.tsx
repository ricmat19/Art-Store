import { useState } from "react";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import IndexAPI from "../apis/indexAPI";
import HeaderC from "../components/header";
import FooterC from "../components/footer";

const ProductsC = (props: any) => {
  const [products] = useState(props.products);
  const [pageNumber, setPageNumber] = useState(0);

  const itemsPerPage = 9;
  const pagesVisted = pageNumber * itemsPerPage;

  const displayItems = products
    .slice(pagesVisted, pagesVisted + itemsPerPage)
    .map((item) => {
      return (
        <div
          className="pointer"
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

  const router = useRouter();

  // let productResponse;
  // useEffect(() => {
  //   const fetchData = async () => {

  //   };

  //   fetchData();
  // }, []);

  const displayItem = async (product, id) => {
    try {
      router.push(`/products/${product}/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <HeaderC />
      <div className="main-body">
        <div>
          <div className="align-center">
            <h1>store</h1>
          </div>
          {/* <div className="align-center subtitle-div">
          <a className="no-decoration" href="/products/print">
            <h2>2D Prints</h2>
          </a>
          <a className="no-decoration" href="/products/model">
            <h2>3D Models</h2>
          </a>
          <a className="no-decoration" href="/products/comic">
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
};

export async function getStaticProps() {
  try {
    const productResponse = await IndexAPI.get(`/products/print`);

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
    return{
      props: {
        products: productResponse.data.data.product
      }
    }
  } catch (err) {
    console.log(err);
  }
}

export default ProductsC;
