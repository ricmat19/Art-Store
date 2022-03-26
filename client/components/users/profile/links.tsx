// import IndexAPI from "../../../apis/indexAPI";
import { Grid } from "@mui/material";

const Links = () => {
  return (
    <Grid>
      <Grid className="two-column-div">
        <Grid className="profile-form-field">
          <label>Website:</label>
          <input type="text" />
        </Grid>
        <Grid className="admin-form-field">
          <label className="inner-form-label">Twitter:</label>
          <input type="text" />
        </Grid>
      </Grid>
      <Grid className="two-column-div">
        <Grid className="profile-form-field">
          <label>LinkedIn:</label>
          <input type="text" />
        </Grid>
        <Grid className="admin-form-field">
          <label className="inner-form-label">Youtube:</label>
          <input type="text" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Links;
