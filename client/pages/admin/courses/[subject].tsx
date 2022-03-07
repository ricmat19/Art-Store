/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import IndexAPI from "../../../apis/indexAPI";
import AdminMainNav from "../../../components/admin/mainNav";
import AdminPagesNav from "../../../components/admin/pagesNav";
import Footer from "../../../components/footer";
import Head from "next/head";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminCoursesNav from "../../../components/admin/courses/coursesNav";
import AdminDeleteCourse from "../../../components/admin/courses/deleteCourse";
import { Button, Grid } from "@mui/material";
import Link from "next/link";

const AdminCourses = (props: any) => {
  const [loginStatus, setLoginStatus] = useState<boolean>(true);
  const [courses] = useState(props.courses);
  const [activeCourses] = useState(props.activeCourses);
  const [deleteCourse, setDeleteCourse] = useState<any>();
  const [pageNumber, setPageNumber] = useState<number>(0);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  const itemsPerPage = 9;
  const pagesVisted = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(courses.length / itemsPerPage);
  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  const displayDeleteModal = (id: any) => {
    for (let i = 0; i < courses.length; i++) {
      if (courses[i].id === id) {
        setDeleteCourse(courses[i]);
      }
    }
    handleDeleteOpen();
  };

  const displayCourses = courses
    .slice(pagesVisted, pagesVisted + itemsPerPage)
    .map((course: any) => {
      return (
        <Grid key={course.id}>
          <Grid className="pointer">
            <Grid className="products-item">
              <img
                className="products-thumbnail"
                src={course.imageBuffer}
                alt="Thumbnail"
              />
            </Grid>
            <Grid className="products-thumbnail-footer">
              <h3 className="align-center">{course.title}</h3>
              <h3 className="align-center">${course.price}.00</h3>
            </Grid>
          </Grid>
          <Grid>
            <Grid className="admin-products-button-div">
              <Grid>
                <button
                  onClick={() => displayDeleteModal(course.id)}
                  className="delete"
                >
                  Delete
                </button>
              </Grid>
              <Grid>
                <button type="submit">Update</button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    });

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

  if (loginStatus) {
    return (
      <Grid>
        <Head>
          <title>artHouse19-Admin Courses</title>
        </Head>
        <AdminDeleteCourse
          deleteProduct={deleteCourse}
          open={deleteOpen}
          handleClose={handleDeleteClose}
        />
        <AdminMainNav />
        <AdminPagesNav />
        <Grid className="main-body">
          <AdminCoursesNav activeSubjects={activeCourses} />
          <Grid className="plus-icon-div">
            <Link passHref href="/admin/courses/create">
              <Button
                sx={{
                  fontFamily: "Rajdhani",
                  fontSize: "20px",
                  color: "white",
                  textTransform: "none",
                }}
              >
                <FontAwesomeIcon className="plus-icon" icon={faPlus} />
              </Button>
            </Link>
          </Grid>
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
        <Footer />
      </Grid>
    );
  } else {
    return <Grid></Grid>;
  }
};

export async function getStaticPaths() {
  const subjectsResponse = await IndexAPI.get(`/admin/subjects`);

  const subjects: string[] = [];
  for (let i = 0; i < subjectsResponse.data.data.subjects.length; i++) {
    if (!subjects.includes(subjectsResponse.data.data.subjects.subject)) {
      subjects.push(subjectsResponse.data.data.subjects[i].subject);
    }
  }

  return {
    fallback: false,
    paths: subjects.map((subject: any) => ({
      params: {
        subject: subject,
      },
    })),
  };
}

export async function getStaticProps(context: { params: { subject: any } }) {
  const activeSubjects: string[] = [];
  const coursesResponse = await IndexAPI.get(`/admin/courses`);
  for (let i = 0; i < coursesResponse.data.data.courses.length; i++) {
    if (!activeSubjects.includes(coursesResponse.data.data.courses.subject)) {
      activeSubjects.push(coursesResponse.data.data.courses.subject);
    }
  }

  const subject = context.params.subject;
  const subjectResponse = await IndexAPI.get(`/admin/courses/${subject}`);

  for (let i = 0; i < subjectResponse.data.data.subject.length; i++) {
    if (subjectResponse.data.data.subject[i].imagekey !== null) {
      let imagesResponse = await IndexAPI.get(
        `/images/${subjectResponse.data.data.subject[i].imagekey}`,
        {
          responseType: "arraybuffer",
        }
      ).then((response) =>
        Buffer.from(response.data, "binary").toString("base64")
      );

      subjectResponse.data.data.subject[
        i
      ].imageBuffer = `data:image/png;base64,${imagesResponse}`;
    }
  }

  return {
    props: {
      activeSubjects: activeSubjects,
      courses: subjectResponse.data.data.subject,
    },
    revalidate: 1,
  };
}

export default AdminCourses;
