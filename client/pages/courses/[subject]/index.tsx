/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import ReactPaginate from "react-paginate";
import IndexAPI from "../../../apis/indexAPI";
import MainNav from "../../../components/users/mainNav";
import PagesNav from "../../../components/users/pagesNav";
import FooterC from "../../../components/footer";
import CoursesNav from "../../../components/users/courses/coursesNav";
import { Grid } from "@mui/material";

const Courses = (props: any) => {
  const [pageNumber, setPageNumber] = useState<number>(0);

  const itemsPerPage: number = 9;
  const pagesVisted: number = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(props.courses.length / itemsPerPage);

  const changePage = ({ selected }: { selected: number }): void => {
    setPageNumber(selected);
  };

  //   let navigation = useNavigate();

  //   const displayCourse = async (subject: string, id: string) => {
  //     try {
  //       navigation(`/courses/${subject}/${id}`);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  let displayCourses;
  if (props.courses) {
    displayCourses = props.courses
      .slice(pagesVisted, pagesVisted + itemsPerPage)
      .map((course: any) => {
        return (
          <Grid
            className="pointer"
            key={course.id}
            //   onClick={() => displayCourse(course.subject, course.id)}
          >
            <Grid className="image-container">
              <img
                className="thumbnail"
                src={course.imageBuffer}
                alt="collection-thumbnail"
              />
            </Grid>
            <Grid className="two-column-thumbnail-footer">
              <Grid>{course.title}</Grid>
              <Grid className="price">${course.price}.00</Grid>
            </Grid>
          </Grid>
        );
      });
  }

  return (
    <Grid>
      <MainNav cartQty={props.cartQty} />
      <PagesNav />
      <Grid className="main-body">
        <Grid>
          <CoursesNav courses={props.subjects} />
          <Grid className="gallery-menu">{displayCourses}</Grid>
        </Grid>
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationButtons"}
          previousLinkClassName={"prevButton"}
          nextLinkClassName={"nextButton"}
          disabledClassName={"disabledButton"}
          activeClassName={"activeButton"}
          pageRangeDisplayed={5}
          marginPagesDisplayed={5}
        />
      </Grid>
      <FooterC />
    </Grid>
  );
};

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          subject: "drawing",
        },
      },
      {
        params: {
          subject: "painting",
        },
      },
      {
        params: {
          subject: "modeling",
        },
      },
      {
        params: {
          subject: "sculpting",
        },
      },
      {
        params: {
          subject: "writing",
        },
      },
    ],
  };
}

export async function getStaticProps(context: { params: { subject: string } }) {
  const cartResponse = await IndexAPI.get(`/cart`);

  const subject = context.params.subject;
  const coursesResponse = await IndexAPI.get(`/courses/${subject}`);

  for (let i = 0; i < coursesResponse.data.data.courses.length; i++) {
    if (coursesResponse.data.data.courses[i].imagekey !== null) {
      let imagesResponse = await IndexAPI.get(
        `/images/${coursesResponse.data.data.courses[i].imagekey}`,
        {
          responseType: "arraybuffer",
        }
      ).then((response) =>
        Buffer.from(response.data, "binary").toString("base64")
      );

      coursesResponse.data.data.courses[
        i
      ].imageBuffer = `data:image/png;base64,${imagesResponse}`;
    }
  }
  return {
    props: {
      subjects: ["drawing", "painting", "modeling", "sculpting", "writing"],
      courses: coursesResponse.data.data.courses,
      cartQty: cartResponse.data.data.cart.length,
    },
    revalidate: 1,
  };
}

export default Courses;
