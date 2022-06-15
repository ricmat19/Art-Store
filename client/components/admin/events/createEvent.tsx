/* eslint-disable @next/next/no-img-element */
import { Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

//Admin create event prop interface
interface ICreateEventForm {
  setTitle: string;
  setPrice: string;
  setSpots: string;
  setInfo: string;
  createEvent: any;
}

//Admin create event Formik form initial values
const initialValues = {
  title: "",
  price: "",
  spots: "",
  info: "",
};

//Admin create event Formik form onSubmit function
const onSubmit = (values: any, onSubmitProps: { resetForm: () => void }) => {
  onSubmitProps.resetForm();
};

//Admin create event Formik form validation schema
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  price: Yup.string().required("Price is required"),
  spots: Yup.string().required("Spots is required"),
  info: Yup.string().required("Info is required"),
});

//Admin create event functional component
const AdminCreateEvent = (props: any) => {
  //Admin create event form component
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
        {/* Admin create event Form */}
        <Form>
          <h1>New Event</h1>
          {/* Admin create event form title input field */}
          <Grid className="admin-form-field">
            <label className="event-form-label">Title</label>
            <Grid sx={{ display: "grid" }}>
              <Field as="input" type="text" name="title" />
              <ErrorMessage name="title" component="div">
                {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
              </ErrorMessage>
            </Grid>
          </Grid>
          {/* Admin create event form price input field */}
          <Grid className="admin-form-field">
            <label className="event-form-label">Price</label>
            <Grid sx={{ display: "grid" }}>
              <Field as="input" type="number" name="price" />
              <ErrorMessage name="price" component="div">
                {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
              </ErrorMessage>
            </Grid>
          </Grid>
          {/* Admin create event form spots input field */}
          <Grid className="admin-form-field">
            <label className="event-form-label">Spots</label>
            <Grid sx={{ display: "grid" }}>
              <Field as="input" type="number" name="spots" />
              <ErrorMessage name="spots" component="div">
                {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
              </ErrorMessage>
            </Grid>
          </Grid>
          {/* Admin create event form info input field */}
          <Grid className="admin-form-field">
            <label className="event-form-label">Info</label>
            <Grid sx={{ display: "grid" }}>
              <Field as="textarea" name="info" required rows={7} />
              <ErrorMessage name="info" component="div">
                {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
              </ErrorMessage>
            </Grid>
          </Grid>
          {/* Admin submit create event form */}
          <Grid className="align-center">
            <button type="submit">Submit</button>
          </Grid>
        </Form>
      </Formik>
    </Grid>
  );
};

export default AdminCreateEvent;
