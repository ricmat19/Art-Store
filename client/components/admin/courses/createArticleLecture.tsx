/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import IndexAPI from "../../../apis/indexAPI";
import { Backdrop, Box, Fade, Modal, Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  article: "",
  description: ""
};
const onSubmit = (onSubmitProps: any) => {
  onSubmitProps.resetForm();
};
const validationSchema = Yup.object({
  article: Yup.string()
    .required("Article is required"),
  description: Yup.string()
    .required("Description is required")
});

const AdminCreateArticleLecture = (props: any) => {
  const [article, setArticle] = useState("");
  const [description, setDescription] = useState<string>("");

  const createArticleLecture = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await IndexAPI.put(
        `/admin/courses/lecture/${props.lecture}/${props.section}/${props.id}`,
        {
          article,
          description,
        }
      );

      props.handleClose();
    } catch (err) {
      console.log(err);
    }
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
              width: "80vw",
              maxWidth: "1000px",
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
              }}
            >
              <Grid
                sx={{
                  width: "100%",
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
                    <Form
                      className="admin-form"
                      action="/admin/products"
                      method="POST"
                      encType="multipart/form-data"
                    >
                      <Grid className="admin-form-title">
                        <h1 className="align-center">
                          Article: {props.lecture}
                        </h1>
                      </Grid>
                      <Grid
                        className="admin-form-field"
                        sx={{ display: "grid", padding: "15px" }}
                      >
                        <label className="admin-label">Description:</label>
                        <Field
                          value={description}
                          onChange={(e: any) => setDescription(e.target.value)}
                          name="description"
                          rows={2}
                          className="form-control"
                          required
                        />
                        <ErrorMessage name="email" component="div">
                          {(errorMsg) => (
                            <Grid className="errorMsg">{errorMsg}</Grid>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid
                        className="admin-form-field"
                        sx={{ display: "grid", padding: "15px" }}
                      >
                        <label className="admin-label">Article:</label>
                        <Field
                          value={article}
                          onChange={(e: any) => setArticle(e.target.value)}
                          name="description"
                          rows={15}
                          className="form-control"
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
                              onClick={createArticleLecture}
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
};

export default AdminCreateArticleLecture;
