/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import { Form } from "formik";

const AddToCart = (props: any) => {
  //   const [event] = useState(props.event);
  //   const [uniqueEvent] = useState(props.uniqueEvent);

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
      <Grid>
        <Form>
          <Grid>
            <h1 className="header">Item Added</h1>
            <Grid>
              {props.selectedEvent.title} has
              {/* {!uniqueEvent ? "already" : ""}  */}
              been added to your cart.
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
        </Form>
      </Grid>
    </Grid>
  );
};

export default AddToCart;
