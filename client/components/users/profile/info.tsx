// import IndexAPI from "../apis/indexAPI";
import { Grid } from "@mui/material";

const Info = () => {

  return (
    <Grid>
      <Grid className="two-column-div">
        <Grid className="profile-form-field">
          <label>First Name:</label>
          <input type="text" />
        </Grid>
        <Grid className="admin-form-field">
          <label className="inner-form-label">Last Name:</label>
          <input type="text" />
        </Grid>
      </Grid>
      <Grid className="two-column-div">
        <Grid className="profile-form-field">
          <label>Email:</label>
          <input type="email" />
        </Grid>
        <Grid className="admin-form-field">
          <label className="inner-form-label">Phone Number:</label>
          <input type="tel" />
        </Grid>
      </Grid>
      <Grid className="single-line-profile-form-field">
        <label>Address:</label>
        <input type="text" />
      </Grid>
      <Grid className="three-column-div">
        <Grid className="profile-form-field">
          <label>City:</label>
          <input type="text" />
        </Grid>
        <Grid className="middle-admin-form-field">
          <label className="inner-form-label">State:</label>
          <input type="text" />
        </Grid>
        <Grid className="admin-form-field">
          <label className="inner-form-label">Zipcode:</label>
          <input type="number" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Info;
