/* eslint-disable @next/next/no-img-element */
// import { useState } from "react";
// import { useRouter } from "next/router";
import IndexAPI from "../../../apis/indexAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  Backdrop,
  Box,
  Fade,
  Modal,
  Grid,
  MenuItem,
  Button,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  collection: "",
};
const onSubmit = (values: any, onSubmitProps: any) => {
  IndexAPI.post("/collections", {
    user: "ric19mat@gmail.com",
    collectionGroup: values.collection,
    item: values.product.id,
  });
  onSubmitProps.resetForm();
};
const validationSchema = Yup.object({
  collection: Yup.string().required("Email is required"),
});

const AddToCollection = (props: any) => {
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
                validationSchema={validationSchema}
                validateOnChange={false}
                validateOnBlur={false}
                validateOnMount
              >
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
                        <Field
                          as="select"
                          displayEmpty
                          className="type-selector"
                        >
                          <MenuItem value="">
                            <em>Select Collection...</em>
                          </MenuItem>
                          {props.collections.map((collection: any) => {
                            return (
                              <MenuItem
                                key={collection.collection_group}
                                value={collection.collection_group}
                              >
                                {collection.collection_group}
                              </MenuItem>
                            );
                          })}
                        </Field>
                      </Grid>
                    </Grid>
                    <Grid sx={{ display: "grid", justifyContent: "center" }}>
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
