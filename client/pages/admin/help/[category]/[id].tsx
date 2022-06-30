import IndexAPI from "../../../../apis/indexAPI";
import { useEffect, useState } from "react";
import router, { NextRouter, useRouter } from "next/router";
import AdminMainNav from "../../../../components/admin/mainNav";
import AdminPagesNav from "../../../../components/admin/pagesNav";
import FooterC from "../../../../components/footer";
import { Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Admin create help article prop interface
interface IHelpArticle {
  title: string;
  content: string;
  helpArticle: {
    id: string;
    title: string;
    article: string;
    category: string;
  }[];
  email: string;
}

//Admin create help article Formik form initial values
const initialValues = {
  title: "",
  content: "",
  helpArticle: [
    {
      id: "",
      title: "",
      article: "",
      category: "",
    },
  ],
  email: "",
};

//Admin course Formik form onSubmit function
const onSubmit = async (
  values: IHelpArticle,
  onSubmitProps: { resetForm: () => void }
) => {
  // Admin create/update help article on submit
  await IndexAPI.put(
    `/admin/help/${values.helpArticle[0].category}/${values.helpArticle[0].id}`,
    {
      title: values.title,
      content: values.content,
    }
  );
  //Direct to the help article's category page on submit
    await router.push(`/admin/help/${values.helpArticle[0].category}`);

  onSubmitProps.resetForm();
};

//Admin help article Formik form validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

//Admin help article functional component
const AdminHelpArticle = (props: IHelpArticle) => {
  // Admin help article states
  const [loginStatus, setLoginStatus] = useState<boolean>(true);

  // Next router function
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Query login status on render
        const loginResponse = await IndexAPI.get(`/login`);
        setLoginStatus(loginResponse.data.data.loggedIn);
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
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            validateOnMount
          >
            {/* Admin help article Form */}
            <Form>
              <Grid sx={{ display: "grid", gap: "10px", margin: "50px 20vw" }}>
                <Grid>
                  {/* Admin help article title input field */}
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
                  {/* Admin help article content input textbox */}
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
                {/* Admin help article form submit button */}
                <Grid sx={{ textAlign: "center" }}>
                  <button type="submit">Submit</button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
          {/* ? */}
          <Grid>{props.helpArticle[0].title}</Grid>
          {/* ? */}
          <Grid>{props.helpArticle[0].article}</Grid>
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
