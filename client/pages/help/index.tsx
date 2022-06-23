import IndexAPI from "../../apis/indexAPI";
import { useRouter } from "next/router";
import MainNav from "../../components/users/mainNav";
import PagesNav from "../../components/users/pagesNav";
import FooterC from "../../components/footer";
import { Grid } from "@mui/material";

//Help prop interface
interface IHelp {
  cartQty: number;
}

//Help functional component
const Help = (props: IHelp) => {
  // Next router function
  const router = useRouter();

  // Help component
  return (
    <Grid>
      {/* Main navigation component */}
      <MainNav cartQty={props.cartQty} />
      {/* Pages navigation component */}
      <PagesNav />
      <Grid>
        <Grid>
          <h1 className="main-title">help</h1>
        </Grid>
        <Grid className="gallery-menu">
          {/* Route to help category 'Getting Started' page */}
          <Grid
            className="help-menu-button"
            sx={{ border: "solid white 2px", padding: "30px" }}
            onClick={() => router.push(`/help/gettingStarted`)}
          >
            <h2>Getting Started</h2>
          </Grid>
          {/* Route to help category 'Account/Profile' page */}
          <Grid
            className="help-menu-button"
            sx={{ border: "solid white 2px", padding: "30px" }}
            onClick={() => router.push(`/help/accountProfile`)}
          >
            <h2>Account / Profile</h2>
          </Grid>
          {/* Route to help category 'Troubleshooting' page */}
          <Grid
            className="help-menu-button"
            sx={{ border: "solid white 2px", padding: "30px" }}
            onClick={() => router.push(`/help/troubleshooting`)}
          >
            <h2>Troubleshooting</h2>
          </Grid>
          {/* Route to help category 'Course Taking' page */}
          <Grid
            className="help-menu-button"
            sx={{ border: "solid white 2px", padding: "30px" }}
            onClick={() => router.push(`/help/courseTaking`)}
          >
            <h2>Course Taking</h2>
          </Grid>
          {/* Route to help category 'Purchases/Refunds' page */}
          <Grid
            className="help-menu-button"
            sx={{ border: "solid white 2px", padding: "30px" }}
            onClick={() => router.push(`/help/purchasesRefunds`)}
          >
            <h2>Purchases / Refunds</h2>
          </Grid>
        </Grid>
      </Grid>
      <FooterC />
    </Grid>
  );
};

export async function getStaticProps() {
  // Get cart content
  const cartResponse = await IndexAPI.get(`/cart`);

  // Provide the cart quantity as a prop to te help page
  return {
    props: {
      cartQty: cartResponse.data.data.cart.length,
    },
    revalidate: 1,
  };
}

export default Help;
