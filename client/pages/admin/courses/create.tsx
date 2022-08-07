/* eslint-disable @next/next/no-img-element */
import { SetStateAction, useState, useEffect } from "react";
import IndexAPI from "../../../apis/indexAPI";
import AdminMainNav from "../../../components/admin/mainNav";
import AdminPagesNav from "../../../components/admin/pagesNav";
import Footer from "../../../components/footer";
import Head from "next/head";
import { Grid } from "@mui/material";
import router, { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
import { AxiosResponse } from "axios";

//Admin create course prop interface
interface ICreateCourseForm {
  title: string;
  image: File | undefined;
  subject: string;
  description: string;
  price: string;
}

//Admin create course Formik form initial values
const initialValues = {
  title: "",
  image: undefined,
  subject: "",
  description: "",
  price: "",
};

//Admin create course Formik form onSubmit function
const onSubmit = (
  values: ICreateCourseForm,
  onSubmitProps: { resetForm: () => void }
) => {
  //Check if an image is provided before creating course
  console.log(values)
  if (values.image) {
    const formData = new FormData();

    console.log(values.image)

    formData.append("title", values.title);
    formData.append("subject", values.subject);
    formData.append("images", values.image);
    formData.append("description", values.description);
    formData.append("price", values.price);

    //Create course and then route to course curriculum page
    let currentCourse: AxiosResponse<any, any>;
    IndexAPI.post("/admin/courses", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(async () => {
        currentCourse = await IndexAPI.get("/admin/courses/last");
      })
      .then(() => {
          router.push(
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

// //Admin create course Formik form validation schema
// const validationSchema = Yup.object({
//   title: Yup.string().required("Title is required"),
//   image: Yup.string().required("Image is required"),
//   subject: Yup.string().required("Subject is required"),
//   price: Yup.string().required("Price is required"),
//   description: Yup.string().required("Description is required"),
// });

//Admin create course functional component
const AdminCreateCourse = () => {
  //Admin create course states
  const [loginStatus, setLoginStatus] = useState<boolean>(true);
  const [image, setImage] = useState<File>();

  //Next router function
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Get and set login status on render
        const loginResponse = await IndexAPI.get(`/login`);
        setLoginStatus(loginResponse.data.data.loggedIn);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  //Create course image element
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

  // Render component based on login status
  if (loginStatus) {
    return (
      <Grid>
        <Head>
          <title>artHouse86-Admin Create Course</title>
        </Head>
        {/* Admin main navigation component */}
        <AdminMainNav />
        {/* Admin pages navigation component */}
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
                {/* Display course image */}
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
                // validationSchema={validationSchema}
                validateOnChange={false}
                validateOnBlur={false}
                validateOnMount
              >
                {/* Admin create course form */}
                <Form className="admin-form">
                  <Grid>
                    <Grid className="admin-form-field">
                      {/* Admin course title input field */}
                      <label className="admin-label">Title:</label>
                      <Grid sx={{ display: "grid" }}>
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
                    </Grid>
                    <Grid className="admin-form-field">
                      {/* Admin course image file input field */}
                      <label className="admin-label">Image:</label>
                      <Grid sx={{ display: "grid" }}>
                        <Field
                          type="file"
                          name="image"
                          className="file-input"
                          onChange={(e: {
                            target: {
                              files: SetStateAction<File | undefined>[];
                            };
                          }) => setImage(e.target.files[0])}
                        />
                        <ErrorMessage name="image" component="div">
                          {(errorMsg) => (
                            <Grid className="errorMsg">{errorMsg}</Grid>
                          )}
                        </ErrorMessage>
                      </Grid>
                    </Grid>
                    <Grid className="admin-form-field">
                      {/* Admin course subject drop-down selection field */}
                      <Grid>
                        <label className="admin-label">Subject:</label>
                      </Grid>
                      <Grid sx={{ display: "grid" }}>
                        <Field
                          as="select"
                          className="type-selector"
                          name="subject"
                        >
                          <option value={"select subject..."}>
                            select subject...
                          </option>
                          <option value={"drawing"}>drawing</option>
                          <option value={"painting"}>painting</option>
                          <option value={"modeling"}>modeling</option>
                          <option value={"sculpting"}>sculpting</option>
                          <option value={"writing"}>writing</option>
                        </Field>
                      </Grid>
                      <ErrorMessage name="subject" component="div">
                        {(errorMsg) => (
                          <Grid className="errorMsg">{errorMsg}</Grid>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid className="admin-form-field">
                      {/* Admin course price input field */}
                      <label className="admin-label">Price:</label>
                      <Grid sx={{ display: "grid" }}>
                        <Field
                          as="input"
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
                    </Grid>
                    <Grid className="admin-form-field">
                      {/* Admin course description textbox input field */}
                      <label className="admin-label">Description:</label>
                      <Grid sx={{ display: "grid" }}>
                        <Field as="textarea" rows={12} name="description" />
                        <ErrorMessage name="description" component="div">
                          {(errorMsg) => (
                            <Grid className="errorMsg">{errorMsg}</Grid>
                          )}
                        </ErrorMessage>
                      </Grid>
                    </Grid>
                    <Grid className="admin-form-button">
                      <Grid className="text-center">
                        {/* Submit update course button */}
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
        {/* Footer component */}
        <Footer />
      </Grid>
    );
  } else {
    return <Grid></Grid>;
  }
};

export default AdminCreateCourse;
