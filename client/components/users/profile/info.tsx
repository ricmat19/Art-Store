import IndexAPI from "../../../apis/indexAPI";
import { Grid } from "@mui/material";
import { useState } from "react";
import { IUser } from "../../../interfaces";

interface IInfo {
  profile: IUser[];
}

//Profile info functional component
const Info = (props: IInfo) => {
  console.log(props.profile[0].firstname);
  //Profile info states
  const [email] = useState<string>(props.profile[0].email);
  const [firstName, setFirstName] = useState<string>(
    props.profile[0].firstname
  );
  const [lastName, setLastName] = useState<string>(props.profile[0].lastname);
  const [newEmail, setNewEmail] = useState<string>(props.profile[0].email);
  const [phoneNumber, setPhoneNumber] = useState<string>(
    props.profile[0].phone
  );
  const [address, setAddress] = useState<string>(props.profile[0].address);
  const [city, setCity] = useState<string>(props.profile[0].city);
  const [state, setState] = useState<string>(props.profile[0].state);
  const [zip, setZip] = useState<string>(props.profile[0].zip);

  //Function to update the user's profile info
  const updateProfile = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await IndexAPI.put(`/profile/info`, {
        firstName,
        lastName,
        newEmail,
        phoneNumber,
        address,
        city,
        state,
        zip,
        email,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //Profile info component
  return (
    <Grid>
      <Grid className="two-column-div">
        <Grid className="profile-form-field">
          {/* Profile first name input field */}
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid className="admin-form-field">
          {/* Profile last name input field */}
          <label className="inner-form-label">Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid className="two-column-div">
        <Grid className="profile-form-field">
          {/* Profile email input field */}
          <label>Email:</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </Grid>
        <Grid className="admin-form-field">
          {/* Profile phone number input field */}
          <label className="inner-form-label">Phone Number:</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid className="single-line-profile-form-field">
        {/* Profile address input field */}
        <label>Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Grid>
      <Grid className="three-column-div">
        <Grid className="profile-form-field">
          {/* Profile city input field */}
          <label>City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Grid>
        <Grid className="middle-admin-form-field">
          {/* Profile state input field */}
          <label className="inner-form-label">State:</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </Grid>
        <Grid className="admin-form-field">
          {/* Profile zip code input field */}
          <label className="inner-form-label">Zip Code:</label>
          <input
            type="number"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid sx={{ display: "grid" }}>
        <Grid sx={{ textAlign: "center" }}>
          {/* Submit button to update profile info */}
          <button type="submit" onClick={() => updateProfile}>
            Submit
          </button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Info;
