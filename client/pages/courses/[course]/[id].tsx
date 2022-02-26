import React, { FC, useState } from "react";
import ReactPlayer from "react-player";
import IndexAPI from "../../../apis/indexAPI";
import MainNav from "../../../components/users/mainNav";
import PagesNav from "../../../components/users/pagesNav";
import FooterC from "../../../components/footer";
import { Grid } from "@mui/material";

const CourseC: FC = (props: any) => {
  const [fullDuration] = useState<string>("");
  const [lessonDuration] = useState<string>("");

  return (
    <div>
      <MainNav cartQty={props.cartQty} />
      <PagesNav />
      <Grid
        container
        sx={{ gap: "25px", justifyContent: "center", padding: "25px 0" }}
        className="main-body"
      >
        <Grid container xs={8}>
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

export async function getStaticPaths() {
  const coursesResponse = await IndexAPI.get(`/courses`);

  return {
    fallback: false,
    paths: coursesResponse.data.data.courses.map((courses: any) => ({
      params: {
        courses: courses.course,
        id: courses.id,
      },
    })),
  };
}

export async function getStaticProps(context: {
  params: { course: any; id: any };
}) {
  const cartResponse = await IndexAPI.get(`/cart`);
  
  const course = context.params.course;
  const id = context.params.id;
  const courseResponse = await IndexAPI.get(`/products/${course}/${id}`);

  let imageBuffer = "";
  if (courseResponse.data.data.item.imagekey !== null) {
    let imagesResponse = await IndexAPI.get(
      `/images/${courseResponse.data.data.item.imagekey}`,
      {
        responseType: "arraybuffer",
      }
    ).then((response) =>
      Buffer.from(response.data, "binary").toString("base64")
    );

    imageBuffer = `data:image/png;base64,${imagesResponse}`;
  }

  return {
    props: {
      imageBuffer: imageBuffer,
      selectedProduct: courseResponse.data.data.course,
      cart: cartResponse.data.data.cart,
      cartQty: cartResponse.data.data.cart.length,
    },
    revalidate: 1,
  };
}

export default CourseC;
