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
  console.log(productTypes);

  const productPageLinks = productTypes.map((product: any) => {
    return (
      <Link
        passHref
        key={product}
        href={`/products/${product}`}
      >
        <h1>{product}s</h1>
      </Link>
    );
  });

  return (
    <Grid container sx={{ justifyContent: "center", gap: "25px", mt: "10px" }}>
      {/* <a href="/products/print">
        <h1>2D prints</h1>
      </a>
      <a href="/products/model">
        <h1>3D models</h1>
      </a>
      <a href="/products/painting">
        <h1>paintings</h1>
      </a>
      <a href="/products/sculpture">
        <h1>sculptures</h1>
      </a>
      <a href="/products/book">
        <h1>books</h1>
      </a>
      <a href="/products/comic">
        <h1>comics</h1>
      </a> */}
      {productPageLinks}
    </Grid>
  );
};

export default ProductsNav;
