/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
// import { useRouter } from "next/router";
import IndexAPI from "../../../apis/indexAPI";
import MainNav from "../../../components/users/mainNav";
import PagesNav from "../../../components/users/pagesNav";
import FooterC from "../../../components/footer";
import Head from "next/head";
import AddToCart from "../../../components/users/products/addToCartModal";
import AddToCollection from "../../../components/users/products/addToCollectionModal";
import { Grid } from "@mui/material";
import {
  getCartReducer,
  addToCartReducer,
} from "../../../reducers/cartReducers";
import { useAppDispatch } from "../../../hooks";

interface IProductDetails {
  imageBuffer: string;
  groups: any;
  product: any;
  cart: any;
}

const ProductDetails = (props: IProductDetails) => {
  const [addToCartOpen, setAddToCartOpen] = useState(false);
  const handleAddToCartOpen = () => setAddToCartOpen(true);
  const handleAddToCartClose = () => setAddToCartOpen(false);

  const [addToCollectionOpen, setAddToCollectionOpen] = useState(false);
  const handleAddToCollectionOpen = () => setAddToCollectionOpen(true);
  const handleAddToCollectionClose = () => setAddToCollectionOpen(false);

  const [imageBuffer] = useState(props.imageBuffer);
  const [product] = useState(props.product);
  const [cartQty, setCartQty] = useState(props.cart.length);
  const [uniqueItem, setUniqueItem] = useState();

  const dispatch = useAppDispatch();

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

  const addToCart = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();
      const cartPostResponse = await dispatch(
        addToCartReducer(props.product.id)
      );
      setUniqueItem(cartPostResponse.payload.cart.uniqueItem);

      const cartResponse = await dispatch(getCartReducer());
      setCartQty(cartResponse.payload.cart.length);

      handleAddToCartOpen();
    } catch (err) {
      console.log(err);
    }
  };

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
      {/* Added to Cart */}
      <AddToCart
        open={addToCartOpen}
        handleClose={handleAddToCartClose}
        product={product}
        uniqueItem={uniqueItem}
        setUniqueItem={setUniqueItem}
        setCartQty={setCartQty}
        // id={id}
      />
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

      <MainNav cartQty={cartQty} />
      <PagesNav />
      <Grid className="main-body">
        <Grid className="item-details">
          <Grid className="image-div">
            <Grid className="justify-center">
              <img
                className="big-image"
                src={imageBuffer}
                alt="product image"
              />
            </Grid>
          </Grid>
          <form>
            <Grid className="info-div">
              <h1>{product && product.title}</h1>
              <Grid className="info-detail-div">
                <label>price:</label>
                <h3 className="top-margin">${product && product.price}.00</h3>
              </Grid>
              <Grid className="info-detail-div">
                <label>info:</label>
                <h3 className="top-margin">{product && product.info}</h3>
              </Grid>
              <hr className="top-margin" />
              <Grid className="align-center">
                <button onClick={(e) => displayCollectionModal(e)}>
                  Add To Collection
                </button>
                <button onClick={(e) => addToCart(e)}>Add To Cart</button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <FooterC />
      </Grid>
    </Grid>
  );
};

export async function getStaticPaths() {
  const productsResponse = await IndexAPI.get(`/products`);

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
  const productResponse = await IndexAPI.get(`/products/${product}/${id}`);

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

  const collectionsResponse = await IndexAPI.get(`/collection/groups`);

  const cartResponse = await IndexAPI.get(`/cart`);

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
