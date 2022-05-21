import IndexAPI from "../../apis/indexAPI";
import { useRouter } from "next/router";
import MainNav from "../../components/users/mainNav";
import PagesNav from "../../components/users/pagesNav";
import FooterC from "../../components/footer";
import { Grid } from "@mui/material";

interface IHelp {
  cartQty: number | null | undefined;
}
const Help = (props: IHelp) => {
  const router = useRouter();

  return (
    <Grid>
      <MainNav cartQty={props.cartQty} />
      <PagesNav />
      <Grid>
        <Grid>
          <h1 className="main-title">help</h1>
        </Grid>
        <Grid className="gallery-menu">
          <Grid
            className="help-menu-button"
            sx={{ border: "solid white 2px", padding: "30px" }}
            onClick={() => router.push(`/help/gettingStarted`)}
          >
            <h2>Getting Started</h2>
          </Grid>
          <Grid
            className="help-menu-button"
            sx={{ border: "solid white 2px", padding: "30px" }}
            onClick={() => router.push(`/help/accountProfile`)}
          >
            <h2>Account / Profile</h2>
          </Grid>
          <Grid
            className="help-menu-button"
            sx={{ border: "solid white 2px", padding: "30px" }}
            onClick={() => router.push(`/help/troubleshooting`)}
          >
            <h2>Troubleshooting</h2>
          </Grid>
          <Grid
            className="help-menu-button"
            sx={{ border: "solid white 2px", padding: "30px" }}
            onClick={() => router.push(`/help/courseTaking`)}
          >
            <h2>Course Taking</h2>
          </Grid>
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
  const cartResponse = await IndexAPI.get(`/cart`);

  return {
    props: {
      cartQty: cartResponse.data.data.cart.length,
    },
    revalidate: 1,
  };
}

export default Help;
