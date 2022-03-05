/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import IndexAPI from "../../../apis/indexAPI";
import { IProduct } from "../../../interfaces";

interface IProducts {
  updateItem: string;
  products: IProduct[];
  setProducts: () => void;
}

const AdminUpdateProduct = (props: IProducts) => {
  const [, setProducts] = useState<IProduct[]>([]);
  const [image, setImage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [info, setInfo] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props.updateItem !== "") {
          const response = await IndexAPI.get(
            `/admin/update/${props.updateItem}`
          );
          setTitle(response.data.data.item.title);
          setType(response.data.data.item.product);
          setPrice(response.data.data.item.price);
          setInfo(response.data.data.item.info);
          setQuantity(response.data.data.item.qty);

          if (response.data.data.item.imagekey !== null) {
            let imagesResponse = await IndexAPI.get(
              `/images/${response.data.data.item.imagekey}`,
              {
                responseType: "arraybuffer",
              }
            ).then((response) =>
              Buffer.from(response.data, "binary").toString("base64")
            );

            setImage(`data:image/png;base64,${imagesResponse}`);
          }

          setProducts(response.data.data.item);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [props]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await IndexAPI.put(`/admin/update/${props.updateItem}`, {
        title,
        type,
        quantity,
        price,
        info,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <div className="align-center">
        <h1>admin</h1>
      </div>
      <div className="admin-item-div">
        <div className="admin-image-div">
          <div className="justify-center">
            <img className="big-image" src={image} alt="product" />
          </div>
        </div>
        <form className="admin-form" action="/routes/admin.js" method="POST">
          <div className="grid">
            <h1>Update</h1>
          </div>
          <div className="admin-form-field">
            <label className="align-left" htmlFor="title">
              Title:
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name="name"
              required
            />
          </div>
          <div className="admin-form-field">
            <div>
              <label className="align-left" htmlFor="product">
                Type:
              </label>
            </div>
            <div className="radio-div">
              <div>
                <label className="radio">2D Print</label>
                <input
                  value={type}
                  onChange={() => setType("print")}
                  type="radio"
                  name="product"
                />
              </div>
              <div>
                <label className="radio">3D Model</label>
                <input
                  value={type}
                  onChange={() => setType("model")}
                  type="radio"
                  name="product"
                />
              </div>
              <div>
                <label className="radio">comic</label>
                <input
                  value={type}
                  onChange={() => setType("comic")}
                  type="radio"
                  name="product"
                  required
                />
              </div>
            </div>
          </div>
          <div className="admin-form-field">
            <label className="align-left" htmlFor="qty">
              Quantity:
            </label>
            <input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              type="number"
              name="quantity"
              required
            />
          </div>
          <div className="admin-form-field">
            <label className="align-left" htmlFor="price">
              Price:
            </label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              name="name"
              required
            />
          </div>
          <div className="admin-form-field">
            <label className="align-left" htmlFor="info">
              Info:
            </label>
            <textarea
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              name="message"
              rows={5}
              required
            ></textarea>
          </div>
          {/* <div className="admin-form-field">
              <label className="align-left" htmlFor="primaryImage">
                Primary:
              </label>
              <input
                onChange={(e) => setPrimaryImage(e.target.value)}
                type="checkbox"
                name="primaryImage"
              />
            </div> */}
          <div className="admin-form-button">
            <div></div>
            <div className="text-center">
              <div>
                <button onClick={handleSubmit} type="submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

AdminUpdateProduct.propTypes = {
  updateItem: PropTypes.string,
};

export default AdminUpdateProduct;
