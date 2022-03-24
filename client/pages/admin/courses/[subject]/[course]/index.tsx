/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import IndexAPI from "../../../../../apis/indexAPI";
import AdminMainNav from "../../../../../components/admin/mainNav";
import AdminPagesNav from "../../../../../components/admin/pagesNav";
import Footer from "../../../../../components/footer";
import Head from "next/head";
import { Grid, Select, MenuItem } from "@mui/material";
import { useRouter } from "next/router";

const AdminCourse = (props: any) => {
  const [loginStatus, setLoginStatus] = useState<boolean>(true);

  const [title, setTitle] = useState<string>(props.selectedCourse[0].title);
  // const [image] = useState<File>();
  const [subject, setSubject] = useState<string>(
    props.selectedCourse[0].subject
  );
  const [price, setPrice] = useState<string>(props.selectedCourse[0].price);
  const [description, setDescription] = useState<string>(
    props.selectedCourse[0].description
  );

  const router = useRouter();

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

  const updateCourse = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      // if (image) {
      //   let formData = new FormData();
      //   console.log(formData)
      // formData.append("title", title);
      // formData.append("subject", subject);
      // formData.append("images", image);
      // formData.append("description", description);
      // formData.append("price", price);

      // await IndexAPI.put("/admin/courses", formData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // })
      //   .then((res) => {
      //     console.log(res);
      //     router.push("/admin/courses/create/curriculum");
      //   })
      //   .catch((err) => console.log(err));
      // }else{
      await IndexAPI.put(`/admin/courses/${props.selectedCourse[0].id}`, {
        title,
        subject,
        description,
        price,
      });
      router.push(
        {
          pathname: `/admin/courses/[subject]/[course]/curriculum`,
          query: {
            subject: props.selectedCourse[0].subject,
            course: props.selectedCourse[0].id,
          },
        },
        `/admin/courses/${props.selectedCourse[0].subject}/${props.selectedCourse[0].id}/curriculum`
      );
      // }
    } catch (err) {
      console.log(err);
    }
  };

  let displayedImage;
  // if (image !== undefined) {
  //   displayedImage = (
  //     <img
  //       className="big-image"
  //       src={URL.createObjectURL(image)}
  //       alt="big image"
  //     />
  //   );
  // } else {
  displayedImage = (
    <img
      className="big-image"
      src={props.selectedCourse[0].imageBuffer}
      alt="big image"
    />
  );
  // }

  const handleChange = (event: any) => {
    setSubject(event.target.value);
  };

  if (loginStatus) {
    return (
      <Grid>
        <Head>
          <title>artHouse19-Admin Create Course</title>
        </Head>
        <AdminMainNav />
        <AdminPagesNav />
        <Grid>
          <Grid
            container
            sx={{
              flexDirection: "row",
              flexWrap: "nowrap",
              alignItems: "center",
              color: "#000",
              justifyContent: "flex-end",
              backgroundColor: "#000",
              padding: "30px",
            }}
          >
            <Grid sx={{ padding: "0 30px 0 0", width: "50%" }}>
              <Grid className="image">
                <Grid className="big-image-div">{displayedImage}</Grid>
              </Grid>
            </Grid>
            <Grid
              sx={{
                width: "50%",
                padding: "0 0 0 30px",
                borderLeft: "1px #fff solid",
                height: "100%",
              }}
            >
              <form className="admin-form">
                <Grid>
                  <Grid className="admin-form-field">
                    <label className="admin-label">Title:</label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      type="text"
                      name="name"
                      className="form-control"
                      required
                    />
                  </Grid>
                  {/* <Grid className="admin-form-field">
                    <label className="admin-label">Image:</label>
                    <input
                      type="file"
                      onChange={(e: any) => setImage(e.target.files[0])}
                      name="image"
                      className="form-control file-input"
                      required
                    />
                  </Grid> */}
                  <Grid className="admin-form-field">
                    <Grid>
                      <label className="admin-label">Subject:</label>
                    </Grid>
                    <Grid>
                      <Select
                        value={subject}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="type-selector"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"drawing"}>drawing</MenuItem>
                        <MenuItem value={"painting"}>painting</MenuItem>
                        <MenuItem value={"modeling"}>modeling</MenuItem>
                        <MenuItem value={"sculpting"}>sculpting</MenuItem>
                        <MenuItem value={"writing"}>writing</MenuItem>
                      </Select>
                    </Grid>
                  </Grid>
                  <Grid className="admin-form-field">
                    <label className="admin-label">Price:</label>
                    <input
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      type="number"
                      name="price"
                      className="form-control"
                      required
                    />
                  </Grid>
                  <Grid className="admin-form-field">
                    <label className="admin-label">Description:</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={12}
                      required
                    />
                  </Grid>
                  <Grid className="admin-form-button">
                    <Grid className="text-center">
                      <Grid>
                        <button
                          onClick={updateCourse}
                          type="submit"
                          className="btn form-button"
                        >
                          Update Course
                        </button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Grid>
        <Footer />
      </Grid>
    );
  } else {
    return <Grid></Grid>;
  }
};

export async function getStaticPaths() {
  const coursesResponse = await IndexAPI.get(`/admin/courses`);
  return {
    fallback: false,
    paths: coursesResponse.data.data.courses.map((course: any) => ({
      params: {
        subject: course.subject,
        course: course.id,
      },
    })),
  };
}

export async function getStaticProps(context: {
  params: { subject: any; course: any };
}) {
  const course = context.params.course;
  const courseResponse = await IndexAPI.get(
    `/admin/courses/course/${course}`
  );

  for (let i = 0; i < courseResponse.data.data.course.length; i++) {
    if (courseResponse.data.data.course[i].imagekey !== null) {
      let imagesResponse = await IndexAPI.get(
        `/images/${courseResponse.data.data.course[i].imagekey}`,
        {
          responseType: "arraybuffer",
        }
      ).then((response) =>
        Buffer.from(response.data, "binary").toString("base64")
      );

      courseResponse.data.data.course[
        i
      ].imageBuffer = `data:image/png;base64,${imagesResponse}`;
    }
  }

  return {
    props: {
      selectedCourse: courseResponse.data.data.course,
    },
    revalidate: 1,
  };
}

export default AdminCourse;
