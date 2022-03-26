import IndexAPI from "../apis/indexAPI";
import { useState } from "react";
import MainNav from "../components/users/mainNav";
import PagesNav from "../components/users/pagesNav";
import FooterC from "../components/footer";
import { Grid, Tabs, Tab } from "@mui/material";
import Info from "../components/users/profile/info";
import Bio from "../components/users/profile/bio";
import Links from "../components/users/profile/links";
import PaymentMethods from "../components/users/profile/paymentMethods";
import Head from "next/head";

const Profile = (props: any) => {
  const [view, setView] = useState("events");
  return (
    <Grid>
      <Head>
        <title>artHouse19-Profile</title>
        <meta name="description" content="Your profile."></meta>
      </Head>
      <MainNav cartQty={props.cartQty} />
      <PagesNav />
      <Grid className="main-body">
        <Grid sx={{ padding: "30px 10%", width: "100vw", display: "grid" }}>
          <h1 className="main-title">profile</h1>
          <Tabs sx={{ display: "grid", alignContent: "end" }}>
            <Tab
              label="Info"
              onClick={() => setView("info")}
              sx={{ color: "white", fontFamily: "Rajdhani", fontSize: "20px" }}
            />
            <Tab
              label="Bio"
              onClick={() => setView("bio")}
              sx={{ color: "white", fontFamily: "Rajdhani", fontSize: "20px" }}
            />
            <Tab
              label="Links"
              onClick={() => setView("links")}
              sx={{ color: "white", fontFamily: "Rajdhani", fontSize: "20px" }}
            />
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
            <form className="admin-form">
              {view === "info" ? (
                <Info />
              ) : view === "bio" ? (
                <Bio />
              ) : view === "links" ? (
                <Links />
              ) : (
                <PaymentMethods />
              )}
            </form>
          </Grid>
        </Grid>
        <FooterC />
      </Grid>
    </Grid>
  );
};

export async function getStaticProps() {
  const cartResponse = await IndexAPI.get(`/cart`);

  const userResponse = await IndexAPI.get(`/profile`);

  return {
    props: {
      cartQty: cartResponse.data.data.cart.length,
      // user: userResponse.data.data.user,
      user: userResponse.data.data,
    },
    revalidate: 1,
  };
}

export default Profile;
