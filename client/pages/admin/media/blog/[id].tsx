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

const initialValues = {
  title: "",
  content: "",
};
const onSubmit = (onSubmitProps: any) => {
  onSubmitProps.resetForm();
};
const validationSchema = Yup.object({
  title: Yup.string().required("Email is required"),
  content: Yup.string().required("Email is required"),
});

const AdminBlogPost = (props: any) => {
  const [loginStatus, setLoginStatus] = useState<boolean>(true);
  const [title, setTitle] = useState<string>(props.selectedBlog[0].title);
  const [content, setContent] = useState<string>(props.selectedBlog[0].content);

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

  const updateBlog = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      // if (fileImage) {
      //   let formData = new FormData();

      //   formData.append("title", title);
      //   formData.append("product", product);
      //   formData.append("price", price);
      //   formData.append("info", info);
      //   formData.append("qty", qty);
      //   formData.append("image", fileImage);

      //   await IndexAPI.put(
      //     `/admin/products/${props.updateProduct.id}`,
      //     formData,
      //     {
      //       headers: { "Content-Type": "multipart/form-data" },
      //     }
      //   )
      //     .then((res) => console.log(res))
      //     .catch((err) => console.log(err));
      // } else {
      await IndexAPI.put(`/admin/blog/${props.selectedBlog[0].id}`, {
        title,
        content,
      });
      router.push("/admin/media/blog");
      // }
    } catch (err) {
      console.log(err);
    }
  };

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
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
              validateOnChange={false}
              validateOnBlur={false}
              validateOnMount
            >
              {(formik) => {
                return (
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
                        <Field
                          className="full-width"
                          onChange={(e: any) => setTitle(e.target.value)}
                          value={title}
                          name="title"
                        />
                        <ErrorMessage name="email" component="div">
                          {(errorMsg) => (
                            <Grid className="errorMsg">{errorMsg}</Grid>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid>
                        <label>Content:</label>
                        <Field
                          className="full-width"
                          onChange={(e: any) => setContent(e.target.value)}
                          value={content}
                          rows={50}
                          name="content"
                        />
                        <ErrorMessage name="email" component="div">
                          {(errorMsg) => (
                            <Grid className="errorMsg">{errorMsg}</Grid>
                          )}
                        </ErrorMessage>
                      </Grid>
                      <Grid sx={{ textAlign: "center" }}>
                        <button
                          type="submit"
                          onClick={updateBlog}
                          disabled={!formik.isValid}
                        >
                          Submit
                        </button>
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
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

export async function getStaticProps(context: { params: { id: any } }) {
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
