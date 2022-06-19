import IndexAPI from "../../../apis/indexAPI";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminMainNav from "../../../components/admin/mainNav";
import AdminPagesNav from "../../../components/admin/pagesNav";
import FooterC from "../../../components/footer";
import { Grid } from "@mui/material";

//Admin help functional component
const AdminHelp = () => {
  // Admin help states
  const [loginStatus, setLoginStatus] = useState<boolean>(true);

  //Next router function
  const router = useRouter();

  useEffect(() => {
    const fetchData = () => {
      try {
        //Query login status on render
        const loginResponse = IndexAPI.get(`/login`);
        setLoginStatus(loginResponse.data.data.loggedIn);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  //Render component based on login status
  if (loginStatus) {
    return (
      <Grid>
        {/* Admin main navigation component */}
        <AdminMainNav />
        {/* Admin pages navigation component */}
        <AdminPagesNav />
        <Grid>
          <Grid>
            <h1 className="main-title">help</h1>
          </Grid>
          <Grid className="gallery-menu">
            {/* Route to Getting Started category */}
            <Grid
              className="help-menu-button"
              sx={{ border: "solid white 2px", padding: "30px" }}
              onClick={() => router.push(`/admin/help/gettingStarted`)}
            >
              <h2>Getting Started</h2>
            </Grid>
            {/* Route to Account/Profile category */}
            <Grid
              className="help-menu-button"
              sx={{ border: "solid white 2px", padding: "30px" }}
              onClick={() => router.push(`/admin/help/accountProfile`)}
            >
              <h2>Account / Profile</h2>
            </Grid>
            {/* Route to Troubleshooting category */}
            <Grid
              className="help-menu-button"
              sx={{ border: "solid white 2px", padding: "30px" }}
              onClick={() => router.push(`/admin/help/troubleshooting`)}
            >
              <h2>Troubleshooting</h2>
            </Grid>
            {/* Route to Course Taking category */}
            <Grid
              className="help-menu-button"
              sx={{ border: "solid white 2px", padding: "30px" }}
              onClick={() => router.push(`/admin/help/courseTaking`)}
            >
              <h2>Course Taking</h2>
            </Grid>
            {/* Route to Purchases/Refunds category */}
            <Grid
              className="help-menu-button"
              sx={{ border: "solid white 2px", padding: "30px" }}
              onClick={() => router.push(`/admin/help/purchasesRefunds`)}
            >
              <h2>Purchases / Refunds</h2>
            </Grid>
          </Grid>
        </Grid>
        <FooterC />
      </Grid>
    );
  } else {
    return <Grid></Grid>;
  }
};

export async function getStaticProps() {
  // Get all items in cart
  const cartResponse = await IndexAPI.get(`/cart`);

  //Provide cart content as prop to the help component
  return {
    props: {
      cartQty: cartResponse.data.data.cart.length,
    },
    revalidate: 1,
  };
}

export default AdminHelp;
