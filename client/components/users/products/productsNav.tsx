import { Grid } from "@mui/material";
import { useState } from "react";
import Link from "next/link";

const ProductsNav = (props: any) => {
  const [products] = useState(props.products);

  const productTypes: any[] = [];
  for (let i = 0; i < products.length; i++) {
    if (!productTypes.includes(products[i].product)) {
      productTypes.push(products[i].product);
    }
  }

  const productPageLinks = productTypes.map((product: any) => {
    return (
      <Link passHref key={product} href={`/products/${product}`}>
        <h1 className="main-title pointer">{product}s</h1>
      </Link>
    );
  });

  return (
    <Grid container sx={{ justifyContent: "center", gap: "25px", mt: "10px" }}>
      {productPageLinks}
    </Grid>
  );
};

export default ProductsNav;
