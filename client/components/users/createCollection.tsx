/* eslint-disable @next/next/no-img-element */
import { useState, useRef } from "react";
import IndexAPI from "../../apis/indexAPI";
import {
  Backdrop,
  Box,
  Fade,
  Modal,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  title: "",
  type: "",
  image: "",
  quantity: "",
  price: "",
  info: "",
};
const onSubmit = (onSubmitProps: any) => {
  onSubmitProps.resetForm();
};
const validationSchema = Yup.object({
  title: Yup.string().required("Email is required"),
  type: Yup.string().required("Email is required"),
  image: Yup.string().required("Email is required"),
  quantity: Yup.string().required("Email is required"),
  price: Yup.string().required("Email is required"),
  info: Yup.string().required("Email is required"),
});

const AdminAddProduct = (props: any) => {
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

        props.handleClose();
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
                <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={validationSchema}
                  validateOnChange={false}
                  validateOnBlur={false}
                  validateOnMount
                >
                  {(formik) => {
                    return (
                      <Form
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
                          <Field
                            value={title}
                            ref={titleInput}
                            onChange={(e: any) => setTitle(e.target.value)}
                            type="text"
                            name="name"
                            className="form-control"
                            required
                          />
                          <ErrorMessage name="email" component="div">
                            {(errorMsg) => (
                              <Grid className="errorMsg">{errorMsg}</Grid>
                            )}
                          </ErrorMessage>
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
                          <Field
                            type="file"
                            onChange={(e: any) => setImage(e.target.files[0])}
                            name="image"
                            className="form-control file-input"
                            required
                          />
                          <ErrorMessage name="email" component="div">
                            {(errorMsg) => (
                              <Grid className="errorMsg">{errorMsg}</Grid>
                            )}
                          </ErrorMessage>
                        </Grid>
                        <Grid className="admin-form-field">
                          <label className="admin-label">Quantity:</label>
                          <Field
                            value={quantity}
                            ref={quantityInput}
                            onChange={(e: any) => setQuantity(e.target.value)}
                            type="number"
                            name="quantity"
                            className="form-control"
                            required
                          />
                          <ErrorMessage name="email" component="div">
                            {(errorMsg) => (
                              <Grid className="errorMsg">{errorMsg}</Grid>
                            )}
                          </ErrorMessage>
                        </Grid>
                        <Grid className="admin-form-field">
                          <label className="admin-label">Price:</label>
                          <Field
                            value={price}
                            ref={priceInput}
                            onChange={(e: any) => setPrice(e.target.value)}
                            type="number"
                            name="price"
                            className="form-control"
                            required
                          />
                          <ErrorMessage name="email" component="div">
                            {(errorMsg) => (
                              <Grid className="errorMsg">{errorMsg}</Grid>
                            )}
                          </ErrorMessage>
                        </Grid>
                        <Grid className="admin-form-field">
                          <label className="admin-label">Info:</label>
                          <Field
                            value={info}
                            ref={infoInput}
                            onChange={(e: any) => setInfo(e.target.value)}
                            name="message"
                            rows={5}
                            required
                          />
                          <ErrorMessage name="email" component="div">
                            {(errorMsg) => (
                              <Grid className="errorMsg">{errorMsg}</Grid>
                            )}
                          </ErrorMessage>
                        </Grid>
                        <Grid className="admin-form-button">
                          <Grid className="text-center">
                            <Grid>
                              <button
                                onClick={createProduct}
                                type="submit"
                                className="btn form-button"
                                disabled={!formik.isValid}
                              >
                                Submit
                              </button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Form>
                    );
                  }}
                </Formik>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </Grid>
  );
};

export default AdminAddProduct;
