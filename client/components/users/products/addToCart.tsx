/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";

const AddToCart = (props: any) => {
  const [addedModal] = useState(props.modalStatus);
  const [product] = useState(props.product);
  const [uniqueItem] = useState(props.uniqueItem);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(props.modalStatus);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [props]);

  const router = useRouter();

  return (
    <Grid>
      <Grid className={addedModal}>
        <form>
          <Grid className="added-content modal-content">
            <h1 className="header">Item Added</h1>
            <Grid>
              {product.title} has {!uniqueItem ? "already" : ""} been added to
              your cart.
            </Grid>
            <Grid className="grid two-column-div">
              <button className="added-button" onClick={() => router.push("/")}>
                continue shopping
              </button>
              <button
                className="added-button"
                onClick={() => router.push("/cart")}
              >
                view cart
              </button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default AddToCart;
