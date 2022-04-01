/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";

const AddToCart = (props: any) => {
  const [addedModal] = useState(props.modalStatus);
  const [event] = useState(props.event);
  const [uniqueEvent] = useState(props.uniqueEvent);

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
              {event.title} has {!uniqueEvent ? "already" : ""} been added to
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
