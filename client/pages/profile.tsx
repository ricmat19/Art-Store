import IndexAPI from "../apis/indexAPI";
import { useState } from "react";
import MainNav from "../components/users/mainNav";
import PagesNav from "../components/users/pagesNav";
import Footer from "../components/footer";
import { Grid, Tabs, Tab } from "@mui/material";
import Info from "../components/users/profile/info";
import Bio from "../components/users/profile/bio";
import Links from "../components/users/profile/links";
import PaymentMethods from "../components/users/profile/paymentMethods";
import Head from "next/head";

// Privacy policy prop interface
interface IProfile {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  image: File;
  bio: string;
  website: string;
  twitter: string;
  linkedin: string;
  youtube: string;
  cartQty: number;
  privacyPolicyContent: string;
}

// Profile functional component
const Profile = (props: IProfile) => {
  // Profile states
  const [view, setView] = useState("info");

  // Profile component
  return (
    <Grid>
      <Head>
        <title>artHouse19-Profile</title>
        <meta name="description" content="Your profile."></meta>
      </Head>
      {/* Main navigation component */}
      <MainNav cartQty={props.cartQty} />
      {/* Pages navigation component */}
      <PagesNav />
      <Grid className="main-body">
        <Grid sx={{ padding: "30px 10%", width: "100vw", display: "grid" }}>
          <h1 className="main-title">profile</h1>
          {/* Profile tabs */}
          <Tabs sx={{ display: "grid", alignContent: "end" }}>
            {/* Info profile tab */}
            <Tab
              label="Info"
              onClick={() => setView("info")}
              sx={{ color: "white", fontFamily: "Rajdhani", fontSize: "20px" }}
            />
            {/* Bio profile tab */}
            <Tab
              label="Bio"
              onClick={() => setView("bio")}
              sx={{ color: "white", fontFamily: "Rajdhani", fontSize: "20px" }}
            />
            {/* Links profile tab */}
            <Tab
              label="Links"
              onClick={() => setView("links")}
              sx={{ color: "white", fontFamily: "Rajdhani", fontSize: "20px" }}
            />
            {/* Payment methods profile tab */}
            <Tab
              label="Payment Methods"
              onClick={() => setView("paymentMethods")}
              sx={{ color: "white", fontFamily: "Rajdhani", fontSize: "20px" }}
            />
          </Tabs>
          <Grid
            sx={{
              border: "solid white 2px",
              display: "grid",
              alignContent: "center",
              minHeight: "350px",
            }}
          >
            {/* Profile content component conditional rendering */}
            <Grid className="admin-form">
              {view === "info" ? (
                <Info profile={props} />
              ) : view === "bio" ? (
                <Bio profile={props} />
              ) : view === "links" ? (
                <Links profile={props} />
              ) : (
                <PaymentMethods />
              )}
            </Grid>
          </Grid>
        </Grid>
        {/* Footer component */}
        <Footer />
      </Grid>
    </Grid>
  );
};

export async function getStaticProps() {
  // Get cart content
  const cartResponse = await IndexAPI.get(`/cart`);

  // Get profile content
  const profileResponse = await IndexAPI.get(`/profile`);

  //Provide the cart quantity and profile content as a props to the profile component
  return {
    props: {
      cartQty: cartResponse.data.data.cart.length,
      profile: profileResponse.data.data.user,
    },
    revalidate: 1,
  };
}

export default Profile;
