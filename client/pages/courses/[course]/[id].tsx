import React, { FC, useState } from "react";
import ReactPlayer from "react-player";
import MainNav from "../../../components/users/mainNav";
import PagesNav from "../../../components/users/pagesNav";
import FooterC from "../../../components/footer";
import { Grid } from "@mui/material";

const CourseC: FC = () => {

  const [fullDuration, ] = useState<string>("");
  const [lessonDuration, ] = useState<string>("");

  return (
    <div>
      <MainNav />
      <PagesNav cartQty={cartQty} />
      <Grid container sx={{gap: "25px", justifyContent: "center", padding: "25px 0"}} className="main-body">
        <Grid container xs={8}>
          <ReactPlayer url="../../../homeVideo.mp4" width="100%" height="fit-content" controls />
        </Grid>
        <Grid container xs={3} className="course-content">
          <Grid container className="lesson-container">
            <Grid>
              <h2 className="course-content-name">Course Content</h2>
            </Grid>
            <Grid>{fullDuration}</Grid>
          </Grid>
          <Grid container className="lesson-container">
            <Grid container className="lesson-name">
              <Grid className="play-icon-container">
                <i className="far fa-play-circle"></i>
              </Grid>
              <Grid>
                <p>Introduction</p>
              </Grid>
            </Grid>
            <Grid>{lessonDuration}</Grid>
          </Grid>
          <Grid container className="lesson-container">
            <Grid container className="lesson-name">
              <Grid className="play-icon-container">
                <i className="far fa-play-circle"></i>
              </Grid>
              <Grid>
                <p>Main Lesson</p>
              </Grid>
            </Grid>
            <Grid>{lessonDuration}</Grid>
          </Grid>
          <Grid container className="lesson-container">
            <Grid container className="lesson-name">
              <Grid className="play-icon-container">
                <i className="far fa-play-circle"></i>
              </Grid>
              <Grid>
                <p>Conclusion</p>
              </Grid>
            </Grid>
            <Grid>{lessonDuration}</Grid>
          </Grid>
        </Grid>
      </Grid>
      <FooterC />
    </div>
  );
};

export default CourseC;
