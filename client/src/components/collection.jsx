import React, {useContext, useEffect, useState} from 'react';
import {useParams, useHistory} from "react-router-dom";
import CollectionAPI from '../apis/collectionAPI';
import {CollectionContext} from '../context/collectionContext';
import CartModalC from './cartModal';
import HeaderC from './header';
import FooterC from './footer';
import ImagesC from './images';

const CollectionC = (props) => {

    const {product} = useParams();
    const {collection, setCollection} = useContext(CollectionContext);
    const {images, setImages} = useContext(CollectionContext);

    let history = useHistory();

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                const productResponse = await CollectionAPI.get(`/collection/${product}`);
                setCollection(productResponse.data.data.collection);
                const imagesResponse = await CollectionAPI.get(`/images/${productResponse.data.data.collection[0].imagekey}`);
                setImages(imagesResponse);
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

    const imageURL = (imagekey) =>{
        return(`/images/${imagekey}`);
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
                                    <ImagesC classes="collection-thumbnail" source={imageURL(item.imagekey)}/>
                                </div>
                                <div className="collection-thumbnail-footer">
                                    <div className="Title">{item.title}</div>
                                    <div className="Price">{item.price}</div>
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