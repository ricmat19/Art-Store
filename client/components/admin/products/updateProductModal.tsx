/* eslint-disable @next/next/no-img-element */
import { SetStateAction, useEffect, useState } from "react";
import IndexAPI from "../../../apis/indexAPI";
import { Backdrop, Box, Fade, Grid, Modal } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

//Update product props interface
interface IAdminUpdateProduct {
  updateProduct: {
    title: SetStateAction<string>;
    product: SetStateAction<string>;
    price: SetStateAction<string>;
    info: SetStateAction<string>;
    imageKey: SetStateAction<string>;
    imageBuffer: SetStateAction<string>;
    qty: SetStateAction<string>;
  };
  open: boolean;
  handleClose: () => void;
}
interface IUpdateProduct {
  id: string;
}
interface IUpdateProductForm {
  email: string;
  title: string;
  product: string;
  price: string;
  info: string;
  qty: string;
  fileImage: File;
  handleClose: () => void;
  updateProduct: IUpdateProduct;
}

//Admin update product Formik form initial values
const initialValues = {
  email: "",
};

//Admin update product Formik form onSubmit function
const onSubmit = (values: any, onSubmitProps: { resetForm: () => void }) => {
  if (values.fileImage) {
    let formData = new FormData();

    formData.append("title", values.title);
    formData.append("product", values.product);
    formData.append("price", values.price);
    formData.append("info", values.info);
    formData.append("qty", values.qty);
    formData.append("image", values.fileImage);

    IndexAPI.put(`/admin/products/${values.updateProduct.id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    values.handleClose();
  } else {
    IndexAPI.put(`/admin/products/${values.updateProduct.id}`, {
      title: values.title,
      product: values.product,
      price: values.price,
      info: values.info,
      qty: values.qty,
    });
    values.handleClose();
  }
  onSubmitProps.resetForm();
};

//Admin update product Formik form validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

//Admin update product functional component
const AdminUpdateProductModal = (props: IAdminUpdateProduct) => {
  //Admin update product states
  const [, setTitle] = useState<string>("");
  const [, setProduct] = useState<string>("");
  const [, setPrice] = useState<string>("");
  const [, setInfo] = useState<string>("");
  const [fileImage] = useState<File>();
  const [, setImageKey] = useState<string>("");
  const [imageBuffer, setImageBuffer] = useState<string>("");
  const [, setQty] = useState<string>("");

  //If a product is provided, set the component's states to that product's properties on render
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props.updateProduct) {
          setTitle(props.updateProduct.title);
          setProduct(props.updateProduct.product);
          setPrice(props.updateProduct.price);
          setInfo(props.updateProduct.info);
          setImageKey(props.updateProduct.imageKey);
          setImageBuffer(props.updateProduct.imageBuffer);
          setQty(props.updateProduct.qty);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [props]);

  //Display the update product modal if a product is provided
  if (props.updateProduct) {
    //Admin update product modal
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
                  {/* Display the product image or a new image in a file image is provided*/}
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
                    {/* Admin update product form */}
                    <Form className="admin-form">
                      <Grid className="admin-form-field">
                        <label className="admin-label">Title:</label>
                        {/* Admin update product name input field */}
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
                          <label className="admin-label">Product:</label>
                        </Grid>
                        {/* Admin update product type drop-down input field */}
                        <Grid>
                          <Field as="select" className="type-selector">
                            <option value={"select product..."}>
                              select product...
                            </option>
                            <option value={"print"}>print</option>
                            <option value={"painting"}>painting</option>
                            <option value={"sculpture"}>sculpture</option>
                            <option value={"model"}>model</option>
                            <option value={"book"}>book</option>
                            <option value={"comic"}>comic</option>
                          </Field>
                        </Grid>
                      </Grid>
                      {/* Admin update product file image input field */}
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
                        {/* Admin update product quantity input field */}
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
                        {/* Admin update product price input field */}
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
                        {/* Admin update product message textarea field */}
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
                          {/* Admin submit update update form */}
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
  } else {
    return <Grid></Grid>;
  }
};

export default AdminUpdateProductModal;
