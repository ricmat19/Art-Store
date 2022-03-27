import IndexAPI from "../../../apis/indexAPI";
import { Grid } from "@mui/material";
import { useState } from "react";

const Info = (props: any) => {
  const [email] = useState(props.profile.email);
  const [firstName, setFirstName] = useState(props.profile.firstname);
  const [lastName, setLastName] = useState(props.profile.lastname);
  const [newEmail, setNewEmail] = useState(props.profile.email);
  const [phoneNumber, setPhoneNumber] = useState(props.profile.phoneNumber);
  const [address, setAddress] = useState(props.profile.address);
  const [city, setCity] = useState(props.profile.city);
  const [state, setState] = useState(props.profile.state);
  const [zip, setZip] = useState(props.profile.zip);

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

  return (
    <Grid>
      <Grid className="two-column-div">
        <Grid className="profile-form-field">
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid className="admin-form-field">
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
          <label>Email:</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </Grid>
        <Grid className="admin-form-field">
          <label className="inner-form-label">Phone Number:</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid className="single-line-profile-form-field">
        <label>Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Grid>
      <Grid className="three-column-div">
        <Grid className="profile-form-field">
          <label>City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Grid>
        <Grid className="middle-admin-form-field">
          <label className="inner-form-label">State:</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </Grid>
        <Grid className="admin-form-field">
          <label className="inner-form-label">Zipcode:</label>
          <input
            type="number"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid sx={{ display: "grid" }}>
        <Grid sx={{ textAlign: "center" }}>
          <button type="submit" onClick={updateProfile}>Submit</button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Info;
