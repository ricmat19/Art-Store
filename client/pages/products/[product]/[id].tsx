/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
// import { useRouter } from "next/router";
import IndexAPI from "../../../apis/indexAPI";
import MainNav from "../../../components/users/mainNav";
import PagesNav from "../../../components/users/pagesNav";
import Footer from "../../../components/footer";
import Head from "next/head";
import AddToCart from "../../../components/users/products/addToCartModal";
import AddToCollection from "../../../components/users/products/addToCollectionModal";
import { Grid } from "@mui/material";
import {
  getCartReducer,
  addToCartReducer,
} from "../../../reducers/cartReducers";
import { useAppDispatch } from "../../../hooks";

// Product details prop interface
interface IProductDetails {
  imageBuffer: string;
  groups: any;
  product: any;
  cart: any;
}

//Product details functional component
const ProductDetails = (props: IProductDetails) => {
  // Product details states
  const [addToCartOpen, setAddToCartOpen] = useState(false);
  const [addToCollectionOpen, setAddToCollectionOpen] = useState(false);
  const [imageBuffer] = useState(props.imageBuffer);
  const [product] = useState(props.product);
  const [cartQty, setCartQty] = useState(props.cart.length);
  const [uniqueItem, setUniqueItem] = useState();

  // Redux dispatch
  const dispatch = useAppDispatch();

  //Handles the opening/closing of the add to cart modal
  const handleAddToCartOpen = () => setAddToCartOpen(true);
  const handleAddToCartClose = () => setAddToCartOpen(false);

  //Handles the opening/closing of the add to collection modal
  const handleAddToCollectionOpen = () => setAddToCollectionOpen(true);
  const handleAddToCollectionClose = () => setAddToCollectionOpen(false);

  // const router = useRouter();
  // const id = router.query.id;

  // const addedRef = useRef();

  // const {cart} = useContext(CartContext);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       document.addEventListener("mousedown", (event) => {
  //         if (addedRef.current !== null) {
  //           if (!addedRef.current.contains(event.target)) {
  //             setAddedModal("modal-bg");
  //           }
  //         }
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchData();
  // }, []);

  //Add the provided product to the cart
  const addToCart = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();

      // Add the provided product to the cart
      const cartPostResponse = await dispatch(
        addToCartReducer(props.product.id)
      );
      setUniqueItem(cartPostResponse.payload.cart.uniqueItem);

      // Get the cart's current content
      const cartResponse = await dispatch(getCartReducer());
      setCartQty(cartResponse.payload.cart.length);

      // Open the add to cart modal
      handleAddToCartOpen();
    } catch (err) {
      console.log(err);
    }
  };

  //Display the collection modal
  const displayCollectionModal = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();
      handleAddToCollectionOpen();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid>
      <Head>
        {/* <title>artHouse19-{product.title}</title>
        <meta name="description" content={product.title}></meta> */}
      </Head>
      {/* Add to cart modal component */}
      <AddToCart
        open={addToCartOpen}
        handleClose={handleAddToCartClose}
        product={product}
        uniqueItem={uniqueItem}
        setUniqueItem={setUniqueItem}
        setCartQty={setCartQty}
        // id={id}
      />
      {/* Add to collection modal component */}
      <AddToCollection
        open={addToCollectionOpen}
        handleClose={handleAddToCollectionClose}
        product={product}
        collections={props.groups}
        uniqueItem={uniqueItem}
        setUniqueItem={setUniqueItem}
      />
      {/* <Grid className={addedModal}>
        <form>
          <Grid
            // ref={addedRef}
            className="added-content modal-content"
          >
            <h1 className="header">Item Added</h1>
            <Grid>
              {product.title} has {!uniqueItem ? "already" : ""} been
              added to your cart.
            </Grid>
            <Grid className="grid two-column-div">
              <button className="added-button" onClick={() => router.push("/")}>
                continue shopping
              </button>
              <button
                className="added-button"
                onClick={() => router.push("/cart")}
              >
                view cart
              </button>
            </Grid>
          </Grid>
        </form>
      </Grid> */}

      {/* Main navigation component */}
      <MainNav cartQty={cartQty} />
      {/* Pages navigation component */}
      <PagesNav />
      <Grid className="main-body">
        <Grid className="item-details">
          <Grid className="image-div">
            {/* Display the current product's image */}
            <Grid className="justify-center">
              <img
                className="big-image"
                src={imageBuffer}
                alt="product image"
              />
            </Grid>
          </Grid>
          <Grid className="info-div">
            {/* Display the product title */}
            <h1>{product && product.title}</h1>
            {/* Display the product price */}
            <Grid className="info-detail-div">
              <label>price:</label>
              <h3 className="top-margin">${product && product.price}.00</h3>
            </Grid>
            {/* Display the product's info */}
            <Grid className="info-detail-div">
              <label>info:</label>
              <h3 className="top-margin">{product && product.info}</h3>
            </Grid>
            <hr className="top-margin" />
            <Grid className="align-center">
              {/* Button to display the collection modal */}
              <button onClick={(e) => displayCollectionModal(e)}>
                Add To Collection
              </button>
              {/* Button to display the add to cart modal */}
              <button onClick={(e) => addToCart(e)}>Add To Cart</button>
            </Grid>
          </Grid>
        </Grid>
        {/* Footer component */}
        <Footer />
      </Grid>
    </Grid>
  );
};

// Create routes for the product list of products
export async function getStaticPaths() {
  // Get a list of all products
  const productsResponse = await IndexAPI.get(`/products`);

  // Return the list of products as product path parameters
  return {
    fallback: false,
    paths: productsResponse.data.data.products.map((product: any) => ({
      params: {
        product: product.product,
        id: product.id,
      },
    })),
  };
}

export async function getStaticProps(context: {
  params: { product: string; id: string };
}) {
  const product = context.params.product;
  const id = context.params.id;

  // Get the selected product's content
  const productResponse = await IndexAPI.get(`/products/${product}/${id}`);

  //Create and add the product's image buffer to the selected product's object
  let imageBuffer = "";
  if (productResponse.data.data.item.imagekey !== null) {
    let imagesResponse = await IndexAPI.get(
      `/images/${productResponse.data.data.item.imagekey}`,
      {
        responseType: "arraybuffer",
      }
    ).then((response) =>
      Buffer.from(response.data, "binary").toString("base64")
    );

    imageBuffer = `data:image/png;base64,${imagesResponse}`;
  }

  // Get the list of collection groups
  const collectionsResponse = await IndexAPI.get(`/collection/groups`);

  // Get the cart's content
  const cartResponse = await IndexAPI.get(`/cart`);

  //Provide the selected product's image buffer, product content, collection groups, and cart content as props to the selected product's component
  return {
    props: {
      imageBuffer: imageBuffer,
      product: productResponse.data.data.item,
      groups: collectionsResponse.data.data.groups,
      cart: cartResponse.data.data.cart,
    },
    revalidate: 1,
  };
}

export default ProductDetails;
