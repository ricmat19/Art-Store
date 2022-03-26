// import IndexAPI from "../apis/indexAPI";
import { Grid } from "@mui/material";

const Bio = () => {
  return (
    <Grid>
      <Grid className="two-column-div">
        <Grid className="profile-form-field">
          <label>Profile Image:</label>
          <input type="file" />
        </Grid>
        <Grid sx={{ border: "solid white 2px" }}></Grid>
      </Grid>
      <Grid className="single-line-profile-form-field">
        <label>Bio:</label>
        <textarea rows={5} />
      </Grid>
    </Grid>
  );
};

export default Bio;
