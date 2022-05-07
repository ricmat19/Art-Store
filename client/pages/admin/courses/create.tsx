/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import IndexAPI from "../../../apis/indexAPI";
import AdminMainNav from "../../../components/admin/mainNav";
import AdminPagesNav from "../../../components/admin/pagesNav";
import Footer from "../../../components/footer";
import Head from "next/head";
import { Grid, Select, MenuItem } from "@mui/material";
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
const onSubmit = (onSubmitProps: any) => {
  onSubmitProps.resetForm();
};
const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required"),
  image: Yup.string()
    .required("Image is required"),
  subject: Yup.string()
    .required("Subject is required"),
  price: Yup.string()
    .required("Price is required"),
  description: Yup.string()
    .required("Description is required"),
});

const AdminCreateCourse = () => {
  const [loginStatus, setLoginStatus] = useState<boolean>(true);

  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<File>();
  const [subject, setSubject] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");

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

  const createCourse = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      if (image) {
        let formData = new FormData();

        formData.append("title", title);
        formData.append("subject", subject);
        formData.append("images", image);
        formData.append("description", description);
        formData.append("price", price);

        await IndexAPI.post("/admin/courses", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then(async () => {
            const currentCourse = await IndexAPI.get("/admin/courses/last");
            router.push(
              {
                pathname: `/admin/courses/[subject]/[course]/curriculum`,
              },
              `/admin/courses/${subject}/${currentCourse.data.data.course[0].id}/curriculum`
            );
          })
          .catch((err) => console.log(err));
      }
    } catch (err) {
      console.log(err);
    }
  };

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

  const handleChange = (event: any) => {
    setSubject(event.target.value);
  };

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
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
                validateOnChange={false}
                validateOnBlur={false}
                validateOnMount
              >
               {(formik) => {
                return (
                  <Form className="admin-form">
                    <Grid>
                      <Grid className="admin-form-field">
                        <label className="admin-label">Title:</label>
                        <Field
                          value={title}
                          onChange={(e: any) => setTitle(e.target.value)}
                          type="text"
                          name="title"
                          className="form-control"
                          required
                        />
                        <ErrorMessage name="email" component="div">
                          {(errorMsg) => (
                            <Grid className="errorMsg">{errorMsg}</Grid>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid className="admin-form-field">
                        <label className="admin-label">Image:</label>
                        <Field
                          type="file"
                          onChange={(e: any) => setImage(e.target.files[0])}
                          name="image"
                          className="form-control file-input"
                          required
                        />
                        <ErrorMessage name="email" component="div">
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
                          <Select
                            value={subject}
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                            className="type-selector"
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={"drawing"}>drawing</MenuItem>
                            <MenuItem value={"painting"}>painting</MenuItem>
                            <MenuItem value={"modeling"}>modeling</MenuItem>
                            <MenuItem value={"sculpting"}>sculpting</MenuItem>
                            <MenuItem value={"writing"}>writing</MenuItem>
                          </Select>
                        </Grid>
                        <ErrorMessage name="email" component="div">
                          {(errorMsg) => (
                            <Grid className="errorMsg">{errorMsg}</Grid>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid className="admin-form-field">
                        <label className="admin-label">Price:</label>
                        <Field
                          value={price}
                          onChange={(e: any) => setPrice(e.target.value)}
                          type="number"
                          name="price"
                          className="form-control"
                          required
                        />
                        <ErrorMessage name="email" component="div">
                          {(errorMsg) => (
                            <Grid className="errorMsg">{errorMsg}</Grid>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid className="admin-form-field">
                        <label className="admin-label">Description:</label>
                        <Field
                          value={description}
                          onChange={(e: any) => setDescription(e.target.value)}
                          rows={12}
                          required
                          name="description"
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
                              onClick={createCourse}
                              type="submit"
                              className="btn form-button"
                              disabled={!formik.isValid}
                            >
                              Create Course
                            </button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Form>);
                }}
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
