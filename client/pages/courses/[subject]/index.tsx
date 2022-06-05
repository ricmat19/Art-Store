/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import ReactPaginate from "react-paginate";
import IndexAPI from "../../../apis/indexAPI";
import MainNav from "../../../components/users/mainNav";
import PagesNav from "../../../components/users/pagesNav";
import FooterC from "../../../components/footer";
import CoursesNav from "../../../components/users/courses/coursesNav";
import { Grid } from "@mui/material";

//Courses props interface
interface ICourse {
  id: string;
  title: string;
  price: string;
  imageBuffer: string;
}
interface ICourses {
  courses: ICourse[];
  cartQty: number | null | undefined;
  subjects: string[];
}

//Courses functional component
const Courses = (props: ICourses) => {
  //Courses states
  const [pageNumber, setPageNumber] = useState<number>(0);

  // Setup pagination and number of items per page
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

  //Map through the list of courses and setup their templates
  let displayCourses;
  if (props.courses) {
    displayCourses = props.courses
      .slice(pagesVisted, pagesVisted + itemsPerPage)
      .map((course: any) => {
        return (
          //Display course page on click
          <Grid
            className="pointer"
            key={course.id}
            //   onClick={() => displayCourse(course.subject, course.id)}
          >
            {/* Display course image */}
            <Grid className="image-container">
              <img
                className="thumbnail"
                src={course.imageBuffer}
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
  // Get all items in the cart
  const cartResponse = await IndexAPI.get(`/cart`);

  const subject = context.params.subject;
  //Get a list of all courses in the selected subject
  const coursesResponse = await IndexAPI.get(`/courses/${subject}`);

  //Create and add course image buffer to all courses in the course subject object
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
