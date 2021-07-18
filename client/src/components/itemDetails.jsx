import React, {useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router';
import CollectionAPI from '../apis/collectionAPI';
import { CollectionContext } from '../context/collectionContext';

const ItemDetailsC = (props) => {

    const {product, id} = useParams();
    const {selectedItem, setSelectedItem} = useContext(CollectionContext);

    const [title, setTitle] = useState("");
    const [images, setImages] = useState("");
    const [price, setPrice] = useState("");
    const [info, setInfo] = useState("");

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                const response = await CollectionAPI.get(`/collection/${product}/${id}`);
                setSelectedItem(response.data.data.product);
            }catch(err){
                console.log(err);
            }
        }

        fetchData();
    }, []);

    const [qty, setQty] = useState(null);

    const addToCart = async (e) => {
        e.preventDefault()
        try{

            const response = await CollectionAPI.post("/cart", {
                id: id,
                qty: qty
            })

            console.log(response.data);

        }catch(err){
            console.log(err);
        }
    }
    return(
        <div>
            <div className="main-body item-details">
                <div className="item-images">
                    <div className="image-div">
                        <div className="big-image-div">
                            <img className="big-image" src={selectedItem && selectedItem.images} alt="main"/>
                        </div>
                        <div className="image-thumbnails">
                            <img className="image-thumbnail" src="../../logo512.png" alt="thumbnail"/>
                            <img className="image-thumbnail" src="../../logo512.png" alt="thumbnail"/>
                            <img className="image-thumbnail" src="../../logo512.png" alt="thumbnail"/>
                        </div>
                    </div>
                </div>
                <form className="item-form" method="POST" action="/cart">
                    <div className="info-div">
                        <p className="title">{selectedItem && selectedItem.title}</p>
                        <div className="info-detail-div">
                            <label>price</label>
                            <p className="no-margin">{selectedItem && selectedItem.price}</p>
                        </div>
                        <div className="info-detail-div">
                            <label>info</label>
                            <p className="no-margin">{selectedItem && selectedItem.info}</p>
                        </div>
                    </div>
                    <div className="info-div">
                    <div className="info-detail-div">
                            <label>quantity</label>
                            <input type="number" name="quantity" placeholder="0" onChange={(e) => {setQty(e.target.value)}}/>
                        </div>
                    </div>
                    <div className="cart-options">
                        <button onClick={addToCart}>Add To Cart</button>
                        <button>Order Now</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ItemDetailsC;