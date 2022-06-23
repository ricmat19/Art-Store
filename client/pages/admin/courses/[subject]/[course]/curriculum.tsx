/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, MouseEvent } from "react";
import IndexAPI from "../../../../../apis/indexAPI";
import AdminMainNav from "../../../../../components/admin/mainNav";
import AdminPagesNav from "../../../../../components/admin/pagesNav";
import Footer from "../../../../../components/footer";
import Head from "next/head";
import { Grid, Button } from "@mui/material";
// import { useRouter } from "next/router";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Content from "../../../../../components/admin/courses/contentModal";
import AdminCreateVideoLecture from "../../../../../components/admin/courses/createVideoLectureModal";
import AdminCreateArticleLecture from "../../../../../components/admin/courses/createArticleLectureModal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ICourse } from "../../../../../interfaces";

//Course curriculum prop interface
interface IAdminCourseCurriculum {
  courseSections: {
    section: string;
  }[];
  courseLectures: {
    id: string;
    section: string;
    lecture: string;
    index: string;
  }[];
}

//Course curriculum Formik form initial values
const initialValues = {
  email: "",
};

//Course curriculum Formik form onSubmit function
const onSubmit = (
  values: IAdminCourseCurriculum,
  onSubmitProps: { resetForm: () => void }
) => {
  // if (values.create = "section") {
  //         IndexAPI.post(`/admin/courses/section/${values.course}`, {
  //           values.section
  //         });
  // } else {
  //     IndexAPI.post(`/admin/courses/lecture/${values.course}`, {
  //       values.section,
  //       values.lecture,
  //     });
  // }
  onSubmitProps.resetForm();
};

//Course curriculum Formik form validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

