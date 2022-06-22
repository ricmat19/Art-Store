/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import IndexAPI from "../../../apis/indexAPI";
import { Backdrop, Box, Fade, Modal, Grid, MenuItem } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

//Admin create help article prop interface
interface IAdminCreateHelpArticle {
  category: string;
  open: boolean;
  handleClose: () => void;
  lecture: string | undefined;
}
interface ICreateHelpArticleForm {
  title: string;
  description: string;
  article: string;
  category: string;
  selectedSection: string;
  handleClose: () => void;
}

//Admin create help article Formik form initial values
const initialValues = {
  title: "",
  description: "",
};

//Admin create help article Formik form onSubmit function
const onSubmit = async (
  values: ICreateHelpArticleForm,
  onSubmitProps: { resetForm: () => void }
) => {
  await IndexAPI.post(`/admin/help/${values.category}`, {
    title: values.title,
    article: values.article,
    selectedSection: values.selectedSection,
  });

  values.handleClose();
  onSubmitProps.resetForm();
};

//Admin create help article Formik form validation schema
const validationSchema = Yup.object({
  title: Yup.string().required("Email is required"),
  description: Yup.string().required("Email is required"),
});

//Admin create help article modal functional component
const AdminCreateHelpArticleModal = (props: IAdminCreateHelpArticle) => {
  //AdminCreateHelpArticleModal state
  const [sections, setSections] = useState<string[]>([]);

  //Set the component's sections based on the category property provided
  useEffect(() => {
    const fetchData = () => {
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

  //Admin create help article modal
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
                  {/* Admin create help article form */}
                  <Form
                    className="admin-form"
                    action="/admin/products"
                    method="POST"
                    encType="multipart/form-data"
                  >
                    {/* Display the article lecture */}
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
                        {/* Admin create help article title input */}
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
                          {/* Admin create help article section drop-down input field */}
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
                      {/* Admin create help article description textarea */}
                      <Grid sx={{ display: "grid" }}>
                        <Field as="textarea" name="description" rows={20} />
                        <ErrorMessage name="description" component="div">
                          {(errorMsg) => (
                            <Grid className="errorMsg">{errorMsg}</Grid>
                          )}
                        </ErrorMessage>
                      </Grid>
                    </Grid>
                    {/* Admin submit create help article form */}
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

export default AdminCreateHelpArticleModal;
