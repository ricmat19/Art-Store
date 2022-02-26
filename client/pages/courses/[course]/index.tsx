/* eslint-disable @next/next/no-img-element */
import { FC, useEffect, useState } from "react";
// import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import IndexAPI from "../../../apis/indexAPI";
// import { ICourse } from "../../../interfaces";
import MainNav from "../../../components/users/mainNav";
import PagesNav from "../../../components/users/pagesNav";
import FooterC from "../../../components/footer";
import CoursesNav from "../../../components/users/courses/coursesNav";
import { Grid } from "@mui/material";

const Courses: FC = (props: any) => {
  // const { course } = useRouter();
  const [courses] = useState([]);
  const [pageNumber, setPageNumber] = useState<number>(0);

  //   let courseResponse;
  useEffect((): void => {
    const fetchData = async () => {
      try {
        // courseResponse = await IndexAPI.get(`/courses/${subject}`);
        // for (let i = 0; i < courseResponse.data.data.courses.length; i++) {
        //   if (courseResponse.data.data.courses[i].imagekey !== null) {
        //     let imagesResponse = await IndexAPI.get(
        //       `/images/${courseResponse.data.data.courses[i].imagekey}`,
        //       {
        //         responseType: "arraybuffer",
        //       }
        //     ).then((response) =>
        //       Buffer.from(response.data, "binary").toString("base64")
        //     );
        //     courseResponse.data.data.courses[
        //       i
        //     ].imageBuffer = `data:image/png;base64,${imagesResponse}`;
        //   }
        // }
        // setCourses(courseResponse.data.data.courses);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const itemsPerPage: number = 9;
  const pagesVisted: number = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(courses.length / itemsPerPage);

  const changePage = ({ selected }: { selected: number }): void => {
    setPageNumber(selected);
  };

  const displayCourses = courses
    .slice(pagesVisted, pagesVisted + itemsPerPage)
    .map((course) => {
      return (
        <Grid
          className="collection-item-div"
          key={course.id}
          //   onClick={() => displayCourse(course.subject, course.id)}
        >
          <Grid className="collection-item">
            <img
              className="collection-thumbnail"
              src={course.imageBuffer}
              alt="collection-thumbnail"
            />
          </Grid>
          <Grid className="collection-thumbnail-footer">
            <Grid>{course.title}</Grid>
            <Grid className="price">${course.price}.00</Grid>
          </Grid>
        </Grid>
      );
    });

  //   let navigation = useNavigate();

  //   const displayCourse = async (subject: string, id: string) => {
  //     try {
  //       navigation(`/courses/${subject}/${id}`);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  return (
    <Grid>
      <MainNav cartQty={props.cartQty} />
      <PagesNav coursesAmount={courses.length} />
      <Grid className="main-body">
        <CoursesNav courses={courses} />
        <Grid className="thumbnail-display">{displayCourses}</Grid>
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
  const coursesResponse = await IndexAPI.get(`/courses`);

  const courseType: string[] = [];
  for (let i = 0; i < coursesResponse.data.data.courses.length; i++) {
    if (!courseType.includes(coursesResponse.data.data.courses.subject)) {
      courseType.push(coursesResponse.data.data.courses[i].subject);
    }
  }

  return {
    fallback: false,
    paths: courseType.map((course: any) => ({
      params: {
        course: course,
      },
    })),
  };
}

export async function getStaticProps(context: { params: { course: any } }) {
  const cartResponse = await IndexAPI.get(`/cart`);

  const course = context.params.course;
  const coursesResponse = await IndexAPI.get(`/courses/${course}`);

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
      courses: coursesResponse.data.data.courses,
      cartQty: cartResponse.data.data.cart.length,
    },
    revalidate: 1,
  };
}

export default Courses;
