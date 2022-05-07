import IndexAPI from "../../../../apis/indexAPI";
import { useState } from "react";
import { useRouter } from "next/router";
import AdminMainNav from "../../../../components/admin/mainNav";
import AdminPagesNav from "../../../../components/admin/pagesNav";
import FooterC from "../../../../components/footer";
import { Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  email: "",
};
const onSubmit = (onSubmitProps: any) => {
  onSubmitProps.resetForm();
};
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const HelpArticle = (props: any) => {
  const [title, setTitle] = useState<string>(props.helpArticle[0].title);
  const [content, setContent] = useState<string>(props.helpArticle[0].article);

  const router = useRouter();

  const updateArticle = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await IndexAPI.put(
        `/admin/help/${props.helpArticle[0].category}/${props.helpArticle[0].id}`,
        {
          title,
          content,
        }
      );
      router.push(`/admin/help/${props.helpArticle[0].category}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid>
      <AdminMainNav />
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
          {(formik) => {
            return (
              <Form>
                <Grid
                  sx={{ display: "grid", gap: "10px", margin: "50px 20vw" }}
                >
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
                      onClick={updateArticle}
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
        <Grid>{props.helpArticle.title}</Grid>
        <Grid>{props.helpArticle.article}</Grid>
      </Grid>
      <FooterC />
    </Grid>
  );
};

export async function getStaticPaths() {
  const helpResponse = await IndexAPI.get(`/help`);

  return {
    fallback: false,
    paths: helpResponse.data.data.helpArticles.map((article: any) => ({
      params: {
        category: article.category,
        id: article.id,
      },
    })),
  };
}

export async function getStaticProps(context: {
  params: { category: any; id: any };
}) {
  const category = context.params.category;
  const id = context.params.id;
  const helpArticle = await IndexAPI.get(`/admin/help/${category}/${id}`);

  const cartResponse = await IndexAPI.get(`/cart`);

  return {
    props: {
      helpArticle: helpArticle.data.data.helpArticle,
      cartQty: cartResponse.data.data.cart.length,
    },
    revalidate: 1,
  };
}

export default HelpArticle;
