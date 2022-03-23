/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import IndexAPI from "../../../../../apis/indexAPI";
import AdminMainNav from "../../../../../components/admin/mainNav";
import AdminPagesNav from "../../../../../components/admin/pagesNav";
import Footer from "../../../../../components/footer";
import Head from "next/head";
import { Grid, Button } from "@mui/material";
import { useRouter } from "next/router";

const AdminCourseCurriculum = (props: any) => {
  const [loginStatus, setLoginStatus] = useState<boolean>(true);

  const [section, setSection] = useState<string>("");
  const [newLecture] = useState<string>("");
  const [courseSections] = useState<string[]>(props.courseSections);
  //   const [lectures] = useState<string[]>(props.courseLectures);

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
      await IndexAPI.post(`/admin/courses/${query.course}/section`, {
        section,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const createLecture = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const createdLectures: string[] = [];
      createdLectures.push(newLecture);
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
                <Grid sx={{ border: "white 2px solid", padding: "30px" }}>
                  <Grid>
                    <Grid className="admin-section-form-field">
                      <label>Section:</label>
                      <input
                        value={section}
                        onChange={(e) => setSection(e.target.value)}
                        type="text"
                        name="section"
                        required
                      />
                    </Grid>
                  </Grid>
                  <Grid className="curriculum-plus-icon-div">
                    <Button
                      sx={{
                        fontFamily: "Rajdhani",
                        fontSize: "20px",
                        color: "white",
                        textTransform: "none",
                        padding: "0",
                      }}
                    >
                      <Grid className="plus-icon" onClick={createSection}>
                        Create Section
                      </Grid>
                    </Button>
                  </Grid>
                </Grid>
                <Grid>
                  <Grid sx={{ border: "white 2px solid", padding: "30px" }}>
                    {courseSections.map((section: any, index: any) => {
                      return (
                        <Grid
                          sx={{ border: "white 2px solid", padding: "30px" }}
                          className="two-column-div"
                          key={index}
                        >
                          <Grid>
                            <h2 className="align-left">
                              Lecture {index + 1}: {section.section}
                            </h2>
                          </Grid>
                          <Grid className="plus-icon" onClick={createLecture}>
                            Create Lecture
                          </Grid>
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

  //   const courseLectures = await IndexAPI.get(
  //     `/admin/courses/${course}/lectures`
  //   );
  //   console.log(courseLectures);

  return {
    props: {
      courseSections: courseSections.data.data.sections,
      //   courseLectures: courseLectures.data.data.course,
    },
    revalidate: 1,
  };
}

export default AdminCourseCurriculum;
