/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useRouter } from "next/router";
import {
  Backdrop,
  Box,
  Fade,
  Modal,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";

const AddToWishlist = (props: any) => {
  const [collection, setCollection] = useState("");
  // const [product] = useState(props.product);
  // const [uniqueItem] = useState(props.uniqueItem);

  const router = useRouter();

  // const addToWishlist = async (e: { preventDefault: () => void }) => {
  //   try {
  //     e.preventDefault();
  //     const wishlistPost = await IndexAPI.post("/wishlist", {
  //       group: group,
  //       user: "ric19mat@gmail.com",
  //       item: id,
  //     });
  //     setUniqueItem(wishlistPost.data.data.uniqueItem);
  //     setWishlistModal("modal-bg active");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleChange = (event: any) => {
    setCollection(event.target.value);
  };

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
              width: "90vw",
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
                <Grid className="added-content modal-content">
                  <h1 className="header">Add to Wishlist</h1>
                  <Grid>
                    <Select
                      value={collection}
                      onChange={handleChange}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      className="type-selector"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {props.collections.map((collection: any) => {
                        return (
                          <Grid key={collection}>
                            <MenuItem value={collection}>{collection}</MenuItem>
                          </Grid>
                        );
                      })}
                    </Select>
                  </Grid>
                  <Grid className="grid two-column-div">
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
                </Grid>
              </form>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </Grid>
  );
};

export default AddToWishlist;
