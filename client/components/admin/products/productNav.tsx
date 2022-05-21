import { Grid } from "@mui/material";
import { useState } from "react";
import Link from "next/link";

interface IAdminProductsNav {
  activeProducts: any;
}

const AdminProductsNav = (props: IAdminProductsNav) => {
  const [activeProducts] = useState(props.activeProducts);

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

  return (
    <Grid container sx={{ justifyContent: "center", gap: "25px", mt: "10px" }}>
      {productPageLinks}
    </Grid>
  );
};

export default AdminProductsNav;
