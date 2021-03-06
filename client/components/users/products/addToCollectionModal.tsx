/* eslint-disable @next/next/no-img-element */
// import { useState } from "react";
// import { useRouter } from "next/router";
import IndexAPI from "../../../apis/indexAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Backdrop, Box, Fade, Modal, Grid, Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
import { IProduct } from "../../../interfaces";

//Add to collection prop interface
interface ICollection {
  id: string;
  collection_group: string;
}
interface IAddToCollection {
  open: boolean;
  handleClose: () => void;
  collections: ICollection[];
  collection: ICollection | undefined;
  product: IProduct;
  uniqueItem: boolean;
  setUniqueItem: (arg0: any) => void;
}

//Add to collection Formik form initial values
const initialValues = {
  collection_group: "",
  id: "",
};

//Add to collection Formik form onSubmit function
const onSubmit = async (
  values: ICollection,
  onSubmitProps: { resetForm: () => void }
) => {
  await IndexAPI.post("/collections", {
    collectionUser: "ric19mat@gmail.com",
    collectionGroup: values.collection_group,
    item: values.id,
  });
  onSubmitProps.resetForm();
};

// //Add to collection Formik form validation schema
// const validationSchema = Yup.object({
//   collection: Yup.string().required("Email is required"),
// });

//Add to collection functional component
const AddToCollection = (props: IAddToCollection) => {
  // const [newCollection, setNewCollection] = useState<string>("");

  // const createCollection = async (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   try {
  //     await IndexAPI.post(`/collections`, {
  //       user: "ric19mat@gmail.com",
  //       collectionGroup: newCollection,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  //Add to collection modal
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
                          gridTemplateColumns: "min-content 1fr",
                        }}
                      >
                        {/* Create a new collection input field */}
                        <Grid sx={{ display: "grid" }}>
                          <Field
                            as="input"
                            placeholder="Create new collection..."
                            name="collection"
                          />
                          <ErrorMessage name="collection" component="div">
                            {(errorMsg) => (
                              <Grid className="errorMsg">{errorMsg}</Grid>
                            )}
                          </ErrorMessage>
                        </Grid>
                        {/* Button to create a new collection */}
                        <Button
                          // onClick={createCollection}
                          sx={{
                            fontFamily: "Rajdhani",
                            fontSize: "20px",
                            color: "white",
                            textTransform: "none",
                          }}
                        >
                          <FontAwesomeIcon
                            className="plus-icon"
                            icon={faPlus}
                          />
                        </Button>
                      </Grid>
                      <Grid
                        sx={{
                          display: "grid",
                        }}
                      >
                        {/* Drop-down input field to select a collection to add a product to */}
                        <Field
                          as="select"
                          displayEmpty
                          className="type-selector"
                        >
                          <option value={"select collection..."}>
                            select collection...
                          </option>
                          {props.collections.map((collection: ICollection) => {
                            return (
                              <option
                                key={collection.collection_group}
                                value={collection.collection_group}
                              >
                                {collection.collection_group}
                              </option>
                            );
                          })}
                        </Field>
                      </Grid>
                    </Grid>
                    <Grid sx={{ display: "grid", justifyContent: "center" }}>
                      {/* Button to add a product to a collection */}
                      <button className="added-button">
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

export default AddToCollection;
