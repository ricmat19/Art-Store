/* eslint-disable @next/next/no-img-element */
import { Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  title: "",
  price: "",
  spots: "",
  info: "",
};
const onSubmit = (onSubmitProps: any) => {
  onSubmitProps.resetForm();
};
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  price: Yup.string().required("Price is required"),
  spots: Yup.string().required("Spots is required"),
  info: Yup.string().required("Info is required"),
});

const AdminCreateEvent = (props: any) => {
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
        {(formik) => {
          <Form>
            <h1>New Event</h1>
            <Grid className="admin-form-field">
              <label className="event-form-label">Title</label>
              <Field
                value={props.title}
                onChange={(e: any) => props.setTitle(e.target.value)}
                type="text"
                name="title"
                className="form-control"
                required
              />
              <ErrorMessage name="email" component="div">
                {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
              </ErrorMessage>
            </Grid>
            <Grid className="admin-form-field">
              <label className="event-form-label">Price</label>
              <Field
                value={props.price}
                onChange={(e: any) => props.setPrice(e.target.value)}
                type="number"
                name="price"
                className="form-control"
                required
              />
              <ErrorMessage name="email" component="div">
                {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
              </ErrorMessage>
            </Grid>
            <Grid className="admin-form-field">
              <label className="event-form-label">Spots</label>
              <Field
                value={props.spots}
                onChange={(e: any) => props.setSpots(e.target.value)}
                type="number"
                name="spots"
                className="form-control"
                required
              />
              <ErrorMessage name="email" component="div">
                {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
              </ErrorMessage>
            </Grid>
            <Grid className="admin-form-field">
              <label className="event-form-label">Info</label>
              <Field
                value={props.info}
                onChange={(e: any) => props.setInfo(e.target.value)}
                className="form-control"
                name="info"
                required
                rows={7}
              />
              <ErrorMessage name="email" component="div">
                {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
              </ErrorMessage>
            </Grid>
            <Grid className="align-center">
              <button
                type="submit"
                onClick={(e) => props.createEvent(e)}
                disabled={!formik.isValid}
              >
                Submit
              </button>
            </Grid>
          </Form>;
        }}
      </Formik>
    </Grid>
  );
};

export default AdminCreateEvent;
