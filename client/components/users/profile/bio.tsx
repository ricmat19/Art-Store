import IndexAPI from "../../../apis/indexAPI";
import { Grid } from "@mui/material";
import { useState } from "react";
import { IUser } from "../../../interfaces";

interface IBio {
  profile: IUser;
}

//Profile bio functional component
const Bio = (props: IBio) => {
  //Profile bio states
  const [email] = useState<string>(props.profile.email);
  const [image, setImage] = useState<string>(props.profile.image);
  const [bio, setBio] = useState<string>(props.profile.bio);

  //Function to update the user's profile bio
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

  //Profile bio component
  return (
    <Grid>
      <Grid className="two-column-div">
        <Grid className="profile-form-field">
          {/* Profile image input field */}
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
        {/* Profile bio input textbox */}
        <label>Bio:</label>
        <textarea
          rows={5}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </Grid>
      <Grid sx={{ display: "grid" }}>
        <Grid sx={{ textAlign: "center" }}>
          {/* Submit button to update profile bio*/}
          <button type="submit" onClick={() => updateProfile}>
            Submit
          </button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Bio;
