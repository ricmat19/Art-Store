import { Grid } from "@mui/material";
import { useState } from "react";
import Link from "next/link";

//Product navigation prop interface
interface IProduct {
  product: string;
}
interface IProductsNav {
  products: IProduct[];
}

//Product navigation functional component
const ProductsNav = (props: IProductsNav) => {
  //Product navigation states
  const [products] = useState(props.products);

  //Create a array of the different product types provided
  const productTypes: any[] = [];
  for (let i = 0; i < products.length; i++) {
    if (!productTypes.includes(products[i].product)) {
      productTypes.push(products[i].product);
    }
  }

  //Creates a link for each product type provided
  const productPageLinks = productTypes.map((product: any) => {
    return (
      <Link passHref key={product} href={`/products/${product}`}>
        <h1 className="main-title pointer">{product}s</h1>
      </Link>
    );
  });

  //Product navigation component
  return (
    <Grid container sx={{ justifyContent: "center", gap: "25px", mt: "10px" }}>
      {/* Display the list of product links */}
      {productPageLinks}
    </Grid>
  );
};

export default ProductsNav;
