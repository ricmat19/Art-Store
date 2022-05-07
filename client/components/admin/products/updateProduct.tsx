/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import IndexAPI from "../../../apis/indexAPI";
import {
  Backdrop,
  Box,
  Fade,
  Grid,
  Modal,
  Select,
  MenuItem,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  email: "",
};
const onSubmit = (onSubmitProps: any) => {
  onSubmitProps.resetForm();
};
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const AdminUpdateProduct = (props: any) => {
  const [title, setTitle] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const [fileImage] = useState<File>();
  const [, setImagekey] = useState<string>("");
  const [imageBuffer, setImageBuffer] = useState<string>("");
  const [qty, setQty] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props.updateProduct) {
          setTitle(props.updateProduct.title);
          setProduct(props.updateProduct.product);
          setPrice(props.updateProduct.price);
          setInfo(props.updateProduct.info);
          setImagekey(props.updateProduct.imagekey);
          setImageBuffer(props.updateProduct.imageBuffer);
          setQty(props.updateProduct.qty);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [props]);

  const updateProduct = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      if (fileImage) {
        let formData = new FormData();

        formData.append("title", title);
        formData.append("product", product);
        formData.append("price", price);
        formData.append("info", info);
        formData.append("qty", qty);
        formData.append("image", fileImage);

        await IndexAPI.put(
          `/admin/products/${props.updateProduct.id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        props.handleClose();
      } else {
        await IndexAPI.put(`/admin/products/${props.updateProduct.id}`, {
          title,
          product,
          price,
          info,
          qty,
        });
        props.handleClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event: any) => {
    setProduct(event.target.value);
  };

  if (props.updateProduct) {
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
                  <Grid className="image align-center">
                    {fileImage ? (
                      <img
                        className="big-image"
                        src={URL.createObjectURL(fileImage)}
                        alt="big image"
                      />
                    ) : (
                      <img
                        className="big-image"
                        src={imageBuffer}
                        alt="product"
                      />
                    )}
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
                      <Form className="admin-form">
                        <Grid className="admin-form-field">
                          <label className="admin-label">Title:</label>
                          <Field
                            value={title}
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
                            <label className="admin-label">Product:</label>
                          </Grid>
                          <Grid>
                            <Select
                              value={product}
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
                        {/* <Grid className="admin-form-field">
                      <label className="admin-label">Image:</label>
                      <input
                        type="file"
                        onChange={(e: any) => setFileImage(e.target.files[0])}
                        name="image"
                        className="form-control file-input"
                        required
                      />
                    </Grid> */}
                        <Grid className="admin-form-field">
                          <label className="admin-label">Quantity:</label>
                          <Field
                            value={qty}
                            onChange={(e: any) => setQty(e.target.value)}
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
                          <input
                            value={price}
                            onChange={(e: any) => setPrice(e.target.value)}
                            type="number"
                            name="price"
                            className="form-control"
                            required
                          />
                        </Grid>
                        <Grid className="admin-form-field">
                          <label className="admin-label">Info:</label>
                          <Field
                            value={info}
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
                                onClick={updateProduct}
                                type="submit"
                                className="btn form-button"
                                disabled={!formik.isValid}
                              >
                                Submit
                              </button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Form>;
                    }}
                  </Formik>
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

export default AdminUpdateProduct;
