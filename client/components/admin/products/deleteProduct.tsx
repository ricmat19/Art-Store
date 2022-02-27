import { useEffect, useState } from "react";
import IndexAPI from "../../../apis/indexAPI";
import { Backdrop, Box, Fade, Grid, Modal } from "@mui/material";

const AdminDeleteProduct = (props: any) => {
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props.deleteItem !== undefined) {
          const productResponse = await IndexAPI.get(
            `/admin/products/${props.deleteItem}`
          );
          setTitle(productResponse.data.data.product[0].title);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [props]);

  const handleDelete = async () => {
    try {
      await IndexAPI.delete(`/admin/delete/${props.deleteItem}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid>
      {console.log(title)}
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
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
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
              <Grid
                sx={{
                  width: "50%",
                  padding: "0 0 0 30px",
                  borderLeft: "1px #fff solid",
                  height: "100%",
                }}
              >
                <form
                  className="admin-form"
                  action="/routes/admin.js"
                  method="POST"
                >
                  <Grid className="align-center">
                    <h1>
                      Are you sure you want to delete &quot;{title}&quot; ?
                    </h1>
                  </Grid>
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
};

export default AdminDeleteProduct;
