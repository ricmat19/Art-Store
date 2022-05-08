/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import IndexAPI from "../../apis/indexAPI";
import { Backdrop, Box, Fade, Modal, Grid } from "@mui/material";
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
const onSubmit = (values: any, onSubmitProps: any) => {
  if (values.image) {
    let formData = new FormData();

    formData.append("title", values.title);
    formData.append("product", values.type);
    formData.append("images", values.image);
    formData.append("quantity", values.quantity);
    formData.append("price", values.price);
    formData.append("info", values.info);

    IndexAPI.post("/admin/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    values.handleClose();
  }
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
  const [image, setImage] = useState<File>();

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
                  initialValues={{
                    initialValues: initialValues,
                    image: image,
                  }}
                  onSubmit={onSubmit}
                  validationSchema={validationSchema}
                  validateOnChange={false}
                  validateOnBlur={false}
                  validateOnMount
                >
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
                      <Grid sx={{ display: "grid" }}>
                        <Field as="input" type="text" name="name" />
                        <ErrorMessage name="name" component="div">
                          {(errorMsg) => (
                            <Grid className="errorMsg">{errorMsg}</Grid>
                          )}
                        </ErrorMessage>
                      </Grid>
                    </Grid>
                    <Grid className="admin-form-field">
                      <Grid>
                        <label className="admin-label">Type:</label>
                      </Grid>
                      <Grid>
                        <Field as="select" className="type-selector">
                          <option value={"select type"}>select type...</option>
                          <option value={"print"}>print</option>
                          <option value={"painting"}>painting</option>
                          <option value={"sculpture"}>sculpture</option>
                          <option value={"model"}>model</option>
                          <option value={"book"}>book</option>
                          <option value={"comic"}>comic</option>
                        </Field>
                      </Grid>
                    </Grid>
                    <Grid className="admin-form-field">
                      <label className="admin-label">Image:</label>
                      <Grid sx={{ display: "grid" }}>
                        <Field
                          type="file"
                          onChange={(e: any) => setImage(e.target.files[0])}
                          name="image"
                          className="form-control file-input"
                        />
                        <ErrorMessage name="image" component="div">
                          {(errorMsg) => (
                            <Grid className="errorMsg">{errorMsg}</Grid>
                          )}
                        </ErrorMessage>
                      </Grid>
                    </Grid>
                    <Grid className="admin-form-field">
                      <label className="admin-label">Quantity:</label>
                      <Grid sx={{ display: "grid" }}>
                        <Field as="input" type="number" name="quantity" />
                        <ErrorMessage name="quantity" component="div">
                          {(errorMsg) => (
                            <Grid className="errorMsg">{errorMsg}</Grid>
                          )}
                        </ErrorMessage>
                      </Grid>
                    </Grid>
                    <Grid className="admin-form-field">
                      <label className="admin-label">Price:</label>
                      <Grid sx={{ display: "grid" }}>
                        <Field as="input" type="number" name="price" />
                        <ErrorMessage name="price" component="div">
                          {(errorMsg) => (
                            <Grid className="errorMsg">{errorMsg}</Grid>
                          )}
                        </ErrorMessage>
                      </Grid>
                    </Grid>
                    <Grid className="admin-form-field">
                      <label className="admin-label">Info:</label>
                      <Grid sx={{ display: "grid" }}>
                        <Field as="textarea" name="message" rows={5} />
                        <ErrorMessage name="message" component="div">
                          {(errorMsg) => (
                            <Grid className="errorMsg">{errorMsg}</Grid>
                          )}
                        </ErrorMessage>
                      </Grid>
                    </Grid>
                    <Grid className="admin-form-button">
                      <Grid className="text-center">
                        <Grid>
                          <button type="submit" className="btn form-button">
                            Submit
                          </button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Form>
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
