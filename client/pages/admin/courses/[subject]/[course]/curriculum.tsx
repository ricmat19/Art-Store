/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import IndexAPI from "../../../../../apis/indexAPI";
import AdminMainNav from "../../../../../components/admin/mainNav";
import AdminPagesNav from "../../../../../components/admin/pagesNav";
import Footer from "../../../../../components/footer";
import Head from "next/head";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";

const AdminCourseCurriculum = (props: any) => {
  const [loginStatus, setLoginStatus] = useState<boolean>(true);

  const [section, setSection] = useState<string>("");
  const [lecture, setLecture] = useState<string>("");
  const [courseSections] = useState<string[]>(props.courseSections);
  const [courseLectures] = useState<string[]>(props.courseLectures);

  const { query } = useRouter();

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

  const createSection = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await IndexAPI.post(`/admin/courses/section/${query.course}`, {
        section,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const createLecture = async (section: any) => {
    try {
      await IndexAPI.post(`/admin/courses/lecture/${query.course}`, {
        section,
        lecture,
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (loginStatus) {
    return (
      <Grid>
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
            <form className="admin-form">
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
                      <input
                        value={section}
                        onChange={(e) => setSection(e.target.value)}
                        type="text"
                        name="section"
                        required
                      />
                    </Grid>
                    <Grid className="plus-icon align-center">
                      <Grid onClick={createSection}>Create Section</Grid>
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
                    {courseSections.map((section: any, index: any) => {
                      return (
                        <Grid
                          sx={{
                            border: "white 2px solid",
                            padding: "30px",
                          }}
                          key={index}
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
                              <input
                                onChange={(e) => setLecture(e.target.value)}
                                type="text"
                                name="lecture"
                                required
                              />
                            </Grid>
                            <Grid
                              className="plus-icon align-center"
                              onClick={() => createLecture(section.section)}
                            >
                              Create Lecture
                            </Grid>
                          </Grid>
                          <hr />
                          {courseLectures.map((lecture: any, index: any) => {
                            console.log(lecture.section === section.section);
                            return lecture.section === section.section ? (
                              <Grid key={index}>
                                <h3>{lecture.lecture}</h3>
                              </Grid>
                            ) : (
                              <Grid key={index}></Grid>
                            );
                          })}
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              </Grid>
            </form>
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
  const subject = context.params.subject;
  console.log(subject);
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
