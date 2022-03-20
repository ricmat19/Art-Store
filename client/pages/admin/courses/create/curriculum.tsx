/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import IndexAPI from "../../../../apis/indexAPI";
import AdminMainNav from "../../../../components/admin/mainNav";
import AdminPagesNav from "../../../../components/admin/pagesNav";
import Footer from "../../../../components/footer";
import Head from "next/head";
import { Grid, Button } from "@mui/material";

const AdminCreateCourse = () => {
  const [loginStatus, setLoginStatus] = useState<boolean>(true);

  const [newSection, setNewSection] = useState<string>("");
  const [sections, setSections] = useState<string[]>([]);
  const [newLecture] = useState<string>("");

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
      const createdSections: string[] = sections;
      createdSections.push(newSection);
      setSections(createdSections);
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
                        value={newSection}
                        onChange={(e) => setNewSection(e.target.value)}
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
                    {sections.map((section: any) => {
                      return (
                        <Grid key={section}>
                          <Grid>
                            <h2 className="align-left">{section}</h2>
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

export default AdminCreateCourse;
