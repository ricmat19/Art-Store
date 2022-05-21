/* eslint-disable @next/next/no-img-element */
import { Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface ICreateEventForm {
  title: string;
  price: string;
  spots: string;
  info: string;
}

const initialValues = {
  title: "",
  price: "",
  spots: "",
  info: "",
};
const onSubmit = (values: ICreateEventForm, onSubmitProps: any) => {
  onSubmitProps.resetForm();
};
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  price: Yup.string().required("Price is required"),
  spots: Yup.string().required("Spots is required"),
  info: Yup.string().required("Info is required"),
});

const AdminCreateEvent = () => {
  return (
    <Grid className="create-event">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        validateOnMount
      >
        <Form>
          <h1>New Event</h1>
          <Grid className="admin-form-field">
            <label className="event-form-label">Title</label>
            <Grid sx={{ display: "grid" }}>
              <Field as="input" type="text" name="title" />
              <ErrorMessage name="title" component="div">
                {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
              </ErrorMessage>
            </Grid>
          </Grid>
          <Grid className="admin-form-field">
            <label className="event-form-label">Price</label>
            <Grid sx={{ display: "grid" }}>
              <Field as="input" type="number" name="price" />
              <ErrorMessage name="price" component="div">
                {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
              </ErrorMessage>
            </Grid>
          </Grid>
          <Grid className="admin-form-field">
            <label className="event-form-label">Spots</label>
            <Grid sx={{ display: "grid" }}>
              <Field as="input" type="number" name="spots" />
              <ErrorMessage name="spots" component="div">
                {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
              </ErrorMessage>
            </Grid>
          </Grid>
          <Grid className="admin-form-field">
            <label className="event-form-label">Info</label>
            <Grid sx={{ display: "grid" }}>
              <Field as="textarea" name="info" required rows={7} />
              <ErrorMessage name="info" component="div">
                {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
              </ErrorMessage>
            </Grid>
          </Grid>
          <Grid className="align-center">
            <button type="submit">Submit</button>
          </Grid>
        </Form>
      </Formik>
    </Grid>
  );
};

export default AdminCreateEvent;
