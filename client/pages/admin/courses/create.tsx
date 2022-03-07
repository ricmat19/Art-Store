/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import IndexAPI from "../../../apis/indexAPI";
import AdminMainNav from "../../../components/admin/mainNav";
import AdminPagesNav from "../../../components/admin/pagesNav";
import Footer from "../../../components/footer";
import Head from "next/head";
import { Grid, Select, MenuItem } from "@mui/material";

const AdminCreateCourse = () => {
  const [loginStatus, setLoginStatus] = useState<boolean>(true);
  const [image, setImage] = useState<File>();
  const [subject, setSubject] = useState<string>("");
  const [content] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [info, setInfo] = useState<string>("");

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

  const createCourse = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      if (image) {
        let formData = new FormData();

        formData.append("title", title);
        formData.append("subject", subject);
        formData.append("image", image);
        formData.append("content", content);
        formData.append("info", info);
        formData.append("price", price);

        await IndexAPI.post("/admin/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      }
    } catch (err) {
      console.log(err);
    }
  };

  let displayedImage;
  if (image !== undefined) {
    displayedImage = (
      <img
        className="big-image"
        src={URL.createObjectURL(image)}
        alt="big image"
      />
    );
  }

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
        <Grid className="main-body">
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
              <form
                className="admin-form"
                action="/admin/courses"
                method="POST"
                encType="multipart/form-data"
              >
                <Grid className="admin-form-title">
                  <h1 className="align-center">Create</h1>
                </Grid>
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
                <Grid className="admin-form-field">
                  <Grid>
                    <label className="admin-label">Type:</label>
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
                  <label className="admin-label">Image:</label>
                  <input
                    type="file"
                    onChange={(e: any) => setImage(e.target.files[0])}
                    name="image"
                    className="form-control file-input"
                    required
                  />
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
                  <label className="admin-label">Info:</label>
                  <textarea
                    value={info}
                    onChange={(e) => setInfo(e.target.value)}
                    name="message"
                    rows={5}
                    required
                  ></textarea>
                </Grid>
                <Grid className="admin-form-button">
                  <Grid className="text-center">
                    <Grid>
                      <button
                        onClick={createCourse}
                        type="submit"
                        className="btn form-button"
                      >
                        Submit
                      </button>
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

export default AdminCreateCourse;
