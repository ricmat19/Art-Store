import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import collectionAPI from '../apis/collectionAPI';

const ItemDetailsC = (props) => {

    const {product, id} = useParams();

    const [title, setTitle] = useState("");
    const [images, setImages] = useState("");
    const [price, setPrice] = useState("");
    const [info, setInfo] = useState("");

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                const response = await collectionAPI.get(`/collection/${product}/${id}`);
                setTitle(response.data.data.product.title);
                setImages(response.data.data.product.images);
                setPrice(response.data.data.product.price);
                setInfo(response.data.data.product.info);
            }catch(err){
                console.log(err);
            }
        }

        fetchData();
    }, []);

    let [cartQty, setCartQty] = useState("");

    cartQty = 0;
    const displayCartModal = async () => {
        if(cartQty > 0){
            
        }else{
            
        }
    }

    return(
        <div>
            <div className="main-body item-details">
                <div className="item-images">
                    <div className="image-div">
                        <div className="big-image-div">
                            <img className="big-image" src="../../logo512.png" alt="main"/>
                        </div>
                        <div className="image-thumbnails">
                            <img className="image-thumbnail" src="../../logo512.png" alt="thumbnail"/>
                            <img className="image-thumbnail" src="../../logo512.png" alt="thumbnail"/>
                            <img className="image-thumbnail" src="../../logo512.png" alt="thumbnail"/>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="info-div">
                        <h1 className="image-title">Title{product.title}</h1>
                        <div className="info-detail-div">
                            <label>price</label>
                            <p className="no-margin">$0.00{product.price}</p>
                        </div>
                        <div className="info-detail-div">
                            <label>info</label>
                            <p className="no-margin">Test Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos nemo incidunt voluptas quae illo consectetur nihil quia aliquid tenetur esse. Cum, quia! Optio, est. Fuga at aliquam accusamus maiores necessitatibus. {product.info}</p>
                        </div>
                    </div>
                    <div className="info-div">
                    <div className="info-detail-div">
                            <label>quantity</label>
                            <input type="number" name="quantity"/>
                        </div>
                    </div>
                    <div className="cart-options">
                        <button>Add To Cart</button>
                        <button onClick={displayCartModal}>Order Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemDetailsC;