/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from "react";
import IndexAPI from "../../../apis/indexAPI";
import {
  Backdrop,
  Box,
  Fade,
  Modal,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";

const DayEvents = (props: any) => {
  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [image, setImage] = useState<File>();
  const [quantity, setQuantity] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [info, setInfo] = useState<string>("");

  const titleInput = useRef(null);
  const quantityInput = useRef(null);
  const priceInput = useRef(null);
  const infoInput = useRef(null);

  const createProduct = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      if (image) {
        let formData = new FormData();

        formData.append("title", title);
        formData.append("product", type);
        formData.append("images", image);
        formData.append("quantity", quantity);
        formData.append("price", price);
        formData.append("info", info);

        await IndexAPI.post("/admin/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      }
    } catch (err) {
      console.log(err);
    }
  };

  let displayedImage;
  if (image !== undefined) {
    displayedImage = (
      <img
        className="big-image"
        src={URL.createObjectURL(image)}
        alt="big image"
      />
    );
  }

  const handleChange = (event: any) => {
    setType(event.target.value);
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
              <Grid sx={{ padding: "0 30px 0 0", width: "50%" }}>
                <Grid className="image">
                  <Grid className="big-image-div">{displayedImage}</Grid>
                </Grid>
              </Grid>
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
                  action="/admin/products"
                  method="POST"
                  encType="multipart/form-data"
                >
                  <Grid className="admin-form-title">
                    <h1 className="align-center">Create</h1>
                  </Grid>
                  <Grid className="admin-form-field">
                    <label className="admin-label">Title:</label>
                    <input
                      value={title}
                      ref={titleInput}
                      onChange={(e) => setTitle(e.target.value)}
                      type="text"
                      name="name"
                      className="form-control"
                      required
                    />
                  </Grid>
                  <Grid className="admin-form-field">
                    <Grid>
                      <label className="admin-label">Type:</label>
                    </Grid>
                    <Grid>
                      <Select
                        value={type}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="type-selector"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"print"}>print</MenuItem>
                        <MenuItem value={"painting"}>painting</MenuItem>
                        <MenuItem value={"sculpture"}>sculpture</MenuItem>
                        <MenuItem value={"model"}>model</MenuItem>
                        <MenuItem value={"book"}>book</MenuItem>
                        <MenuItem value={"comic"}>comic</MenuItem>
                      </Select>
                    </Grid>
                  </Grid>
                  <Grid className="admin-form-field">
                    <label className="admin-label">Image:</label>
                    <input
                      type="file"
                      onChange={(e: any) => setImage(e.target.files[0])}
                      name="image"
                      className="form-control file-input"
                      required
                    />
                  </Grid>
                  <Grid className="admin-form-field">
                    <label className="admin-label">Quantity:</label>
                    <input
                      value={quantity}
                      ref={quantityInput}
                      onChange={(e) => setQuantity(e.target.value)}
                      type="number"
                      name="quantity"
                      className="form-control"
                      required
                    />
                  </Grid>
                  <Grid className="admin-form-field">
                    <label className="admin-label">Price:</label>
                    <input
                      value={price}
                      ref={priceInput}
                      onChange={(e) => setPrice(e.target.value)}
                      type="number"
                      name="price"
                      className="form-control"
                      required
                    />
                  </Grid>
                  <Grid className="admin-form-field">
                    <label className="admin-label">Info:</label>
                    <textarea
                      value={info}
                      ref={infoInput}
                      onChange={(e) => setInfo(e.target.value)}
                      name="message"
                      rows={5}
                      required
                    ></textarea>
                  </Grid>
                  <Grid className="admin-form-button">
                    <Grid className="text-center">
                      <Grid>
                        <button
                          onClick={createProduct}
                          type="submit"
                          className="btn form-button"
                        >
                          Submit
                        </button>
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </Grid>
  );
};

export default DayEvents;
