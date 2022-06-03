/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
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

interface IAdminCourseCurriculum {
  courseSections: string[] | (() => string[]);
  courseLectures: ICourseLectures[] | (() => ICourseLectures[]);
}

interface ICreateCurriculumForm {
  email: string;
}

interface ICourseLectures {
  lecture: string;
  index: string;
}

const initialValues = {
  email: "",
};
const onSubmit = (
  values: ICreateCurriculumForm,
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
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const AdminCourseCurriculum = (props: IAdminCourseCurriculum) => {
  const [loginStatus, setLoginStatus] = useState<boolean>(true);

  const [contentOpen, setContentOpen] = useState(null);
  const openContent = Boolean(contentOpen);

  const handleContentClick = (event: any, lecture: any) => {
    setId(lecture.id);
    setSection(lecture.section);
    setLecture(lecture.lecture);
    setContentOpen(event.currentTarget);
  };

  const handleContentClose = () => {
    setContentOpen(null);
  };

  const [addVideoOpen, setAddVideoOpen] = useState(false);
  const handleAddVideoOpen = () => setAddVideoOpen(true);
  const handleAddVideoClose = () => setAddVideoOpen(false);

  const [addArticleOpen, setAddArticleOpen] = useState(false);
  const handleAddArticleOpen = () => setAddArticleOpen(true);
  const handleAddArticleClose = () => setAddArticleOpen(false);

  const [id, setId] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const [lecture, setLecture] = useState<string>("");
  const [courseSections] = useState<string[]>(props.courseSections);
  const [courseLectures] = useState<ICourseLectures[]>(props.courseLectures);

  // const { query } = useRouter();

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

  if (loginStatus) {
    return (
      <Grid>
        <Content
          contentOpen={contentOpen}
          openContent={openContent}
          handleContentClose={handleContentClose}
          handleAddVideoOpen={handleAddVideoOpen}
          handleAddArticleOpen={handleAddArticleOpen}
        />
        <AdminCreateVideoLecture
          id={id}
          section={section}
          lecture={lecture}
          open={addVideoOpen}
          handleClose={handleAddVideoClose}
        />
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
        <AdminMainNav />
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
                          <Field as="input" type="text" name="section" />
                          <ErrorMessage name="section" component="div">
                            {(errorMsg) => (
                              <Grid className="errorMsg">{errorMsg}</Grid>
                            )}
                          </ErrorMessage>
                        </Grid>
                      </Grid>
                      <Grid className="plus-icon align-center">
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
                      {courseSections.map((section: any, index: number) => {
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
                                  <Field
                                    as="input"
                                    type="text"
                                    name="lecture"
                                  />
                                  <ErrorMessage name="lecture" component="div">
                                    {(errorMsg) => (
                                      <Grid className="errorMsg">
                                        {errorMsg}
                                      </Grid>
                                    )}
                                  </ErrorMessage>
                                </Grid>
                              </Grid>
                              <Grid
                                className="plus-icon align-center"
                                // onClick={() => createLecture(section.section)}
                              >
                                Create Lecture
                              </Grid>
                            </Grid>
                            <hr />
                            {courseLectures.map(
                              (lecture: any, index: string) => {
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
                      })}
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

export async function getStaticProps(context: { params: { course: string } }) {
  const course = context.params.course;
  const courseSections = await IndexAPI.get(
    `/admin/courses/sections/${course}`
  );

  const courseLectures = await IndexAPI.get(
    `/admin/courses/lectures/${course}`
  );

  return {
    props: {
      courseSections: courseSections.data.data.sections,
      courseLectures: courseLectures.data.data.lectures,
    },
    revalidate: 1,
  };
}

export default AdminCourseCurriculum;
