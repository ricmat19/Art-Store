/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import IndexAPI from "../../../apis/indexAPI";
import { Backdrop, Box, Fade, Modal, Grid, MenuItem } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface ICreateHelpArticleForm {
  title: string;
  description: string;
  article: string;
  category: string;
  selectedSection: string;
  handleClose: any;
}

const initialValues = {
  title: "",
  description: "",
};

const onSubmit = (values: ICreateHelpArticleForm, onSubmitProps: any) => {
  IndexAPI.post(`/admin/help/${values.category}`, {
    title: values.title,
    article: values.article,
    selectedSection: values.selectedSection,
  });

  values.handleClose();
  onSubmitProps.resetForm();
};
const validationSchema = Yup.object({
  title: Yup.string().required("Email is required"),
  description: Yup.string().required("Email is required"),
});

const AdminCreateHelpArticle = (props: any) => {
  const [sections, setSections] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props.category === "gettingStarted") {
          setSections(["gettingStarted", "learnMore"]);
        } else if (props.category === "accountProfile") {
          setSections(["settings", "security"]);
        } else if (props.category === "troubleshooting") {
          setSections(["site", "product", "course", "payments"]);
        } else if (props.category === "courseTaking") {
          setSections(["player", "settings"]);
        } else if (props.category === "purchasesRefunds") {
          setSections(["purchasing", "promotions", "refunds"]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [props]);

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
                padding: "15px",
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
                    category: props.category,
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
                      sx={{
                        display: "grid",
                        padding: "15px",
                        gridTemplateColumns: "1fr auto",
                        gap: "15px",
                      }}
                    >
                      <Grid
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "75px auto",
                        }}
                      >
                        <label>Title: </label>
                        <Grid sx={{ display: "grid" }}>
                          <Field as="input" type="text" name="title" />
                          <ErrorMessage name="title" component="div">
                            {(errorMsg) => (
                              <Grid className="errorMsg">{errorMsg}</Grid>
                            )}
                          </ErrorMessage>
                        </Grid>
                      </Grid>
                      <Grid
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "75px auto",
                        }}
                      >
                        <Grid>
                          <label>Section:</label>
                        </Grid>
                        <Grid>
                          <Field type="select" className="type-selector">
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>

                            {sections.map((section: string) => {
                              return (
                                <MenuItem key={section} value={section}>
                                  {section}
                                </MenuItem>
                              );
                            })}
                          </Field>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      sx={{
                        display: "grid",
                        padding: "15px",
                        gridTemplateColumns: "75px auto",
                      }}
                    >
                      <label>Article:</label>
                      <Grid sx={{ display: "grid" }}>
                        <Field as="textarea" name="description" rows={20} />
                        <ErrorMessage name="description" component="div">
                          {(errorMsg) => (
                            <Grid className="errorMsg">{errorMsg}</Grid>
                          )}
                        </ErrorMessage>
                      </Grid>
                    </Grid>
                    <Grid className="align-center">
                      <button type="submit">Submit</button>
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

export default AdminCreateHelpArticle;
