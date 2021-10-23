import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CollectionAPI from "../../apis/collectionAPI";
import { CollectionContext } from "../../context/collectionContext";
import AdminHeaderC from "../admin/header";
import FooterC from "../footer";

const AdminUpdateC = () => {
  const { id } = useParams();
  const { setCollection } = useContext(CollectionContext);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [info, setInfo] = useState("");
  const [primaryImage, setPrimaryImage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CollectionAPI.get(`/admin/update/${id}`);
        setTitle(response.data.data.item.title);
        setType(response.data.data.item.product);
        setPrice(response.data.data.item.price);
        setInfo(response.data.data.item.info);
        setQuantity(response.data.data.item.qty);
        setPrimaryImage(response.data.data.item.primaryimage);

        if (response.data.data.item.imagekey !== null) {
          let imagesResponse = await CollectionAPI.get(
            `/images/${response.data.data.item.imagekey}`,
            {
              responseType: "arraybuffer",
            }
          ).then((response) =>
            Buffer.from(response.data, "binary").toString("base64")
          );

          setImage(`data:image/png;base64,${imagesResponse}`);
        }

        setCollection(response.data.data.item);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(primaryImage);

      const update = await CollectionAPI.put(`/admin/update/${id}`, {
        title,
        type,
        quantity,
        price,
        info,
        primaryImage,
      });

      setCollection(update);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <AdminHeaderC />
      <div className="main-body">
        <div className="center">
          <p className="title">admin</p>
        </div>
        <div className="admin-item-div">
          <div className="admin-image-div">
            <div className="image">
              <div className="big-image-div">
                <img className="big-image" src={image} alt="item" />
              </div>
            </div>
          </div>
          <form className="admin-form" action="/routes/admin.js" method="POST">
            <div className="admin-form-title">
              <p className="title">Update</p>
            </div>
            <div className="admin-form-field">
              <label className="admin-label" htmlFor="title">
                Title:
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                name="name"
                className="form-control"
                required
              />
            </div>
            <div className="admin-form-field">
              <div>
                <label className="admin-label" htmlFor="product">
                  Type:
                </label>
              </div>
              <div className="radio-div">
                <div>
                  <label className="radio">2D art</label>
                  <input
                    value={type}
                    onChange={() => setType("2D")}
                    type="radio"
                    name="product"
                  />
                </div>
                <div>
                  <label className="radio">3D art</label>
                  <input
                    value={type}
                    onChange={() => setType("3D")}
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
              <label className="admin-label" htmlFor="qty">
                Quantity:
              </label>
              <input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                type="number"
                name="quantity"
                className="form-control"
                required
              />
            </div>
            <div className="admin-form-field">
              <label className="admin-label" htmlFor="price">
                Price:
              </label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="text"
                name="name"
                className="form-control"
                required
              />
            </div>
            <div className="admin-form-field">
              <label className="admin-label" htmlFor="info">
                Info:
              </label>
              <textarea
                value={info}
                onChange={(e) => setInfo(e.target.value)}
                name="message"
                rows="5"
                required
              ></textarea>
            </div>
            <div className="admin-form-field">
              <label className="admin-label" htmlFor="primaryImage">
                Primary:
              </label>
              <input
                onChange={(e) => setPrimaryImage(e.target.value)}
                type="checkbox"
                name="primaryImage"
                className="form-control"
              />
            </div>
            <div className="admin-form-button">
              <div></div>
              <div className="text-center">
                <div>
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="btn form-button"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <FooterC />
    </div>
  );
};

export default AdminUpdateC;
