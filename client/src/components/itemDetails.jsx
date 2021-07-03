import React, {useState, useEffect, useContext} from 'react';
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
                console.log(response.data.data.product.title);
                console.log(response.data.data.product.images);
                console.log(response.data.data.product.price);
                console.log(response.data.data.product.info);
            }catch(err){
                console.log(err);
            }
        }

        fetchData();
    }, []);

    return(
        <div>
            <div className="main-body item-details">
                <div className="item-images">
                    <div className="image">
                        <h1 className="image-title" value={product.title}></h1>
                        <div className="big-image-div">
                            <img className="big-image" alt="main"/>
                        </div>
                        <div className="image-thumbnails">
                            <img className="image-thumbnail" src="" alt="thumbnail"/>
                            <img className="image-thumbnail" src="" alt="thumbnail"/>
                            <img className="image-thumbnail" src="" alt="thumbnail"/>
                        </div>
                    </div>
                    <div className="price" value={product.price}></div>
                    <div className="info" value={product.info}></div>
                </div>
                <div className="cart-options">
                    <button>Add To Cart</button>
                    <button>Order Now</button>
                </div>
            </div>
        </div>
    )
}

export default ItemDetailsC;