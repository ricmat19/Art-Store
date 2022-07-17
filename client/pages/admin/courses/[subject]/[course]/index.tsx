/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import IndexAPI from "../../../../../apis/indexAPI";
import AdminMainNav from "../../../../../components/admin/mainNav";
import AdminPagesNav from "../../../../../components/admin/pagesNav";
import Footer from "../../../../../components/footer";
import Head from "next/head";
import { Grid, MenuItem } from "@mui/material";
import router, { NextRouter, useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
import { ICourse } from "../../../../../interfaces";

//Admin create course prop interface
interface IAdminCourse {
  selectedCourse: {
    id: string;
    subject: string;
  }[];
  title: string;
  subject: string;
  description: string;
  price: string;
}

//Admin course Formik form initial values
const initialValues = {
  selectedCourse: [
    {
      id: "",
      subject: "",
    },
  ],
  title: "",
  subject: "",
  description: "",
  price: "",
};

//Admin course Formik form onSubmit function
const onSubmit = async (
  values: IAdminCourse,
  onSubmitProps: { resetForm: () => void }
) => {
  //Update course
  await IndexAPI.put(`/admin/courses/${values.selectedCourse[0].id}`, {
    title: values.title,
    subject: values.subject,
    description: values.description,
    price: values.price,
  });

  //Route to the selected courses curriculum page
    await router.push(
      {
        pathname: `/admin/courses/[subject]/[course]/curriculum`,
        query: {
          subject: values.selectedCourse[0].subject,
          course: values.selectedCourse[0].id,
        },
      },
      `/admin/courses/${values.selectedCourse[0].subject}/${values.selectedCourse[0].id}/curriculum`
    );
  onSubmitProps.resetForm();
};

// //Admin course Formik form validation schema
// const validationSchema = Yup.object({
//   title: Yup.string().required("Email is required"),
//   subject: Yup.string().required("Email is required"),
//   price: Yup.string().required("Email is required"),
//   description: Yup.string().required("Email is required"),
// });

//Admin course functional component
const AdminCourse = (props: IAdminCourse) => {
  // Admin course states
  const [loginStatus, setLoginStatus] = useState<boolean>(true);

  // Next router function
  const router = useRouter();

  // Query login status on render
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

  //Create course image element
  const displayedImage = (
    <img
      className="big-image"
      src={props.selectedCourse[0].image_url}
      alt="big image"
    />
  );

  // Render component based on login status
  if (loginStatus) {
    return (
      <Grid>
        <Head>
          <title>artHouse19-Admin Create Course</title>
        </Head>
        {/* Display main navbar */}
        <AdminMainNav />
        {/* Display pages navbar */}
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
                {/* Admin course creation form */}
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
                        />
                        <ErrorMessage name="title" component="div">
                          {(errorMsg) => (
                            <Grid className="errorMsg">{errorMsg}</Grid>
                          )}
                        </ErrorMessage>
                      </Grid>
                    </Grid>
                    {/* Admin course image file input field */}
                    {/* <Grid className="admin-form-field">
                    <label className="admin-label">Image:</label>
                    <input
                      type="file"
                      onChange={(e: any) => setImage(e.target.files[0])}
                      name="image"
                      className="form-control file-input"
                      required
                    />
                  </Grid> */}
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
                          <MenuItem value={"select subject..."}>
                            select subject...
                          </MenuItem>
                          <MenuItem value={"drawing"}>drawing</MenuItem>
                          <MenuItem value={"painting"}>painting</MenuItem>
                          <MenuItem value={"modeling"}>modeling</MenuItem>
                          <MenuItem value={"sculpting"}>sculpting</MenuItem>
                          <MenuItem value={"writing"}>writing</MenuItem>
                        </Field>
                        <ErrorMessage name="subject" component="div">
                          {(errorMsg) => (
                            <Grid className="errorMsg">{errorMsg}</Grid>
                          )}
                        </ErrorMessage>
                      </Grid>
                    </Grid>
                    {/* Admin course price input field */}
                    <Grid className="admin-form-field">
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
                    {/* Admin course description textbox input field */}
                    <Grid className="admin-form-field">
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
                            Update Course
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

// Get list of courses to set course route paths
export async function getStaticPaths() {
  const coursesResponse = await IndexAPI.get(`/admin/courses`);
  return {
    fallback: false,
    paths: coursesResponse.data.data.courses.map((course: ICourse) => ({
      params: {
        subject: course.subject,
        course: course.id,
      },
    })),
  };
}

export async function getStaticProps(context: { params: { course: string } }) {
  //Get list of course sections
  const course = context.params.course;
  const courseResponse = await IndexAPI.get(`/admin/courses/course/${course}`);

  //Provide the selected course as a prop to the course component
  return {
    props: {
      selectedCourse: courseResponse.data.data.course,
    },
    revalidate: 1,
  };
}

export default AdminCourse;
