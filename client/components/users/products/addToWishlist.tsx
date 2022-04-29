/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useRouter } from "next/router";
import { Grid, MenuItem, Select } from "@mui/material";

const AddToWishlist = (props: any) => {
  const [addedModal] = useState(props.modalStatus);
  const [collection, setCollection] = useState("");
  const [product] = useState(props.product);
  const [uniqueItem] = useState(props.uniqueItem);

  const router = useRouter();

  const handleChange = (event: any) => {
    setCollection(event.target.value);
  };

  return (
    <Grid>
      <Grid className={addedModal}>
        <form>
          <Grid className="added-content modal-content">
            <h1 className="header">Add to Wishlist</h1>
            <Grid>
              <Select
                value={collection}
                onChange={handleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                className="type-selector"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"print"}>print</MenuItem>
                {props.collections.map((collection: any) => {
                  return (
                    <Grid key={collection}>
                      <MenuItem value={collection}>{collection}</MenuItem>
                    </Grid>
                  );
                })}
              </Select>
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

export default AddToWishlist;
