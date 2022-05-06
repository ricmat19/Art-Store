/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import IndexAPI from "../../../apis/indexAPI";
import {
  Backdrop,
  Box,
  Fade,
  Modal,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  title: "",
  description: "",
};
const onSubmit = (onSubmitProps: any) => {
  onSubmitProps.resetForm();
};
const validationSchema = Yup.object({
  title: Yup.string().required("Email is required"),
  description: Yup.string().required("Email is required"),
});

const AdminCreateHelpArticle = (props: any) => {
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");
  const [sections, setSections] = useState<string[]>([]);
  const [selectedSection, setSelectedSection] = useState<string>("");

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

  const createHelpArticle = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await IndexAPI.post(`/admin/help/${props.category}`, {
        title,
        article,
        selectedSection,
      });

      props.handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event: any) => {
    setSelectedSection(event.target.value);
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
                          <Field
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            name="title"
                            required
                          />
                          <ErrorMessage name="email" component="div">
                            {(errorMsg) => (
                              <Grid className="errorMsg">{errorMsg}</Grid>
                            )}
                          </ErrorMessage>
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
                            <Select
                              value={selectedSection}
                              onChange={handleChange}
                              displayEmpty
                              inputProps={{ "aria-label": "Without label" }}
                              className="type-selector"
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>

                              {sections.map((section: any) => {
                                return (
                                  <MenuItem key={section} value={section}>
                                    {section}
                                  </MenuItem>
                                );
                              })}
                            </Select>
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
                        <Field
                          value={article}
                          onChange={(e) => setArticle(e.target.value)}
                          name="description"
                          rows={20}
                          className="form-control"
                          required
                        />
                        <ErrorMessage name="email" component="div">
                          {(errorMsg) => (
                            <Grid className="errorMsg">{errorMsg}</Grid>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid className="align-center">
                        <button
                          type="submit"
                          onClick={(e) => createHelpArticle(e)}
                          disabled={!formik.isValid}
                        >
                          Submit
                        </button>
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

export default AdminCreateHelpArticle;
