/* eslint-disable @next/next/no-img-element */
import IndexAPI from "../../../apis/indexAPI";
import { Backdrop, Box, Fade, Modal, Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface ICreateArticleLectureForm {
  article: string;
  lecture: string;
  section: string;
  id: string;
}

const initialValues = {
  article: "",
  lecture: "",
};
const onSubmit = (values: ICreateArticleLectureForm, onSubmitProps: any) => {
  IndexAPI.put(
    `/admin/courses/lecture/${values.lecture}/${values.section}/${values.id}`,
    {
      article: values.article,
      description: values.lecture,
    }
  );
  onSubmitProps.resetForm();
};
const validationSchema = Yup.object({
  article: Yup.string().required("Article is required"),
  description: Yup.string().required("Description is required"),
});

const AdminCreateArticleLecture = (props: any) => {
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
                  initialValues={{
                    initialValues,
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
                      <h1 className="align-center">Article: {props.lecture}</h1>
                    </Grid>
                    <Grid
                      className="admin-form-field"
                      sx={{ display: "grid", padding: "15px" }}
                    >
                      <label className="admin-label">Description:</label>
                      <Grid sx={{ display: "grid" }}>
                        <Field as="textarea" name="description" rows={2} />
                        <ErrorMessage name="description" component="div">
                          {(errorMsg) => (
                            <Grid className="errorMsg">{errorMsg}</Grid>
                          )}
                        </ErrorMessage>
                      </Grid>
                    </Grid>
                    <Grid
                      className="admin-form-field"
                      sx={{ display: "grid", padding: "15px" }}
                    >
                      <label className="admin-label">Article:</label>
                      <Grid sx={{ display: "grid" }}>
                        <Field as="textarea" name="article" rows={15} />
                        <ErrorMessage name="article" component="div">
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

export default AdminCreateArticleLecture;
