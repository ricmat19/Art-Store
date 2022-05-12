/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useRouter } from "next/router";
import { Backdrop, Box, Fade, Modal, Grid } from "@mui/material";

const AddToCart = (props: any) => {
  const [product] = useState(props.product);
  const [uniqueItem] = useState(props.uniqueItem);

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

  const router = useRouter();

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
              <form>
                <Grid>
                  <h3 className="align-center">
                    {product.title} has {!uniqueItem ? "already" : ""} been
                    added to your cart.
                  </h3>
                </Grid>
                <Grid
                  sx={{ padding: "10px 0" }}
                  className="grid two-column-div"
                >
                  <button
                    className="added-button"
                    onClick={() => router.push("/")}
                  >
                    continue shopping
                  </button>
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
