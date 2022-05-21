/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import IndexAPI from "../../../../apis/indexAPI";
import FooterC from "../../../../components/footer";
import AdminMainNav from "../../../../components/admin/mainNav";
import AdminPagesNav from "../../../../components/admin/pagesNav";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface ICreateBlogForm {
  title: string;
  image: string;
  content: string;
  router: any;
}

const initialValues = {
  title: "",
  image: "",
  content: "",
};

const onSubmit = (
  values: ICreateBlogForm,
  onSubmitProps: { resetForm: () => void }
) => {
  if (values.image) {
    let formData = new FormData();

    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("images", values.image);

    IndexAPI.post("/admin/blog", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  values.router.push("/admin/media/blog");
  onSubmitProps.resetForm();
};
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  image: Yup.string().required("Image is required"),
  content: Yup.string().required("Content is required"),
});

const AdminAddBlogPost = () => {
  const [loginStatus, setLoginStatus] = useState<boolean>(true);
  const [image, setImage] = useState<File>();

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
        <AdminMainNav />
        <AdminPagesNav />
        <Grid container className="main-body">
          <Grid>
            <Grid xs={12} sx={{ textAlign: "center" }}>
              {displayedImage}
            </Grid>
            <Formik
              initialValues={{
                initialValues: initialValues,
                router: router,
              }}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
              validateOnChange={false}
              validateOnBlur={false}
              validateOnMount
            >
              <Form>
                <Grid
                  sx={{ display: "grid", gap: "10px", margin: "50px 20vw" }}
                >
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
                  <Grid className="admin-form-field">
                    <label className="admin-label">Image:</label>
                    <Field
                      type="file"
                      onChange={(e: any) => setImage(e.target.files[0])}
                      name="images"
                      className="form-control file-input"
                    />
                    <ErrorMessage name="images" component="div">
                      {(errorMsg) => (
                        <Grid className="errorMsg">{errorMsg}</Grid>
                      )}
                    </ErrorMessage>
                  </Grid>
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
                  <Grid sx={{ textAlign: "center" }}>
                    <button type="submit">Submit</button>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
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
