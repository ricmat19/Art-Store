/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import IndexAPI from "../../../apis/indexAPI";
import { Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  title: "",
  date: "",
  price: "",
  spots: "",
  info: "",
};
const onSubmit = (onSubmitProps: any) => {
  onSubmitProps.resetForm();
};
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  date: Yup.string().required("Date is required"),
  price: Yup.string().required("Price is required"),
  spots: Yup.string().required("Spots is required"),
  info: Yup.string().required("Info is required"),
});

const AdminUpdateEvent = (props: any) => {
  const [selectedTitle, setSelectedTitle] = useState<string>(
    props.selectedEvent.title
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    props.selectedEvent.event_date
  );
  console.log(props.selectedEvent.event_date);
  const [selectedPrice, setSelectedPrice] = useState<number>(
    parseInt(props.selectedEvent.price.replace("$", ""))
  );
  const [selectedSpots, setSelectedSpots] = useState<string>(
    props.selectedEvent.spots
  );
  const [selectedInfo, setSelectedInfo] = useState<string>(
    props.selectedEvent.info
  );

  const editEvent = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await IndexAPI.put(`/admin/events/${props.selectedEvent.id}`, {
        selectedTitle,
        selectedDate,
        selectedPrice,
        selectedInfo,
        selectedSpots,
      });

      props.handleClose();
    } catch (err) {
      console.log(err);
    }
  };

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
          return (
            <Form>
              <h1>Edit Event</h1>
              <Grid className="admin-form-field">
                <label className="event-form-label">Title</label>
                <Field
                  value={selectedTitle}
                  onChange={(e: any) => setSelectedTitle(e.target.value)}
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
                <label className="event-form-label">Date</label>
                <Field
                  value={new Date(selectedDate).toLocaleDateString("en-CA")}
                  onChange={(e: any) => setSelectedDate(e.target.value)}
                  type="date"
                  name="date"
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
                  value={selectedPrice}
                  onChange={(e: any) =>
                    setSelectedPrice(parseInt(e.target.value))
                  }
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
                  value={selectedSpots}
                  onChange={(e: any) => setSelectedSpots(e.target.value)}
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
                  value={selectedInfo}
                  onChange={(e: any) => setSelectedInfo(e.target.value)}
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
                  onClick={(e: any) => editEvent(e)}
                  disabled={!formik.isValid}
                >
                  Submit
                </button>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Grid>
  );
};

export default AdminUpdateEvent;
