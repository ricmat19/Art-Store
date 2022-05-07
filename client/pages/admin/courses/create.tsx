/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import IndexAPI from "../../../apis/indexAPI";
import AdminMainNav from "../../../components/admin/mainNav";
import AdminPagesNav from "../../../components/admin/pagesNav";
import Footer from "../../../components/footer";
import Head from "next/head";
import { Grid, MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  title: "",
  image: "",
  subject: "",
  price: "",
  description: "",
};
const onSubmit = (values: any, onSubmitProps: any) => {
  if (values.image) {
    let formData = new FormData();

    formData.append("title", values.title);
    formData.append("subject", values.subject);
    formData.append("images", values.image);
    formData.append("description", values.description);
    formData.append("price", values.price);

    let currentCourse: any;
    IndexAPI.post("/admin/courses", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(async () => {
        currentCourse = IndexAPI.get("/admin/courses/last");
      })
      .then(async () => {
        values.router.push(
          {
            pathname: `/admin/courses/[subject]/[course]/curriculum`,
          },
          `/admin/courses/${values.subject}/${currentCourse.data.data.course[0].id}/curriculum`
        );
      })
      .catch((err) => console.log(err));
  }
  onSubmitProps.resetForm();
};
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  image: Yup.string().required("Image is required"),
  subject: Yup.string().required("Subject is required"),
  price: Yup.string().required("Price is required"),
  description: Yup.string().required("Description is required"),
});

const AdminCreateCourse = () => {
  const [loginStatus, setLoginStatus] = useState<boolean>(true);

  const [image] = useState<File>();

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginResponse = await IndexAPI.get(`/login`);
        setLoginStatus(loginResponse.data.data.loggedIn);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

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

  if (loginStatus) {
    return (
      <Grid>
        <Head>
          <title>artHouse19-Admin Create Course</title>
        </Head>
        <AdminMainNav />
        <AdminPagesNav />
        <Grid>
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
            <Grid sx={{ padding: "0 30px 0 0", width: "50%" }}>
              <Grid className="image">
                <Grid className="big-image-div">{displayedImage}</Grid>
              </Grid>
            </Grid>
            <Grid
              sx={{
                width: "50%",
                padding: "0 0 0 30px",
                borderLeft: "1px #fff solid",
                height: "100%",
              }}
            >
              <Formik
                initialValues={{
                  initialValues: initialValues,
                  router: router,
                  image: image,
                }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
                validateOnChange={false}
                validateOnBlur={false}
                validateOnMount
              >
                <Form className="admin-form">
                  <Grid>
                    <Grid className="admin-form-field">
                      <label className="admin-label">Title:</label>
                      <Field
                        as="input"
                        type="text"
                        name="title"
                        className="form-control"
                        required
                      />
                      <ErrorMessage name="title" component="div">
                        {(errorMsg) => (
                          <Grid className="errorMsg">{errorMsg}</Grid>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid className="admin-form-field">
                      <label className="admin-label">Image:</label>
                      <Field type="file" name="image" className="file-input" />
                      <ErrorMessage name="image" component="div">
                        {(errorMsg) => (
                          <Grid className="errorMsg">{errorMsg}</Grid>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid className="admin-form-field">
                      <Grid>
                        <label className="admin-label">Subject:</label>
                      </Grid>
                      <Grid>
                        <Field
                          as="select"
                          className="type-selector"
                          name="subject"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={"drawing"}>drawing</MenuItem>
                          <MenuItem value={"painting"}>painting</MenuItem>
                          <MenuItem value={"modeling"}>modeling</MenuItem>
                          <MenuItem value={"sculpting"}>sculpting</MenuItem>
                          <MenuItem value={"writing"}>writing</MenuItem>
                        </Field>
                      </Grid>
                      <ErrorMessage name="subject" component="div">
                        {(errorMsg) => (
                          <Grid className="errorMsg">{errorMsg}</Grid>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid className="admin-form-field">
                      <label className="admin-label">Price:</label>
                      <Field
                        as="text"
                        type="number"
                        name="price"
                        className="form-control"
                        required
                      />
                      <ErrorMessage name="price" component="div">
                        {(errorMsg) => (
                          <Grid className="errorMsg">{errorMsg}</Grid>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid className="admin-form-field">
                      <label className="admin-label">Description:</label>
                      <Field as="textarea" rows={12} name="description" />
                      <ErrorMessage name="description" component="div">
                        {(errorMsg) => (
                          <Grid className="errorMsg">{errorMsg}</Grid>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid className="admin-form-button">
                      <Grid className="text-center">
                        <Grid>
                          <button type="submit" className="btn form-button">
                            Create Course
                          </button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Form>
              </Formik>
            </Grid>
          </Grid>
        </Grid>
        <Footer />
      </Grid>
    );
  } else {
    return <Grid></Grid>;
  }
};

export default AdminCreateCourse;
