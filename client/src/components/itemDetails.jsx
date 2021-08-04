import React, {useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router';
import CollectionAPI from '../apis/collectionAPI';
import { CollectionContext } from '../context/collectionContext';
import CartModalC from './cartModal';
import HeaderC from './header';
import FooterC from './footer';

const ItemDetailsC = (props) => {

    const {product, id} = useParams();
    const {selectedItem, setSelectedItem} = useContext(CollectionContext);

    const [imageBuffer, setImageBuffer] = useState("../../images/loading.svg");

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                const productResponse = await CollectionAPI.get(`/collection/${product}/${id}`);

                let imagesResponse = await CollectionAPI.get(`/images/${productResponse.data.data.product.imagekey}`, {
                    responseType: 'arraybuffer'
                })
                .then(response => Buffer.from(response.data, 'binary').toString('base64'));
                    
                setImageBuffer(`data:image/png;base64,${imagesResponse}`)
                setSelectedItem(productResponse.data.data.product);


            }catch(err){
                console.log(err);
            }
        }

        fetchData();
    }, []);

    const [qty, setQty] = useState(5);

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

    // const imageURL = async (imagekey) =>{

    //     const imagesResponse = await CollectionAPI.get(`/images/${imagekey}`, {
    //         responseType: 'arraybuffer'
    //     })
    //     .then(response => Buffer.from(response.data, 'binary').toString('base64'))
    //     console.log(imagesResponse)
    //     setImages(imagesResponse);
    // }

    // onChange={imageURL(selectedItem.imagekey)}

    return(
        <div>
            <CartModalC/>
            <HeaderC/>
            <div className="main-body item-details">
                <div className="item-images">
                    <div className="image-div">
                        <div className="big-image-div">
                            <img className="big-image" src={imageBuffer} alt="main"/>
                        </div>
                        {/* <div className="image-thumbnails">
                            <img className="image-thumbnail" src="" alt="thumbnail"/>
                            <img className="image-thumbnail" src="" alt="thumbnail"/>
                            <img className="image-thumbnail" src="" alt="thumbnail"/>
                        </div> */}
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
            <FooterC/>
        </div>
    )
}

export default ItemDetailsC;