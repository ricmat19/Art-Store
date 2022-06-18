/* eslint-disable @next/next/no-img-element */
import IndexAPI from "../../../apis/indexAPI";
import { Backdrop, Box, Fade, Modal, Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ReactChild, ReactFragment, ReactPortal } from "react";

//Admin create video lecture prop interface
interface IAdminCreateVideoLecture {
  open: boolean;
  handleClose: () => void;
  lecture: string &
    (boolean | ReactChild | ReactFragment | ReactPortal | null | undefined);
  section: string;
  id: string;
}
interface ICreateVideoLectureForm {
  video: string;
  description: string;
  lecture: string;
  section: string;
  id: string;
  handleClose: () => void;
}

//Admin create video lecture Formik form initial values
const initialValues = {
  video: "",
  description: "",
  lecture: "",
  section: "",
  id: "",
};

//Admin create video lecture Formik form onSubmit function
const onSubmit = (
  values: ICreateVideoLectureForm,
  onSubmitProps: { resetForm: () => void }
) => {
  if (values.video) {
    const formData = new FormData();

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

//Admin create video lecture Formik form validation schema
const validationSchema = Yup.object({
  video: Yup.string().required("Video is required"),
  description: Yup.string().required("Description is required"),
});

//Admin create video lecture functional component
const AdminCreateVideoLectureModal = (props: IAdminCreateVideoLecture) => {
  //Admin create video lecture modal
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
                  }}
                  onSubmit={onSubmit}
                  validationSchema={validationSchema}
                  validateOnChange={false}
                  validateOnBlur={false}
                  validateOnMount
                >
                  {/* Admin create video lecture Form */}
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
                    {/* Video file input field for create article video form*/}
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
                    {/* Description input field for create article lecture form*/}
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
                    {/* Admin submit create video lecture form */}
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

export default AdminCreateVideoLectureModal;
