/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { Backdrop, Box, Fade, Modal, Grid } from "@mui/material";
import { IProduct } from "../../../interfaces";

//Add to cart prop interface
interface IAddToCart {
  product: IProduct;
  uniqueItem: boolean;
  open: boolean;
  handleClose: () => void;
  setUniqueItem: () => void;
  setCartQty: () => void;
  id: string;
}

//Add to cart functional component
const AddToCart = (props: IAddToCart) => {

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       console.log(props.modalStatus);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchData();
  // }, [props]);

  //Next router function
  const router = useRouter();

  //Add to cart modal
  return (
    <Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              border: "2px solid #fff",
              boxShadow: 24,
            }}
          >
            <Grid
              container
              sx={{
                flexDirection: "row",
                flexWrap: "nowrap",
                alignItems: "center",
                color: "#000",
                justifyContent: "flex-end",
                backgroundColor: "#000",
                padding: "30px",
              }}
            >
              {/* Add to cart Form */}
              <form>
                {/* Add to cart text stating the item has been added to the cart or was already in the cart */}
                <Grid>
                  <h3 className="align-center">
                    {props.product.title} has {!props.uniqueItem ? "already" : ""}{" "}
                    been added to your cart.
                  </h3>
                </Grid>
                <Grid
                  sx={{ padding: "10px 0" }}
                  className="grid two-column-div"
                >
                  {/* Button routing user back to store */}
                  <button
                    className="added-button"
                    onClick={() => router.push("/")}
                  >
                    continue shopping
                  </button>
                  {/* Button routing user back to cart */}
                  <button
                    className="added-button"
                    onClick={() => router.push("/cart")}
                  >
                    view cart
                  </button>
                </Grid>
              </form>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </Grid>
  );
};

export default AddToCart;
