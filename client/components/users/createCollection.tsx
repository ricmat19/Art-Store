/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import IndexAPI from "../../apis/indexAPI";
import { Backdrop, Box, Fade, Modal, Grid, Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

//Create collection interface
interface ICreateCollectionForm {
  collection_user: string;
  collection_group: string;
}

interface ICreateCollection {
  open: boolean;
  handleClose: () => void;
  collections: ICreateCollectionForm[];
}

//Create collection Formik form initial values
const initialValues = {
  collection_user: "ric19mat@gmail.com",
  collection_group: "",
};

//Create collection Formik form onSubmit function
const onSubmit = async (
  values: ICreateCollectionForm,
  onSubmitProps: { resetForm: () => void }
) => {
  await IndexAPI.post("/collections", {
    collectionUser: values.collection_user,
    collectionGroup: values.collection_group,
  });

  onSubmitProps.resetForm();
};

//Create collection Formik form validation schema
// const validationSchema = Yup.object({
//   title: Yup.string().required("Email is required"),
//   type: Yup.string().required("Email is required"),
//   image: Yup.string().required("Email is required"),
//   quantity: Yup.string().required("Email is required"),
//   price: Yup.string().required("Email is required"),
//   info: Yup.string().required("Email is required"),
// });

//Create Collection functional component
const CreateCollection = (props: ICreateCollection) => {
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
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                // validationSchema={validationSchema}
                validateOnChange={false}
                validateOnBlur={false}
                validateOnMount
              >
                {/* Add to collection form */}
                <Form>
                  <Grid sx={{ gap: "10px" }} className="grid">
                    <h1 className="header">Add to Collection</h1>
                    <Grid sx={{ display: "grid", gap: "10px" }}>
                      <Grid
                        sx={{
                          display: "grid",
                        }}
                      >
                        {/* Create a new collection input field */}
                        <Grid sx={{ display: "grid" }}>
                          <Field
                            as="input"
                            placeholder="Create new collection..."
                            name="collection_group"
                          />
                          <ErrorMessage name="collection" component="div">
                            {(errorMsg) => (
                              <Grid className="errorMsg">{errorMsg}</Grid>
                            )}
                          </ErrorMessage>
                        </Grid>
                        {/* Button to create a new collection */}
                      </Grid>
                    </Grid>
                    <Grid sx={{ display: "grid", justifyContent: "center" }}>
                      {/* Button to add a product to a collection */}
                      <button type="submit" className="added-button">
                        Add to Collection
                      </button>
                    </Grid>
                  </Grid>
                </Form>
              </Formik>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </Grid>
  );
};

export default CreateCollection;
