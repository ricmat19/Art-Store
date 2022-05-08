import IndexAPI from "../../../../apis/indexAPI";
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
const onSubmit = (values: any, onSubmitProps: any) => {
  IndexAPI.put(
    `/admin/help/${values.helpArticle[0].category}/${values.helpArticle[0].id}`,
    {
      title: values.title,
      content: values.content,
    }
  );
  values.router.push(`/admin/help/${values.helpArticle[0].category}`);
  onSubmitProps.resetForm();
};
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const HelpArticle = (props: any) => {
  const router = useRouter();

  return (
    <Grid>
      <AdminMainNav />
      <AdminPagesNav />
      <Grid>
        <Formik
          initialValues={{
            initialValues: initialValues,
            router: router,
            title: props.helpArticle[0].title,
            content: props.helpArticle[0].article,
          }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          validateOnMount
        >
          <Form>
            <Grid sx={{ display: "grid", gap: "10px", margin: "50px 20vw" }}>
              <Grid>
                <label>Title:</label>
                <Grid sx={{ display: "grid" }}>
                  <Field as="input" className="full-width" name="title" />
                  <ErrorMessage name="title" component="div">
                    {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
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
                    {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
                  </ErrorMessage>
                </Grid>
              </Grid>
              <Grid sx={{ textAlign: "center" }}>
                <button type="submit">Submit</button>
              </Grid>
            </Grid>
          </Form>
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
