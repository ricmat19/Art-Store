import { Grid } from "@mui/material";
import { useState } from "react";
import Link from "next/link";

//Admin product navigation prop interface
interface IAdminProductsNav {
  activeProducts: IProduct[];
}

//Admin product navigation functional component
const AdminProductsNav = (props: IAdminProductsNav) => {
  //Admin product navigation states
  const [activeProducts] = useState(props.activeProducts);

  //Creates a product navigation link for each existing product subject
  let productPageLinks;
  if (activeProducts !== undefined) {
    productPageLinks = activeProducts.map((product: string) => {
      return (
        <Link passHref key={product} href={`/admin/products/${product}`}>
          <h1 className="main-title pointer">{product}</h1>
        </Link>
      );
    });
  } else {
    return <Grid></Grid>;
  }

  //Admin product navigation component
  return (
    //Maps out the list of product subjects as navigation links
    <Grid container sx={{ justifyContent: "center", gap: "25px", mt: "10px" }}>
      {productPageLinks}
    </Grid>
  );
};

export default AdminProductsNav;
