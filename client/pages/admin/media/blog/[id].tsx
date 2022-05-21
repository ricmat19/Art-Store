/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import IndexAPI from "../../../../apis/indexAPI";
import FooterC from "../../../../components/footer";
import AdminMainNav from "../../../../components/admin/mainNav";
import AdminPagesNav from "../../../../components/admin/pagesNav";
import { Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface ISelectedBlogContent {
  id: string;
}

interface ICreateBlogForm {
  title: string;
  content: string;
  selectedBlog: ISelectedBlogContent[];
  router: any;
}

const initialValues = {
  title: "",
  content: "",
};
const onSubmit = (values: ICreateBlogForm, onSubmitProps: any) => {
  IndexAPI.put(`/admin/blog/${values.selectedBlog[0].id}`, {
    title: values.title,
    content: values.content,
  });
  values.router.push("/admin/media/blog");
  onSubmitProps.resetForm();
};
const validationSchema = Yup.object({
  title: Yup.string().required("Email is required"),
  content: Yup.string().required("Email is required"),
});

const AdminBlogPost = (props: any) => {
  const [loginStatus, setLoginStatus] = useState<boolean>(true);

  const router = useRouter();

  const postMonth = new Date(props.selectedBlog[0].post_date).getMonth() + 1;
  const postDate = new Date(props.selectedBlog[0].post_date).getDate();
  const postYear = new Date(props.selectedBlog[0].post_date).getFullYear();

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
        <AdminMainNav />
        <AdminPagesNav />
        <Grid container className="main-body">
          <Grid>
            <Grid xs={12} sx={{ textAlign: "center" }}>
              <img
                className="banner-image"
                src={props.selectedBlog[0].imageBuffer}
                alt="banner-image"
              />
            </Grid>
            <Formik
              initialValues={{
                initialValues: initialValues,
                router: router,
                title: props.selectedBlog[0].title,
                content: props.selectedBlog[0].content,
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
                  <Grid>
                    <h3>
                      {postMonth} - {postDate} - {postYear}
                    </h3>
                  </Grid>
                  <Grid>
                    <label>Title:</label>
                    <Grid sx={{ display: "grid" }}>
                      <Field as="input" className="full-width" name="title" />
                      <ErrorMessage name="title" component="div">
                        {(errorMsg) => (
                          <Grid className="errorMsg">{errorMsg}</Grid>
                        )}
                      </ErrorMessage>
                    </Grid>
                  </Grid>
                  <Grid>
                    <label>Content:</label>
                    <Grid sx={{ display: "grid" }}>
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

export async function getStaticPaths() {
  const blogResponse = await IndexAPI.get(`/admin/blog`);

  return {
    fallback: false,
    paths: blogResponse.data.data.blog.map((blog: any) => ({
      params: {
        id: blog.id,
      },
    })),
  };
}

export async function getStaticProps(context: { params: { id: string } }) {
  const id = context.params.id;
  const blogPostResponse = await IndexAPI.get(`/admin/blog/${id}`);

  for (let i = 0; i < blogPostResponse.data.data.post.length; i++) {
    if (blogPostResponse.data.data.post[i].imagekey !== null) {
      let imagesResponse = await IndexAPI.get(
        `/images/${blogPostResponse.data.data.post[i].imagekey}`,
        {
          responseType: "arraybuffer",
        }
      ).then((response) =>
        Buffer.from(response.data, "binary").toString("base64")
      );

      blogPostResponse.data.data.post[
        i
      ].imageBuffer = `data:image/png;base64,${imagesResponse}`;
    }
  }

  return {
    props: {
      selectedBlog: blogPostResponse.data.data.post,
    },
    revalidate: 1,
  };
}

export default AdminBlogPost;
