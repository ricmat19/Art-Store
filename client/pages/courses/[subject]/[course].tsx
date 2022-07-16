import React, { FC, useState } from "react";
import ReactPlayer from "react-player";
import IndexAPI from "../../../apis/indexAPI";
import MainNav from "../../../components/users/mainNav";
import PagesNav from "../../../components/users/pagesNav";
import FooterC from "../../../components/footer";
import { Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

//Course prop interface
interface ICourse {
  cartQty: number;
}

//Course functional component
const Course = (props: ICourse) => {
  //Course states
  const [fullDuration] = useState<string>("");
  const [lessonDuration] = useState<string>("");

  // Course component
  return (
    <Grid>
      {/* Main navigation component */}
      <MainNav cartQty={props.cartQty} />
      {/* Pages navigation component */}
      <PagesNav />
      <Grid
        container
        sx={{ gap: "25px", justifyContent: "center", padding: "25px 0" }}
        className="main-body"
      >
        <Grid container xs={12} className="course-container">
          <Grid container xs={8}>
            {/* Video component */}
            <ReactPlayer
              url="../../../homeVideo.mp4"
              width="100%"
              height="fit-content"
              controls
            />
          </Grid>
          <Grid container xs={3} className="course-content">
            <Grid container className="lesson-container">
              <Grid>
                <h2 className="course-content-name">Course Content</h2>
              </Grid>
              {/* ? */}
              <Grid>{fullDuration}</Grid>
            </Grid>
            <Grid container className="lesson-container">
              <Grid container className="lesson-name">
                <Grid className="play-icon-container">
                  <FontAwesomeIcon icon={faPlayCircle} />
                </Grid>
                <Grid>
                  <p>Introduction</p>
                </Grid>
              </Grid>
              {/* ? */}
              <Grid>{lessonDuration}</Grid>
            </Grid>
            <Grid container className="lesson-container">
              <Grid container className="lesson-name">
                <Grid className="play-icon-container">
                  <FontAwesomeIcon icon={faPlayCircle} />
                </Grid>
                <Grid>
                  <p>Main Lesson</p>
                </Grid>
              </Grid>
              {/* ? */}
              <Grid>{lessonDuration}</Grid>
            </Grid>
            <Grid container className="lesson-container">
              <Grid container className="lesson-name">
                <Grid className="play-icon-container">
                  <FontAwesomeIcon icon={faPlayCircle} />
                </Grid>
                <Grid>
                  <p>Conclusion</p>
                </Grid>
              </Grid>
              {/* ? */}
              <Grid>{lessonDuration}</Grid>
            </Grid>
          </Grid>
        </Grid>
        <FooterC />
      </Grid>
    </Grid>
  );
};

// Create a path for the list of courses
export async function getStaticPaths() {
  const coursesResponse = await IndexAPI.get(`/courses`);
  return {
    fallback: false,
    paths: coursesResponse.data.data.courses.map(
      (courses: { subject: string; id: string }) => ({
        params: {
          course: courses.subject,
          id: courses.id,
        },
      })
    ),
  };
}

export async function getStaticProps(context: {
  params: { course: string; id: string };
}) {
  const course = context.params.course;
  const id = context.params.id;

  // Get cart content
  const cartResponse = await IndexAPI.get(`/cart`);

  // Get the selected course's content
  const courseResponse = await IndexAPI.get(`/courses/${course}/${id}`);

  //Provide the course's and cart's information as props to the course component
  return {
    props: {
      selectedProduct: courseResponse.data.data.course,
      cart: cartResponse.data.data.cart,
      cartQty: cartResponse.data.data.cart.length,
    },
    revalidate: 1,
  };
}

export default Course;
