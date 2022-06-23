import { Grid } from "@mui/material";
import Link from "next/link";
import { IProduct } from "../../../interfaces";

interface IProductsNav {
  products: IProduct[];
}

//Product navigation functional component
const ProductsNav = (props: IProductsNav) => {

  //Create a array of the different product types provided
  const productTypes: string[] = [];
  for (let i = 0; i < props.products.length; i++) {
    if (!productTypes.includes(props.products[i].product)) {
      productTypes.push(props.products[i].product);
    }
  }

  //Creates a link for each product type provided
  const productPageLinks = productTypes.map((product: string) => {
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
