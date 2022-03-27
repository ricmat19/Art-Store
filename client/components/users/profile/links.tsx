import IndexAPI from "../../../apis/indexAPI";
import { Grid } from "@mui/material";
import { useState } from "react";

const Links = (props: any) => {
  const [email] = useState(props.profile.email);
  const [website, setWebsite] = useState(props.profile.website);
  const [twitter, setTwitter] = useState(props.profile.twitter);
  const [linkedIn, setLinkedIn] = useState(props.profile.linkedin);
  const [youtube, setYoutube] = useState(props.profile.youtube);

  const updateProfile = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await IndexAPI.put(`/profile/links`, {
        website,
        twitter,
        linkedIn,
        youtube,
        email,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid>
      <Grid className="two-column-div">
        <Grid className="profile-form-field">
          <label>Website:</label>
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </Grid>
        <Grid className="admin-form-field">
          <label className="inner-form-label">Twitter:</label>
          <input
            type="text"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid className="two-column-div">
        <Grid className="profile-form-field">
          <label>LinkedIn:</label>
          <input
            type="text"
            value={linkedIn}
            onChange={(e) => setLinkedIn(e.target.value)}
          />
        </Grid>
        <Grid className="admin-form-field">
          <label className="inner-form-label">Youtube:</label>
          <input
            type="text"
            value={youtube}
            onChange={(e) => setYoutube(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid sx={{ display: "grid" }}>
        <Grid sx={{ textAlign: "center" }}>
          <button type="submit" onClick={updateProfile}>
            Submit
          </button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Links;
