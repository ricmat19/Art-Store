/* eslint-disable @next/next/no-img-element */
import IndexAPI from "../../../apis/indexAPI";
import { Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

//Update Event props interface
interface IAdminUpdateEvent {
  selectedEvent: { id: string };
  handleClose: () => void;
}
interface IUpdateEventForm {
  title: string;
  date: string;
  price: string;
  spots: string;
  info: string;
  id: string;
}

//Admin update event Formik form initial values
const initialValues = {
  title: "",
  date: "",
  price: "",
  spots: "",
  info: "",
  id: "",
};

//Admin update event Formik form onSubmit function
const onSubmit = async (
  values: IUpdateEventForm,
  onSubmitProps: { resetForm: () => void }
) => {
  await IndexAPI.put(`/admin/events/${values.id}`, {
    selectedTitle: values.title,
    selectedDate: values.date,
    selectedPrice: values.price,
    selectedSpots: values.spots,
    selectedInfo: values.info,
  });

  onSubmitProps.resetForm();
};

//Admin update event Formik form validation schema
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  date: Yup.string().required("Date is required"),
  price: Yup.string().required("Price is required"),
  spots: Yup.string().required("Spots is required"),
  info: Yup.string().required("Info is required"),
});

//Admin update event functional component
const AdminUpdateEvent = (props: IAdminUpdateEvent) => {
  //Admin update event modal
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
        {/* Admin update event Form */}
        <Form>
          <h1>Edit Event</h1>
          {/* Admin update event form title input field */}
          <Grid className="admin-form-field">
            <label className="event-form-label">Title</label>
            <Grid sx={{ display: "grid" }}>
              <Field as="input" type="text" name="title" />
              <ErrorMessage name="title" component="div">
                {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
              </ErrorMessage>
            </Grid>
          </Grid>
          {/* Admin update event form date input field */}
          <Grid className="admin-form-field">
            <label className="event-form-label">Date</label>
            <Grid sx={{ display: "grid" }}>
              <Field as="input" type="date" name="date" />
              <ErrorMessage name="date" component="div">
                {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
              </ErrorMessage>
            </Grid>
          </Grid>
          {/* Admin update event form price input field */}
          <Grid className="admin-form-field">
            <label className="event-form-label">Price</label>
            <Grid sx={{ display: "grid" }}>
              <Field as="input" type="number" name="price" />
              <ErrorMessage name="price" component="div">
                {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
              </ErrorMessage>
            </Grid>
          </Grid>
          {/* Admin update event form spots input field */}
          <Grid className="admin-form-field">
            <label className="event-form-label">Spots</label>
            <Grid sx={{ display: "grid" }}>
              <Field as="input" type="number" name="spots" />
              <ErrorMessage name="spots" component="div">
                {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
              </ErrorMessage>
            </Grid>
          </Grid>
          {/* Admin update event form info input field */}
          <Grid className="admin-form-field">
            <label className="event-form-label">Info</label>
            <Grid sx={{ display: "grid" }}>
              <Field as="textarea" name="info" rows={7} />
              <ErrorMessage name="info" component="div">
                {(errorMsg) => <Grid className="errorMsg">{errorMsg}</Grid>}
              </ErrorMessage>
            </Grid>
          </Grid>
          {/* Admin submit update event form */}
          <Grid className="align-center">
            <button type="submit">Submit</button>
          </Grid>
        </Form>
      </Formik>
    </Grid>
  );
};

export default AdminUpdateEvent;
