import IndexAPI from "../../apis/indexAPI";
import FooterC from "../../components/footer";
import MainNav from "../../components/users/mainNav";
import PagesNav from "../../components/users/pagesNav";
import { Grid } from "@mui/material";

const AdminThreadsC = (props: any) => {
  //   const displayItem = async (event: string) => {
  //     try {
  //       navigation(`/admin/events/${event}`);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  return (
    <Grid>
      <MainNav cartQty={props.cartQty} />
      <PagesNav />
      <Grid className="main-body">
        <Grid className="collection-menu">{}</Grid>
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

export default AdminThreadsC;
