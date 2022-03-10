import IndexAPI from "../apis/indexAPI";
import MainNav from "../components/users/mainNav";
import PagesNav from "../components/users/pagesNav";
import FooterC from "../components/footer";
// import { IUser } from "../interfaces";
import { Grid } from "@mui/material";
import Head from "next/head";

const Profile = (props: any) => {
  // const [user] = useState<IUser[]>(props.user);

  return (
    <Grid>
      <Head>
        <title>artHouse19-Profile</title>
        <meta name="description" content="Your profile."></meta>
      </Head>
      <MainNav cartQty={props.cartQty} />
      <PagesNav />
      <Grid>
        <h1 className="main-title">profile</h1>
        <Grid className="banner">
          <Grid>{/* <img src="" /> */}</Grid>
          <Grid>
            <h1>{/* {user.firstName} {user.lastName} */}</h1>
          </Grid>
          <Grid>
            <h1>{/* {user.city}, {user.state} */}</h1>
          </Grid>
        </Grid>
        <Grid>
          <Grid>
            <h1>interests</h1>
            {/* <Grid>{user.interests}</Grid> */}
          </Grid>
        </Grid>
      </Grid>
      <FooterC />
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
