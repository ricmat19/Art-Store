import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import CollectionAPI from '../../apis/collectionAPI';
import {CollectionContext} from '../../context/collectionContext';
import AdminHeaderC from './adminHeader';
import FooterC from '../footer';

const AdminCollectionC = (props) => {

    const {product} = useParams();
    const {collection, setCollection} = useContext(CollectionContext);
    const [pageNumber, setPageNumber] = useState(0);

    const itemsPerPage = 9;
    const pagesVisted = pageNumber * itemsPerPage;

    const displayItems = collection.slice(pagesVisted, pagesVisted + itemsPerPage).map((item) => {
        return(
            <div key={item.id}>
                <a href="/collection/:product">
                    <div className="collection-item">
                        <img className="collection-thumbnail" src={item.imageBuffer} alt="thumbnail"/>
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
    });

    const pageCount = Math.ceil(collection.length / itemsPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    }

    let history = useHistory();

    let productResponse;
    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                const productResponse = await CollectionAPI.get(`/admin/collection/${product}`);

                for(let i=0; i < productResponse.data.data.collection.length; i++){
                    
                    if(productResponse.data.data.collection[i].imagekey !== null){
                        let imagesResponse = await CollectionAPI.get(`/images/${productResponse.data.data.collection[i].imagekey}`, {
                            responseType: 'arraybuffer'
                        })
                        .then(response => Buffer.from(response.data, 'binary').toString('base64'));
    
                        productResponse.data.data.collection[i].imageBuffer = `data:image/png;base64,${imagesResponse}`;
                    }
                    
                }

                setCollection(productResponse.data.data.collection);
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
            history.push(`/admin/update/${id}`)
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div>
            <AdminHeaderC/>
            <div className="main-body">
                <div className="center subtitle-div">
                    <a className="subtitle-anchor" href="/admin/collection/2D"><p className="title">2D art</p></a>
                    <a className="subtitle-anchor" href="/admin/collection/3D"><p className="title">3D art</p></a>
                    <a className="subtitle-anchor" href="/admin/collection/comic"><p className="title">comics</p></a>
                </div>
                <div className="collection-menu">
                    {displayItems}
                </div>
            </div>
            <FooterC/>
        </div>
    )
}

export default AdminCollectionC;