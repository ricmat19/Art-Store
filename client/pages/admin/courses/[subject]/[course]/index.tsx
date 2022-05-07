/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import IndexAPI from "../../../../../apis/indexAPI";
import AdminMainNav from "../../../../../components/admin/mainNav";
import AdminPagesNav from "../../../../../components/admin/pagesNav";
import Footer from "../../../../../components/footer";
import Head from "next/head";
import { Grid, Select, MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  title: "",
  subject: "",
  price: "",
  description: "",
};
const onSubmit = (onSubmitProps: any) => {
  onSubmitProps.resetForm();
};
const validationSchema = Yup.object({
  title: Yup.string().required("Email is required"),
  subject: Yup.string().required("Email is required"),
  price: Yup.string().required("Email is required"),
  description: Yup.string().required("Email is required"),
});

const AdminCourse = (props: any) => {
  const [loginStatus, setLoginStatus] = useState<boolean>(true);

  const [title, setTitle] = useState<string>(props.selectedCourse[0].title);
  // const [image] = useState<File>();
  const [subject, setSubject] = useState<string>(
    props.selectedCourse[0].subject
  );
  const [price, setPrice] = useState<string>(props.selectedCourse[0].price);
  const [description, setDescription] = useState<string>(
    props.selectedCourse[0].description
  );

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

  const updateCourse = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      // if (image) {
      //   let formData = new FormData();
      //   console.log(formData)
      // formData.append("title", title);
      // formData.append("subject", subject);
      // formData.append("images", image);
      // formData.append("description", description);
      // formData.append("price", price);

      // await IndexAPI.put("/admin/courses", formData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // })
      //   .then((res) => {
      //     console.log(res);
      //     router.push("/admin/courses/create/curriculum");
      //   })
      //   .catch((err) => console.log(err));
      // }else{
      await IndexAPI.put(`/admin/courses/${props.selectedCourse[0].id}`, {
        title,
        subject,
        description,
        price,
      });
      router.push(
        {
          pathname: `/admin/courses/[subject]/[course]/curriculum`,
          query: {
            subject: props.selectedCourse[0].subject,
            course: props.selectedCourse[0].id,
          },
        },
        `/admin/courses/${props.selectedCourse[0].subject}/${props.selectedCourse[0].id}/curriculum`
      );
      // }
    } catch (err) {
      console.log(err);
    }
  };

  let displayedImage;
  // if (image !== undefined) {
  //   displayedImage = (
  //     <img
  //       className="big-image"
  //       src={URL.createObjectURL(image)}
  //       alt="big image"
  //     />
  //   );
  // } else {
  displayedImage = (
    <img
      className="big-image"
      src={props.selectedCourse[0].imageBuffer}
      alt="big image"
    />
  );
  // }

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
                            </Select>
                          </Grid>
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
                            onChange={(e: any) =>
                              setDescription(e.target.value)
                            }
                            rows={12}
                            name="description"
                            required
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
                                onClick={updateCourse}
                                type="submit"
                                className="btn form-button"
                                disabled={!formik.isValid}
                              >
                                Update Course
                              </button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Form>
                  );
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

export async function getStaticPaths() {
  const coursesResponse = await IndexAPI.get(`/admin/courses`);
  return {
    fallback: false,
    paths: coursesResponse.data.data.courses.map((course: any) => ({
      params: {
        subject: course.subject,
        course: course.id,
      },
    })),
  };
}

export async function getStaticProps(context: {
  params: { subject: any; course: any };
}) {
  const course = context.params.course;
  const courseResponse = await IndexAPI.get(`/admin/courses/course/${course}`);

  for (let i = 0; i < courseResponse.data.data.course.length; i++) {
    if (courseResponse.data.data.course[i].imagekey !== null) {
      let imagesResponse = await IndexAPI.get(
        `/images/${courseResponse.data.data.course[i].imagekey}`,
        {
          responseType: "arraybuffer",
        }
      ).then((response) =>
        Buffer.from(response.data, "binary").toString("base64")
      );

      courseResponse.data.data.course[
        i
      ].imageBuffer = `data:image/png;base64,${imagesResponse}`;
    }
  }

  return {
    props: {
      selectedCourse: courseResponse.data.data.course,
    },
    revalidate: 1,
  };
}

export default AdminCourse;
