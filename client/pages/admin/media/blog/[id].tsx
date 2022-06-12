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

//Admin blog post prop interface
interface ISelectedBlog {
  title: string;
  content: string;
  post_date: string;
  imageBuffer: string;
}
interface IAdminBlogPost {
  selectedBlog: ISelectedBlog[];
}
interface ISelectedBlogContent {
  id: string;
}
interface ICreateBlogForm {
  selectedBlog: { id: any }[];
  title: any;
  content: any;
  router: string[];
}

//Admin blog post Formik form initial values
const initialValues = {
  title: "",
  content: "",
};

//Admin blog post Formik form onSubmit function
const onSubmit = (values: any, onSubmitProps: { resetForm: () => void }) => {
  //Update the selected blog post on submit
  IndexAPI.put(`/admin/blog/${values.selectedBlog[0].id}`, {
    title: values.title,
    content: values.content,
  });
  //Route to blog index page on submit
  values.router.push("/admin/media/blog");
  onSubmitProps.resetForm();
};

//Admin blog post Formik form validation schema
const validationSchema = Yup.object({
  title: Yup.string().required("Email is required"),
  content: Yup.string().required("Email is required"),
});

//Admin blog post functional component
const AdminBlogPost = (props: IAdminBlogPost) => {
  //Admin blog post category states
  const [loginStatus, setLoginStatus] = useState<boolean>(true);

  //Next router function
  const router = useRouter();

  //Get the blog posts creation date
  const postMonth = new Date(props.selectedBlog[0].post_date).getMonth() + 1;
  const postDate = new Date(props.selectedBlog[0].post_date).getDate();
  const postYear = new Date(props.selectedBlog[0].post_date).getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Get and set login status on render
        const loginResponse = await IndexAPI.get(`/login`);
        setLoginStatus(loginResponse.data.data.loggedIn);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  //Display component depending on login status
  if (loginStatus) {
    return (
      <Grid>
        <AdminMainNav />
        <AdminPagesNav />
        <Grid container className="main-body">
          <Grid>
            <Grid xs={12} sx={{ textAlign: "center" }}>
              {/* Display blog post banner image */}
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
              {/* Admin blog post form */}
              <Form>
                <Grid
                  sx={{ display: "grid", gap: "10px", margin: "50px 20vw" }}
                >
                  {/* Display the blogs posts creation date */}
                  <Grid>
                    <h3>
                      {postMonth} - {postDate} - {postYear}
                    </h3>
                  </Grid>
                  {/* Blog post title input field */}
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
                  {/* Blog post content textbox field */}
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
                  {/* Admin blog post update submit button */}
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

// Get all blog posts and create routes for them
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
  // Get the content for the selected blog post
  const id = context.params.id;
  const blogPostResponse = await IndexAPI.get(`/admin/blog/${id}`);

  //Create and add blog post banner image buffer to blog post object
  for (let i = 0; i < blogPostResponse.data.data.post.length; i++) {
    if (blogPostResponse.data.data.post[i].imageKey !== null) {
      let imagesResponse = await IndexAPI.get(
        `/images/${blogPostResponse.data.data.post[i].imageKey}`,
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

  //Provide the selected blog post's content as a prop to the blog post component
  return {
    props: {
      selectedBlog: blogPostResponse.data.data.post,
    },
    revalidate: 1,
  };
}

export default AdminBlogPost;
