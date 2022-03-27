import IndexAPI from "../../../apis/indexAPI";
import { Grid } from "@mui/material";
import { useState } from "react";

const Bio = (props: any) => {
  const [email] = useState(props.profile.email);
  const [image, setImage] = useState(props.profile.image);
  const [bio, setBio] = useState(props.profile.bio);

  const updateProfile = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await IndexAPI.put(`/profile/bio`, {
        image,
        bio,
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
          <label>Profile Image:</label>
          <input
            type="file"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Grid>
        <Grid sx={{ border: "solid white 2px" }}></Grid>
      </Grid>
      <Grid className="single-line-profile-form-field">
        <label>Bio:</label>
        <textarea
          rows={5}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </Grid>
      <Grid sx={{ display: "grid" }}>
        <Grid sx={{ textAlign: "center" }}>
          <button type="submit" onClick={updateProfile}>Submit</button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Bio;