//Course curriculum functional component
const CourseCurriculum = (props: IAdminCourseCurriculum) => {
  //Course curriculum states
  const [loginStatus, setLoginStatus] = useState<boolean>(true);
  const [contentOpen, setContentOpen] = useState<
    Element | ((element: Element) => Element) | null | undefined
  >();
  const [id, setId] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const [lecture, setLecture] = useState<string>("");
  const [addVideoOpen, setAddVideoOpen] = useState(false);
  const [addArticleOpen, setAddArticleOpen] = useState(false);

  //?
  const openContent = Boolean(contentOpen);

  //?
  const handleContentClick = (
    event: /* eslint-disable @next/next/no-img-element */
    MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    lecture: { id: string; section: string; lecture: string; index?: string }
  ) => {
    setId(lecture.id);
    setSection(lecture.section);
    setLecture(lecture.lecture);
    setContentOpen(event.currentTarget);
  };

  //?
  const handleContentClose = () => {
    setContentOpen(undefined);
  };

  //Course curriculum open/close add video modal
  const handleAddVideoOpen = () => setAddVideoOpen(true);
  const handleAddVideoClose = () => setAddVideoOpen(false);

  //Course curriculum open/close add article modal
  const handleAddArticleOpen = () => setAddArticleOpen(true);
  const handleAddArticleClose = () => setAddArticleOpen(false);

  // const { query } = useRouter();

  //Get login status on render
  useEffect(() => {
    const fetchData = () => {
      try {
        const loginResponse = IndexAPI.get(`/login`);
        setLoginStatus(loginResponse.data.data.loggedIn);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  // const createSection = async (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   try {

  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const createLecture = async (section: any) => {
  //   try {

  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  //Display component depending on login status
  if (loginStatus) {
    return (
      <Grid>
        {/* Content component */}
        <Content
          contentOpen={contentOpen}
          openContent={openContent}
          handleContentClose={handleContentClose}
          handleAddVideoOpen={handleAddVideoOpen}
          handleAddArticleOpen={handleAddArticleOpen}
        />
        {/* Create video lecture component */}
        <AdminCreateVideoLecture
          id={id}
          section={section}
          lecture={lecture}
          open={addVideoOpen}
          handleClose={handleAddVideoClose}
        />
        {/* Create article lecture component */}
        <AdminCreateArticleLecture
          id={id}
          section={section}
          lecture={lecture}
          open={addArticleOpen}
          handleClose={handleAddArticleClose}
        />
        <Head>
          <title>artHouse19-Admin Create Course Curriculum</title>
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
              color: "#000",
              backgroundColor: "#000",
              padding: "30px 10%",
              width: "100vw",
              display: "grid",
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
              {/* Course curriculum form */}
              <Form className="admin-form">
                <Grid sx={{ display: "grid", gap: "30px" }}>
                  <Grid
                    sx={{
                      display: "grid",
                      border: "white 2px solid",
                      padding: "30px",
                    }}
                  >
                    <Grid
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "80% 20%",
                      }}
                    >
                      <Grid
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "100px auto",
                          marginRight: "10px",
                        }}
                      >
                        <h2 className="align-left">Section:</h2>
                        <Grid sx={{ display: "grid" }}>
                          {/* Input field for course curriculum section*/}
                          <Field as="input" type="text" name="section" />
                          <ErrorMessage name="section" component="div">
                            {(errorMsg) => (
                              <Grid className="errorMsg">{errorMsg}</Grid>
                            )}
                          </ErrorMessage>
                        </Grid>
                      </Grid>
                      <Grid className="plus-icon align-center">
                        {/* Create course section submit button  */}
                        <Grid
                        // onClick={createSection}
                        >
                          Create Section
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid>
                    <Grid
                      sx={{
                        display: "grid",
                        border: "white 2px solid",
                        padding: "30px",
                        gap: "10px",
                      }}
                    >
                      {/* Map out the list of existing course sections */}
                      {props.courseSections.map(
                        (section, index) => {
                          return (
                            <Grid
                              sx={{
                                border: "white 2px solid",
                                padding: "30px",
                              }}
                              key={index.toString()}
                            >
                              <Grid sx={{ paddingBottom: "50px" }}>
                                <h2 className="align-left">
                                  Section {index + 1}: {section.section}
                                </h2>
                              </Grid>
                              <Grid
                                sx={{
                                  display: "grid",
                                  gridTemplateColumns: "80% 20%",
                                  paddingBottom: "20px",
                                }}
                              >
                                <Grid
                                  sx={{
                                    display: "grid",
                                    gridTemplateColumns: "100px auto",
                                    marginRight: "10px",
                                  }}
                                >
                                  <h2 className="align-left">Lecture:</h2>
                                  <Grid sx={{ display: "grid" }}>
                                    {/* Section lecture input field */}
                                    <Field
                                      as="input"
                                      type="text"
                                      name="lecture"
                                    />
                                    <ErrorMessage
                                      name="lecture"
                                      component="div"
                                    >
                                      {(errorMsg) => (
                                        <Grid className="errorMsg">
                                          {errorMsg}
                                        </Grid>
                                      )}
                                    </ErrorMessage>
                                  </Grid>
                                </Grid>
                                {/* Create section lecture submit button */}
                                <Grid
                                  className="plus-icon align-center"
                                  // onClick={() => createLecture(section.section)}
                                >
                                  Create Lecture
                                </Grid>
                              </Grid>
                              <hr />
                              {/* Map course section's lectures */}
                              {props.courseLectures.map(
                                (lecture, index) => {
                                  return lecture.section === section.section ? (
                                    <Grid>
                                      <Grid
                                        key={index}
                                        sx={{
                                          display: "grid",
                                          gridTemplateColumns: "75px auto auto",
                                          alignItems: "center",
                                          padding: "20px 0",
                                        }}
                                      >
                                        <Grid>
                                          <h3>Lecture:</h3>
                                        </Grid>
                                        <Grid>
                                          <h3>{lecture.lecture}</h3>
                                        </Grid>
                                        <Grid sx={{ textAlign: "right" }}>
                                          {/* ? */}
                                          <Button
                                            className="plus-icon"
                                            onClick={(e) =>
                                              handleContentClick(e, lecture)
                                            }
                                          >
                                            <FontAwesomeIcon icon={faPlus} />
                                            <Grid sx={{ paddingLeft: "5px" }}>
                                              Content
                                            </Grid>
                                          </Button>
                                        </Grid>
                                      </Grid>
                                      <hr />
                                    </Grid>
                                  ) : (
                                    <Grid key={index}></Grid>
                                  );
                                }
                              )}
                            </Grid>
                          );
                        }
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Grid>
        </Grid>
        <Footer />
      </Grid>
    );
  } else {
    return <Grid></Grid>;
  }
};

// Get list of courses before render to set curriculum paths
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
  const courseSections = await IndexAPI.get(
    `/admin/courses/sections/${course}`
  );

  //Get list of course lectures before render
  const courseLectures = await IndexAPI.get(
    `/admin/courses/lectures/${course}`
  );

  //Provider the course section and lectures as props to the curriculum component
  return {
    props: {
      courseSections: courseSections.data.data.sections,
      courseLectures: courseLectures.data.data.lectures,
    },
    revalidate: 1,
  };
}

export default CourseCurriculum;
