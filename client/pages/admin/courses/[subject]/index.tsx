/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import IndexAPI from "../../../../apis/indexAPI";
import AdminMainNav from "../../../../components/admin/mainNav";
import AdminPagesNav from "../../../../components/admin/pagesNav";
import Footer from "../../../../components/footer";
import Head from "next/head";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminCourseSubjectsNav from "../../../../components/admin/courses/coursesNav";
import AdminDeleteCourse from "../../../../components/admin/courses/deleteCourseModal";
import { Button, Grid } from "@mui/material";
import { ICourse } from "../../../../interfaces";

//Admin course subject props interface
interface IAdminCourseSubject {
  courses: ICourse[];
  course: ICourse;
  activeSubjects: string[] | undefined;
}

//Admin course subject functional component
const AdminCourseSubject = (props: IAdminCourseSubject) => {
  //Admin course subject states
  const [loginStatus, setLoginStatus] = useState<boolean>(true);
  const [deleteCourse, setDeleteCourse] = useState<ICourse>();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [deleteOpen, setDeleteOpen] = useState(false);

  //Functions handling the opening and closing of the course delete modal
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  // Next router function
  const router = useRouter();

  // Setup pagination and number of items per page
  const itemsPerPage = 9;
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(props.courses.length / itemsPerPage);
  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  // Set the course selected for deletion and open the course delete modal
  const displayDeleteModal = (id: string) => {
    for (let i = 0; i < props.courses.length; i++) {
      if (props.courses[i].id === id) {
        setDeleteCourse(props.courses[i]);
      }
    }
    handleDeleteOpen();
  };

  //Route to the selected courses page
  const displayCourse = async (subject: string, id: string) => {
    try {
      await router.push(`/admin/courses/${subject}/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  //Map through the list of courses and setup their templates
  const displayCourses = props.courses
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((course: ICourse) => {
      return (
        <Grid key={course.id}>
          {/* Display course page on click */}
          <Grid
            className="pointer"
            onClick={() => displayCourse(course.subject, course.id)}
          >
            {/* Display course image */}
            <Grid className="admin-image-container">
              <img
                className="thumbnail"
                src={course.image_url}
                alt="Thumbnail"
              />
            </Grid>
            {/* Display course title and price */}
            <Grid className="two-column-thumbnail-footer">
              <h3 className="align-center">{course.title}</h3>
              <h3 className="align-center">${course.price}.00</h3>
            </Grid>
          </Grid>
          <Grid>
            <Grid>
              <Grid>
                {/*  Button to select course for deletion and display deletion modal */}
                <button
                  onClick={() => displayDeleteModal(course.id)}
                  className="delete"
                >
                  Delete
                </button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    });

  // Get the current login status and set its state
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

  // Render based on the current login status
  if (loginStatus) {
    return (
      <Grid>
        <Head>
          <title>artHouse86-Admin Courses</title>
        </Head>
        {/* Admin delete course modal component */}
        <AdminDeleteCourse
          deleteCourse={deleteCourse}
          open={deleteOpen}
          handleClose={handleDeleteClose}
        />
        {/* Admin main nav component */}
        <AdminMainNav />
        {/* Admin pages nav component */}
        <AdminPagesNav />
        <Grid className="main-body">
          <Grid>
            {/* Admin course subject navigation menu */}
            <AdminCourseSubjectsNav activeCourses={props.activeSubjects} />
            <Grid className="plus-icon-div">
              {/* Route to course create page */}
              <Button
                onClick={() => router.push("/admin/courses/create")}
                sx={{
                  fontFamily: "Rajdhani",
                  fontSize: "20px",
                  color: "white",
                  textTransform: "none",
                }}
              >
                <FontAwesomeIcon className="plus-icon" icon={faPlus} />
              </Button>
            </Grid>
            {/* Display the list of mapped subject courses */}
            <Grid className="gallery-menu">{displayCourses}</Grid>
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
          <Footer />
        </Grid>
      </Grid>
    );
  } else {
    return <Grid></Grid>;
  }
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
  //Get a list of all courses
  const activeSubjects: string[] = [];
  const coursesResponse = await IndexAPI.get(`/admin/courses`);
  for (let i = 0; i < coursesResponse.data.data.courses.length; i++) {
    if (
      !activeSubjects.includes(coursesResponse.data.data.courses[i].subject)
    ) {
      activeSubjects.push(coursesResponse.data.data.courses[i].subject);
    }
  }

  //Get all courses of a specific subject
  const subject = context.params.subject;
  const subjectResponse = await IndexAPI.get(
    `/admin/courses/subject/${subject}`
  );

  //Provide the selected course subject and subject courses as a props to the course component
  return {
    props: {
      activeSubjects: activeSubjects,
      courses: subjectResponse.data.data.subject,
    },
    revalidate: 1,
  };
}

export default AdminCourseSubject;
