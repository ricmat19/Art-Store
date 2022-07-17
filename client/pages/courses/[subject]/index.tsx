/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import ReactPaginate from "react-paginate";
import IndexAPI from "../../../apis/indexAPI";
import MainNav from "../../../components/users/mainNav";
import PagesNav from "../../../components/users/pagesNav";
import FooterC from "../../../components/footer";
import CoursesNav from "../../../components/users/courses/coursesNav";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";

//Courses props interface
interface ICourse {
  id: string;
  title: string;
  subject: string;
  price: string;
  image_url: string;
}
interface ICourses {
  courses: ICourse[];
  cartQty: number;
  subjects: string[];
}

//Courses functional component
const Courses = (props: ICourses) => {
  //Courses states
  const [pageNumber, setPageNumber] = useState<number>(0);

  // Setup pagination and number of items per page
  const itemsPerPage = 9;
  const pagesVisited: number = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(props.courses.length / itemsPerPage);
  const changePage = ({ selected }: { selected: number }): void => {
    setPageNumber(selected);
  };

  const router = useRouter();

  const displayCourse = async (subject: string, id: string) => {
    try {
      router.push(`/courses/${subject}/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  //Map through the list of courses and setup their templates
  let displayCourses;
  if (props.courses) {
    displayCourses = props.courses
      .slice(pagesVisited, pagesVisited + itemsPerPage)
      .map((course: ICourse) => {
        return (
          //Display course page on click
          <Grid
            className="pointer"
            key={course.id}
            onClick={() => displayCourse(course.subject, course.id)}
          >
            {/* Display course image */}
            <Grid className="image-container">
              <img
                className="thumbnail"
                src={course.image_url}
                alt="collection-thumbnail"
              />
            </Grid>
            {/* Display course title and price */}
            <Grid className="two-column-thumbnail-footer">
              <Grid>{course.title}</Grid>
              <Grid className="price">${course.price}.00</Grid>
            </Grid>
          </Grid>
        );
      });
  }

  // Courses component
  return (
    <Grid>
      {/* Main navigation component */}
      <MainNav cartQty={props.cartQty} />
      {/* Pages navigation component */}
      <PagesNav />
      <Grid className="main-body">
        <Grid>
          {/* Display the courses navigation menu */}
          <CoursesNav courses={props.subjects} />
          {/* Display all courses */}
          <Grid className="gallery-menu">{displayCourses}</Grid>
        </Grid>
        {/* Pagination component */}
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
      {/* Footer component */}
      <FooterC />
    </Grid>
  );
};

// Create a path for the list of course subjects
export function getStaticPaths() {
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
  const subject = context.params.subject;
  // Get all items in the cart
  const cartResponse = await IndexAPI.get(`/cart`);

  //Get a list of all courses in the selected subject
  const coursesResponse = await IndexAPI.get(`/courses/${subject}`);

  //Provide the course subjects, courses list and cart quantity as props to the courses component
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
