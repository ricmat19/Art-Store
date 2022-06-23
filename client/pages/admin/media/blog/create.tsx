/* eslint-disable @next/next/no-img-element */
import { SetStateAction, useEffect, useState } from "react";
import IndexAPI from "../../../../apis/indexAPI";
import FooterC from "../../../../components/footer";
import AdminMainNav from "../../../../components/admin/mainNav";
import AdminPagesNav from "../../../../components/admin/pagesNav";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

//Admin create blog post prop interface
interface ICreateBlogForm {
  image: string | Blob;
  title: string | Blob;
  content: string | Blob;
  router: string[];
}

//Admin create blog post Formik form initial values
const initialValues = {
  title: "",
  image: "",
  content: "",
};

//Admin create blog post Formik form onSubmit function
const onSubmit = (
  values: ICreateBlogForm,
  onSubmitProps: { resetForm: () => void }
) => {
  //Check if an image is provided before creating blog post
  if (values.image) {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("images", values.image);

    //Create blog post and then route to admin blog index page
    IndexAPI.post("/admin/blog", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  values.router.push("/admin/media/blog");
  onSubmitProps.resetForm();
};

//Admin create blog post Formik form validation schema
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  image: Yup.string().required("Image is required"),
  content: Yup.string().required("Content is required"),
});

//Admin create blog post functional component
const AdminAddBlogPost = () => {
  //Admin create blog post states
  const [loginStatus, setLoginStatus] = useState<boolean>(true);
  const [image, setImage] = useState<File>();

  useEffect(() => {
    const fetchData = () => {
      try {
        //Get and set login status on render
        const loginResponse = IndexAPI.get(`/login`);
        setLoginStatus(loginResponse.data.data.loggedIn);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  //Create blog post image element
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

  // Render component based on login status
  if (loginStatus) {
    return (
      <Grid>
        {/* Admin main navigation component */}
        <AdminMainNav />
        {/* Admin pages navigation component */}
        <AdminPagesNav />
        <Grid container className="main-body">
          <Grid>
            {/* Display blog post image */}
            <Grid xs={12} sx={{ textAlign: "center" }}>
              {displayedImage}
            </Grid>
            <Formik
              initialValues={{
                initialValues: initialValues,
                // router: router,
              }}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
              validateOnChange={false}
              validateOnBlur={false}
              validateOnMount
            >
              {/* Admin create blog post form */}
              <Form>
                <Grid
                  sx={{ display: "grid", gap: "10px", margin: "50px 20vw" }}
                >
                  {/* Admin blog post title input field */}
                  <Grid className="admin-form-field">
                    <label>Title:</label>
                    <Field
                      as="input"
                      className="full-width"
                      type="text"
                      name="title"
                    />
                    <ErrorMessage name="title" component="div">
                      {(errorMsg) => (
                        <Grid className="errorMsg">{errorMsg}</Grid>
                      )}
                    </ErrorMessage>
                  </Grid>
                  {/* Admin blog post image file input field */}
                  <Grid className="admin-form-field">
                    <label className="admin-label">Image:</label>
                    <Field
                      type="file"
                      onChange={(e: { target: { files: SetStateAction<File | undefined>[]; }; }) => setImage(e.target.files[0])}
                      name="images"
                      className="form-control file-input"
                    />
                    <ErrorMessage name="images" component="div">
                      {(errorMsg) => (
                        <Grid className="errorMsg">{errorMsg}</Grid>
                      )}
                    </ErrorMessage>
                  </Grid>
                  {/* Admin blog post content input field */}
                  <Grid>
                    <label>Content:</label>
                    <Field
                      as="textarea"
                      className="full-width"
                      rows={50}
                      name="content"
                    />
                    <ErrorMessage name="content" component="div">
                      {(errorMsg) => (
                        <Grid className="errorMsg">{errorMsg}</Grid>
                      )}
                    </ErrorMessage>
                  </Grid>
                  {/* Submit button to create blog post */}
                  <Grid sx={{ textAlign: "center" }}>
                    <button type="submit">Submit</button>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Grid>
          {/* Footer component */}
          <FooterC />
        </Grid>
      </Grid>
    );
  } else {
    return <Grid></Grid>;
  }
};

export default AdminAddBlogPost;
