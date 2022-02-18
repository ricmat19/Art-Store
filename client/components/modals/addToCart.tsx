/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const AddToCartC = (props: any) => {
  const [addedModal] = useState(props.modalStatus);
  const [selectedProduct] = useState(props.selectedProduct);
  const [uniqueItem] = useState(props.uniqueItem);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(props.modalStatus)
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [props]);

  const router = useRouter();

  return (
    <div>
      {/* Added to Cart */}
      <div className={addedModal}>
        <form>
          <div
            // ref={addedRef}
            className="added-content modal-content"
          >
            <h1 className="header">Item Added</h1>
            <div>
              {selectedProduct.title} has {!uniqueItem ? "already" : ""} been
              added to your cart.
            </div>
            <div className="grid two-column-div">
              <button className="added-button" onClick={() => router.push("/")}>
                continue shopping
              </button>
              <button
                className="added-button"
                onClick={() => router.push("/cart")}
              >
                view cart
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddToCartC;
