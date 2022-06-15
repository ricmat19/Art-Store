/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";

//Add to cart props interface
interface IAddToCart {
  selectedEvent: {
    title: string;
  };
}

//Add to Cart functional component for events
const AddToCart = (props: IAddToCart) => {
  //   const [event] = useState(props.event);
  //   const [uniqueEvent] = useState(props.uniqueEvent);

  //useEffect to trigger a re-render on prop change
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(props);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [props]);

  //NextJS router
  const router = useRouter();

  //Add to cart component for events
  return (
    <Grid>
      <Grid>
        <form>
          <Grid>
            <h1 className="header">Item Added</h1>
            {/* Notification that the item has been added to the cart */}
            <Grid>
              {props.selectedEvent.title} has
              {/* {!uniqueEvent ? "already" : ""}  */}
              been added to your cart.
            </Grid>
            <Grid className="grid two-column-div">
              {/* Button routing to the store page */}
              <button className="added-button" onClick={() => router.push("/")}>
                continue shopping
              </button>
              {/* Button routing to the cart page */}
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
