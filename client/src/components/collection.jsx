import React, {useContext, useEffect} from 'react';
import {useParams} from "react-router-dom";
import CollectionAPI from '../apis/collectionAPI';
import {CollectionContext} from '../context/collectionContext';

const CollectionC = (props) => {

    const {product} = useParams();
    const {collection, setCollection} = useContext(CollectionContext);

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                const response = await CollectionAPI.get(`/collection/${product}`);
                setCollection(response.data.data.collection);
                console.log(response.data.data.collection);
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
                    <a className="subtitle-anchor" href="/collection/comic"><p className="nav-title">comics</p></a>
                    <a className="subtitle-anchor" href="/collection/print"><p className="nav-title">print</p></a>
                    <a className="subtitle-anchor" href="/collection/personal-work"><p className="nav-title">personal</p></a>
                </div>
                <div className="collection-menu">
                    {collection && collection.map(item => {
                        return(
                            <div key={item.id}>
                                <a href="/collection/comic/:id">
                                    <div className="collection-item">
                                        <img className="collection-thumbnail" src="" alt="thumbnail"/>
                                    </div>
                                    <div className="collection-thumbnail-footer">
                                        <div className="Title">{item.title}</div>
                                        <div className="Price">{item.price}</div>
                                    </div>
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default CollectionC;