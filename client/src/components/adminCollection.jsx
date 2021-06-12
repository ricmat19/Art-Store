import React, {useContext, useEffect} from 'react';
import {useHistory, useParams} from "react-router-dom";
import CollectionAPI from '../apis/collectionAPI';
import {CollectionContext} from '../context/collectionContext';

const AdminCollectionC = (props) => {

    const {collection, setCollection} = useContext(CollectionContext);

    let history = useHistory();

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                const response = await CollectionAPI.get(`/admin/collection`);
                setCollection(response.data.data.collection);
                console.log(response);
            }catch(err){
                console.log(err);
            }
        }

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try{
            const response = await CollectionAPI.delete(`/admin/delete/${id}`);
            setCollection(collection.filter(item => {
               return item.id !== id;
            }))
        }catch(err){
            console.log(err);
        }
    }

    const handleUpdate = async (id) => {
        try{
            history.push(`/admin/collection/${id}`)
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div>
            <div className="main-body">
                <div className="center subtitle-div">
                    <a className="subtitle-anchor" href="/collection/comic"><h1 className="subtitle">COMICS</h1></a>
                    <a className="subtitle-anchor" href="/collection/print"><h1 className="subtitle">PRINTS</h1></a>
                    <a className="subtitle-anchor" href="/collection/personal-work"><h1 className="subtitle">PERSONAL</h1></a>
                </div>
                <div className="collection-menu">
                    {collection && collection.map(item => {
                        return(
                            <div key={item.id}>
                                <a href="/collection/comic">
                                    <div className="collection-item">
                                        <img className="collection-thumbnail" src="" alt="thumbnail"/>
                                    </div>
                                    <div className="collection-thumbnail-footer">
                                        <div className="Title">{item.title}</div>
                                        <div className="Price">{item.price}</div>
                                    </div>
                                </a>
                                <div className="admin-form">
                                    <div className="admin-collection-button-div text-center">
                                        <div>
                                            <button onClick={() => handleDelete(item.id)} className="btn form-button delete">Delete</button>
                                        </div>
                                        <div>
                                            <button onClick={() => handleUpdate(item.id)} type="submit" className="btn form-button">Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default AdminCollectionC;