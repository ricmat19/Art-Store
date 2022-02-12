import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import IndexAPI from "../../../apis/indexAPI";

interface IProducts {
  deleteItem: string,
  products: [],
  setProducts: () => void,
}

const AdminDeleteProductC = (props: IProducts) => {
  const [product, setProduct] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props.deleteItem !== "") {
          const response = await IndexAPI.get(
            `/admin/update/${props.deleteItem}`
          );
          setProduct(response.data.data.item.title);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [props]);

  const handleDelete = async (id: any) => {
    try {
      await IndexAPI.delete(`/admin/delete/${props.deleteItem}`);
      console.log(id)
      // props.setProducts(
      //   props.products.filter((item: { id: any; }) => {
      //     return item.id !== id; 
      //   })
      // );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <div className="admin-item-div">
        <form className="admin-form" action="/routes/admin.js" method="POST">
          <div className="align-center">
            <h1>Are you sure you want to delete &quot;{product}&quot; ?</h1>
          </div>
          <button onClick={handleDelete} type="submit">
            Delete
          </button>
        </form>
      </div>
    </div>
  );
};

AdminDeleteProductC.propTypes = {
  deleteItem: PropTypes.string,
  products: PropTypes.array,
  setProducts: PropTypes.func,
};

export default AdminDeleteProductC;
