/* eslint-disable @next/next/no-img-element */
import React, { FC, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import IndexAPI from "../../../apis/indexAPI";
// import { ICourse } from "../../../interfaces";
import Footer from "../../../components/footer";
import CoursesNav from "../../../components/admin/courses/coursesNav";
import AdminMainNav from "../../../components/admin/mainNav";
import AdminPagesNav from "../../../components/admin/pagesNav";
import AddCourse from "../../../components/admin/courses/addCourse";
import { Button, Grid } from "@mui/material";
import AdminCoursesNav from "../../../components/admin/courses/coursesNav";

const AdminCoursesC: FC = (props: any) => {
  const [loginStatus, setLoginStatus] = useState<boolean>(true);
  const [courses] = useState(props.courses);
  const [pageNumber, setPageNumber] = useState<number>(0);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const itemsPerPage: number = 9;
  const pagesVisted: number = pageNumber * itemsPerPage;

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

  const displayCourses = courses
    .slice(pagesVisted, pagesVisted + itemsPerPage)
    .map((course: any) => {
      return (
        <Grid className="collection-item-div" key={course.id}>
          <Grid
            className="collection-item"
            // onClick={() => displayCourse(course.subject, course.id)}
          >
            <img
              className="collection-thumbnail"
              src={course.imageBuffer}
              alt="collection-thumbnail"
            />
          </Grid>
          <Grid container>
            <Grid xs={6} sx={{ textAlign: "left" }}>
              {course.title}
            </Grid>
            <Grid xs={6} sx={{ textAlign: "right" }}>
              <button className="delete-button">Delete</button>
            </Grid>
          </Grid>
        </Grid>
      );
    });

  const pageCount = Math.ceil(courses.length / itemsPerPage);

  const changePage = ({ selected }: { selected: number }): void => {
    setPageNumber(selected);
  };

  // let navigation = useNavigate();

  // const displayCourse = async (subject: string, id: string) => {
  //   try {
  //     navigation(`/admin/courses/${subject}/${id}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  if (loginStatus) {
    return (
      <div>
        <AddCourse open={open} handleClose={handleClose} />
        <AdminMainNav />
        <AdminPagesNav />
        <div className="main-body">
          <AdminCoursesNav courses={courses} />
          <Grid sx={{ textAlign: "right", paddingRight: "50px" }}>
            <Button
              onClick={handleOpen}
              sx={{
                fontFamily: "Rajdhani",
                fontSize: "20px",
                color: "white",
                textTransform: "none",
              }}
            >
              <a>add course</a>
            </Button>
          </Grid>
          <CoursesNav />
          <div className="thumbnail-display">{displayCourses}</div>
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
        </div>
        <Footer />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export async function getStaticPaths() {
  const coursesResponse = await IndexAPI.get(`/courses`);

  const courses: string[] = [];
  for (let i = 0; i < coursesResponse.data.data.courses.length; i++) {
    if (!courses.includes(coursesResponse.data.data.courses.subject)) {
      courses.push(coursesResponse.data.data.courses[i].subject);
    }
  }

  return {
    fallback: false,
    paths: courses.map((subject: any) => ({
      params: {
        subject: subject,
      },
    })),
  };
}

export async function getStaticProps(context: { params: { subject: any } }) {
  const subject = context.params.subject;
  const coursesResponse = await IndexAPI.get(`/admin/courses/${subject}`);

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
    },
    revalidate: 1,
  };
}

export default AdminCoursesC;
