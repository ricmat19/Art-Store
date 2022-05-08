/* eslint-disable @next/next/no-img-element */
import IndexAPI from "../../../apis/indexAPI";
import { Backdrop, Box, Fade, Modal, Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  video: "",
  description: "",
};
const onSubmit = (values: any, onSubmitProps: any) => {
  if (values.video) {
    let formData = new FormData();

    formData.append("video", values.video);
    formData.append("description", values.description);

    IndexAPI.put(
      `/admin/courses/lecture/${values.lecture}/${values.section}/${values.id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    values.handleClose();
  }
  onSubmitProps.resetForm();
};
const validationSchema = Yup.object({
  video: Yup.string().required("Video is required"),
  description: Yup.string().required("Description is required"),
});

const AdminCreateVideoLecture = (props: any) => {
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
              maxWidth: "600px",
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
                  width: "100%",
                  height: "100%",
                }}
              >
                <Formik
                  initialValues={{
                    initialValues: initialValues,
                    lecture: props.lecture,
                    section: props.section,
                    id: props.id,
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
                      <h1 className="align-center">
                        Video Lecture: {props.lecture}
                      </h1>
                    </Grid>
                    <Grid className="admin-form-field">
                      <label className="admin-label">Video:</label>
                      <Grid sx={{ display: "grid" }}>
                        <Field
                          type="file"
                          name="video"
                          className="form-control file-input"
                        />
                        <ErrorMessage name="video" component="div">
                          {(errorMsg) => (
                            <Grid className="errorMsg">{errorMsg}</Grid>
                          )}
                        </ErrorMessage>
                      </Grid>
                    </Grid>
                    <Grid className="admin-form-field">
                      <label className="admin-label">Description:</label>
                      <Grid sx={{ display: "grid" }}>
                        <Field
                          as="textarea"
                          name="description"
                          rows={5}
                          className="form-control"
                        />
                        <ErrorMessage name="video" component="div">
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

export default AdminCreateVideoLecture;
