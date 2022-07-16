/* eslint-disable @next/next/no-img-element */
import IndexAPI from "../../../apis/indexAPI";
import { Backdrop, Box, Fade, Grid, Modal } from "@mui/material";
import { IProduct } from "../../../interfaces";

//Admin delete product props interface
interface IAdminDeleteProduct {
  deleteProduct: IProduct | undefined;
  handleClose: () => void;
  open: boolean;
}

//Admin delete product modal functional component
const AdminDeleteProduct = (props: IAdminDeleteProduct) => {
  //Admin function to delete a product
  const handleDelete = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      if (props.deleteProduct !== undefined) {
        await IndexAPI.delete(`/admin/products/${props.deleteProduct.id}`);
      }
      props.handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  //Display the delete product modal if a product is provided
  if (props.deleteProduct) {
    //Admin delete product modal
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
                bgcolor: "#000",
                border: "2px solid #fff",
                boxShadow: 24,
                width: "60vw",
              }}
            >
              <Grid
                container
                sx={{
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  color: "#000",
                  backgroundColor: "#000",
                  padding: "30px",
                }}
              >
                <Grid
                  className="image"
                  sx={{
                    justifyContent: "center",
                  }}
                >
                  <Grid className="big-image-div">
                    <img
                      className="big-image"
                      src={props.deleteProduct.imagekey}
                      alt="big image"
                    />
                  </Grid>
                </Grid>
                <Grid
                  sx={{
                    padding: "0 0 0 30px",
                    height: "100%",
                  }}
                >
                  {/* Admin delete product form */}
                  <form className="admin-form">
                    <Grid className="align-center">
                      <h1>
                        Are you sure you want to delete &quot;
                        {props.deleteProduct.title}&quot; ?
                      </h1>
                    </Grid>
                    {/* Product delete button */}
                    <button onClick={handleDelete} type="submit">
                      Delete
                    </button>
                  </form>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Modal>
      </Grid>
    );
  } else {
    return <Grid></Grid>;
  }
};

export default AdminDeleteProduct;
