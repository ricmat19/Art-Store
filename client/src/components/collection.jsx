import React, {useContext, useEffect} from 'react';
import {useParams, useHistory} from "react-router-dom";
import CollectionAPI from '../apis/collectionAPI';
import {CollectionContext} from '../context/collectionContext';

const CollectionC = (props) => {

    const {product} = useParams();
    const {collection, setCollection} = useContext(CollectionContext);

    let history = useHistory();

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                const response = await CollectionAPI.get(`/collection/${product}`);
                setCollection(response.data.data.collection);
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
                                    <img className="collection-thumbnail" src="../../logo512.png" alt="thumbnail"/>
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
        </div>
    )
}

export default CollectionC;