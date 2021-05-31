import React, {useContext, useEffect} from 'react';
import {useParams} from "react-router-dom";
import collectionAPI from '../apis/collectionAPI';
import { CollectionContext } from '../context/collectionContext';
import ItemC from './item';

const CollectionC = (props) => {

    const {product} = useParams();
    const {collection, setCollection} = useContext(CollectionContext);

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                const response = await collectionAPI.get(`/collection/${product}`);
                setCollection(response.data.data.products);
                console.log(response);
            }catch(err){
                console.log(err);
            }
        }

        fetchData();
    }, []);

    return(
        <div>
            <div className="main-body">
                <div className="center subtitle-div">
                    <a className="subtitle-anchor active" href="/collection/comic"><h1 className="subtitle">COMICS</h1></a>
                    <a className="subtitle-anchor" href="/collection/print"><h1 className="subtitle">PRINTS</h1></a>
                    <a className="subtitle-anchor" href="/collection/personal-work"><h1 className="subtitle">PERSONAL</h1></a>
                </div>
                <div className="collection-menu">
                    <ItemC/>
                </div>
            </div>
        </div>
    )
}

export default CollectionC;