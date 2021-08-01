import React, {useContext, useEffect, useState} from 'react';
import {useParams, useHistory} from "react-router-dom";
import CollectionAPI from '../apis/collectionAPI';
import {CollectionContext} from '../context/collectionContext';
import CartModalC from './cartModal';
import HeaderC from './header';
import FooterC from './footer';

const CollectionC = (props) => {

    const {product} = useParams();
    const {collection, setCollection} = useContext(CollectionContext);
    const [images, setImages] = useState([]);


    let history = useHistory();

    let productResponse;
    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                productResponse = await CollectionAPI.get(`/collection/${product}`);

                for(let i=0; i < productResponse.data.data.collection.length; i++){
 
                    let imagesResponse = await CollectionAPI.get(`/images/${productResponse.data.data.collection[i].imagekey}`, {
                        responseType: 'arraybuffer'
                    })
                    .then(response => Buffer.from(response.data, 'binary').toString('base64'));

                    productResponse.data.data.collection[i].imageBuffer = imagesResponse;
                    
                }
                console.log(productResponse.data.data.collection);
                setCollection(productResponse.data.data.collection);
            }catch(err){
                console.log(err);
            }
        }

        fetchData();
    }, []);

    const displayItem = async (product, id) => {
        try{
            history.push(`/collection/${product}/${id}`)
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div>
            <CartModalC/>
            <HeaderC/>
            <div className="main-body">
                <div className="center subtitle-div">
                    <a className="subtitle-anchor" href="/collection/comic"><p className="title">comics</p></a>
                    <a className="subtitle-anchor" href="/collection/print"><p className="title">print</p></a>
                    <a className="subtitle-anchor" href="/collection/personal"><p className="title">personal</p></a>
                </div>
                <div className="collection-menu">
                    {collection && collection.map(item => {
                        return(
                            <div className="collection-item-div" key={item.id} onClick={() => displayItem(item.product, item.id)}>
                                <div className="collection-item">
                                    <img className="collection-thumbnail" src={`data:image/png;base64,${item.imageBuffer}`}/>
                                </div>
                                <div className="collection-thumbnail-footer">
                                    <div className="Title">{item.title}</div>
                                    <div className="Price">${item.price}.00</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <FooterC/>
        </div>
    )
}

export default CollectionC;