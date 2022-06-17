import IndexAPI from "../../../apis/indexAPI";
import { Grid } from "@mui/material";
import { useState } from "react";
import { IProfile } from "../../../interfaces";

//Profile links functional component
const Links = (props: IProfile) => {
  //Profile links states
  const [email] = useState(props.email);
  const [website, setWebsite] = useState(props.website);
  const [twitter, setTwitter] = useState(props.twitter);
  const [linkedIn, setLinkedIn] = useState(props.linkedin);
  const [youtube, setYoutube] = useState(props.youtube);

  //Function to update the user's profile links
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

  //Profile links component
  return (
    <Grid>
      <Grid className="two-column-div">
        <Grid className="profile-form-field">
          {/* Profile website link input field */}
          <label>Website:</label>
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </Grid>
        <Grid className="admin-form-field">
          {/* Profile twitter link input field */}
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
          {/* Profile linkedin link input field */}
          <label>LinkedIn:</label>
          <input
            type="text"
            value={linkedIn}
            onChange={(e) => setLinkedIn(e.target.value)}
          />
        </Grid>
        <Grid className="admin-form-field">
          {/* Profile youtube link input field */}
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
          {/* Submit button to update profile links*/}
          <button type="submit" onClick={() => updateProfile}>
            Submit
          </button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Links;
