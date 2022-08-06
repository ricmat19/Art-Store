import IndexAPI from "../../../../apis/indexAPI";
import { useEffect, useState } from "react";
import router, { NextRouter, useRouter } from "next/router";
import AdminMainNav from "../../../../components/admin/mainNav";
import AdminPagesNav from "../../../../components/admin/pagesNav";
import FooterC from "../../../../components/footer";
import { Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
// import * as Yup from "yup";

// Admin create help article prop interface
interface IHelpArticle {
  title: string;
  content: string;
  helpArticle: {
    id: string;
    title: string;
    article: string;
    category: string;
    create_date: Date;
    update_date: Date;
  }[];
  email: string;
}

// //Admin help article Formik form validation schema
// const validationSchema = Yup.object({
//   email: Yup.string()
//     .email("Invalid email format")
//     .required("Email is required"),
// });

//Admin help article functional component
const AdminHelpArticle = (props: IHelpArticle) => {
  // Admin help article states
  const [loginStatus, setLoginStatus] = useState<boolean>(true);
  const [title, setTitle] = useState<string>(props.helpArticle[0].title);
  const [content, setContent] = useState<string>(props.content);
  const [createMonth, setCreateMonth] = useState<number>(0);
  const [createDay, setCreateDay] = useState<number>(0);
  const [createYear, setCreateYear] = useState<number>(0);
  const [updateMonth, setUpdateMonth] = useState<number>(0);
  const [updateDay, setUpdateDay] = useState<number>(0);
  const [updateYear, setUpdateYear] = useState<number>(0);

  const editorRef = useRef(null);

  // Next router function
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Query login status on render
        const loginResponse = await IndexAPI.get(`/login`);
        setLoginStatus(loginResponse.data.data.loggedIn);

        const articleCreateDate = new Date(props.helpArticle[0].create_date);
        setCreateMonth(articleCreateDate.getMonth() + 1);
        setCreateDay(articleCreateDate.getDate());
        setCreateYear(articleCreateDate.getFullYear());
        const articleUpdateDate = new Date(props.helpArticle[0].update_date);
        setUpdateMonth(articleUpdateDate.getMonth() + 1);
        setUpdateDay(articleUpdateDate.getDate());
        setUpdateYear(articleUpdateDate.getFullYear());

        setTitle(props.helpArticle[0].title);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    // Re-render if change to date events state
  }, []);

  //Display component depending on login status
  if (loginStatus) {
    return (
      <Grid>
        {/* Admin main navigation component */}
        <AdminMainNav />
        {/* Admin pages navigation component */}
        <AdminPagesNav />
        <Grid>
          <Formik
            initialValues={{
              title: props.helpArticle[0].title,
              content: props.helpArticle[0].content,
              helpArticle: [
                {
                  id: props.helpArticle[0].id,
                  title: props.helpArticle[0].title,
                  article: props.helpArticle[0].article,
                  category: props.helpArticle[0].category,
                  create_date: props.helpArticle[0].create_date,
                  update_date: props.helpArticle[0].update_date,
                },
              ],
              email: "",
            }}
            onSubmit={async (
              values: IHelpArticle,
              onSubmitProps: { resetForm: () => void }
            ) => {
              // Admin create/update help article on submit
              await IndexAPI.put(
                `/admin/help/${values.helpArticle[0].category}/${values.helpArticle[0].id}`,
                {
                  title: values.title,
                  content: content,
                }
              );
              //Direct to the help article's category page on submit
              await router.push(
                `/admin/help/${values.helpArticle[0].category}`
              );

              onSubmitProps.resetForm();
            }}
            // validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            validateOnMount
          >
            {/* Admin help article Form */}
            <Form>
              <Grid sx={{ display: "grid", gap: "10px", margin: "50px 20vw" }}>
                <Grid>
                  <Grid>
                    <p>
                      Published: {createMonth}/{createDay}/{createYear}
                    </p>
                  </Grid>
                  <Grid>
                    <p>
                      Last Updated: {updateMonth}/{updateDay}/{updateYear}
                    </p>
                  </Grid>
                </Grid>
                <Grid>
                  {/* Admin help article title input field */}
                  <label>Title:</label>
                  <Grid sx={{ display: "grid" }}>
                    <Field as="input" name="title" />
                    <ErrorMessage name="title" component="div">
                      {(errorMsg) => (
                        <Grid className="errorMsg">{errorMsg}</Grid>
                      )}
                    </ErrorMessage>
                  </Grid>
                </Grid>
                <Grid>
                  {/* Admin help article content input textbox */}
                  <label>Content:</label>
                  <Grid sx={{ display: "grid" }}>
                    <Editor
                      apiKey={process.env.NEXT_PUBLIC_TINYMCE}
                      init={{
                        height: 350,
                        menubar: false,
                        plugins: [
                          "advlist",
                          "autolink",
                          "lists",
                          "link",
                          "image",
                          "charmap",
                          "anchor",
                          "searchreplace",
                          "visualblocks",
                          "code",
                          "fullscreen",
                          "insertdatetime",
                          "media",
                          "table",
                          "preview",
                          "help",
                          "wordcount",
                        ],
                        toolbar:
                          "undo redo | blocks | code | " +
                          "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | bold italic forecolor | help",
                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:12px }",
                      }}
                      initialValue={props.helpArticle[0].article}
                      value={content}
                      onEditorChange={(c: string, editor: any) => {
                        setContent(c);
                      }}
                    />
                    {/* <Field
                      as="textarea"
                      className="full-width"
                      rows={50}
                      name="content"
                    /> */}
                    <ErrorMessage name="content" component="div">
                      {(errorMsg) => (
                        <Grid className="errorMsg">{errorMsg}</Grid>
                      )}
                    </ErrorMessage>
                  </Grid>
                </Grid>
                {/* Admin help article form submit button */}
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
    );
  } else {
    return <Grid></Grid>;
  }
};

export async function getStaticPaths() {
  // Get list of all help articles
  const helpResponse = await IndexAPI.get(`/help`);

  //Create routes for each help article
  return {
    fallback: false,
    paths: helpResponse.data.data.helpArticles.map(
      (article: { category: string; id: string }) => ({
        params: {
          category: article.category,
          id: article.id,
        },
      })
    ),
  };
}

export async function getStaticProps(context: {
  params: { category: string; id: string };
}) {
  //Get the specified help article
  const category = context.params.category;
  const id = context.params.id;
  const helpArticle = await IndexAPI.get(`/admin/help/${category}/${id}`);

  //Get cart content
  const cartResponse = await IndexAPI.get(`/cart`);

  //Provide the selected help article and cart quantity as props to the help article component
  return {
    props: {
      helpArticle: helpArticle.data.data.helpArticle,
      cartQty: cartResponse.data.data.cart.length,
    },
    revalidate: 1,
  };
}

export default AdminHelpArticle;
