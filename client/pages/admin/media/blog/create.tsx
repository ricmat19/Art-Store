/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import IndexAPI from "../../../../apis/indexAPI";
import FooterC from "../../../../components/footer";
import AdminMainNav from "../../../../components/admin/mainNav";
import AdminPagesNav from "../../../../components/admin/pagesNav";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";

const AdminAddBlogPost = (props: any) => {
  const [loginStatus, setLoginStatus] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<File>();
  const [content, setContent] = useState<string>("");

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

  const createBlogPost = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      if (image) {
        let formData = new FormData();

        formData.append("title", title);
        formData.append("content", content);
        formData.append("images", image);

        await IndexAPI.post("/admin/blog", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      }
      router.push("/admin/media/blog");
    } catch (err) {
      console.log(err);
    }
  };

  let displayedImage;
  if (image !== undefined) {
    displayedImage = (
      <img
        className="banner-image"
        src={URL.createObjectURL(image)}
        alt="banner-image"
      />
    );
  }

  if (loginStatus) {
    return (
      <Grid>
        <AdminMainNav cartQty={props.cartQty} />
        <AdminPagesNav />
        <Grid container className="main-body">
          <Grid>
            <Grid xs={12} sx={{ textAlign: "center" }}>
              {displayedImage}
            </Grid>
            <form>
              <Grid sx={{ display: "grid", gap: "10px", margin: "50px 20vw" }}>
                <Grid className="admin-form-field">
                  <label>Title:</label>
                  <input
                    className="full-width"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    name="title"
                    required
                  />
                </Grid>
                <Grid className="admin-form-field">
                  <label className="admin-label">Image:</label>
                  <input
                    type="file"
                    onChange={(e: any) => setImage(e.target.files[0])}
                    name="images"
                    className="form-control file-input"
                    required
                  />
                </Grid>
                <Grid>
                  <label>Content:</label>
                  <textarea
                    className="full-width"
                    rows={50}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    name="content"
                    required
                  />
                </Grid>
                <Grid sx={{ textAlign: "center" }}>
                  <button type="submit" onClick={createBlogPost}>
                    Submit
                  </button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <FooterC />
        </Grid>
      </Grid>
    );
  } else {
    return <Grid></Grid>;
  }
};

export default AdminAddBlogPost;
