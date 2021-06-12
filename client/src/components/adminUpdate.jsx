import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import CollectionAPI from '../apis/collectionAPI';
import {CollectionContext} from '../context/collectionContext';

const AdminUpdateC = (props) => {

    const {id} = useParams();
    const {collection} = useContext(CollectionContext);
    const [title, setTitle] = useState("");
    const [product, setProduct] = useState("");
    const [price, setPrice] = useState("");
    const [info, setInfo] = useState("");

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                const response = await CollectionAPI.get(`/admin/collection/${id}`);
                console.log(response.data.data.collection);
                setTitle(response.data.data.collection.title);
                setProduct(response.data.data.collection.product)
                setPrice(response.data.data.collection.price)
                setInfo(response.data.data.collection.info)
            }catch(err){
                console.log(err);
            }
        }

        fetchData();
    }, []);

    return(
        <div>
            <div className="main-body">
                <div className="center">
                    <h1 className="subtitle">ADMIN</h1>
                </div>
                <div className="admin-item-div">
                    <div className="admin-image-div">
                        <div className="image">
                            <div className="big-image-div">
                                <img className="big-image" src="" alt="item"/>
                            </div>
                        </div>
                    </div>
                    <form action="/routes/admin.js" method="POST">
                        <div className="admin-form">
                            <label></label>
                            <h1 className="form-title">Update</h1>
                        </div>
                        <div className="admin-form">
                            <label htmlFor="title">Title</label>
                            <input value={title} onChange={e => setTitle(e.target.value)} type="text" name="name" className="form-control" required/>
                        </div>
                        <div className="admin-form">
                            <div>
                                <label htmlFor="product" className="radio-label">Type:</label>
                            </div>
                            <div className="radio-div">
                                <div>
                                    <label className="radio">Comic</label>
                                    <input value={product} onChange={e => setProduct("comic")} type = "radio" name = "product" required/>
                                </div>
                                <div>
                                    <label className="radio">Print</label>
                                    <input value={product} onChange={e => setProduct("print")} type = "radio" name = "product"/>
                                </div>
                                <div>
                                    <label className="radio">Personal</label>
                                    <input value={product} onChange={e => setProduct("personal")} type = "radio" name = "product"/>
                                </div>
                            </div>
                        </div>
                        <div className="admin-form">
                            <label htmlFor="price">Price</label>
                            <input value={price} onChange={e => setPrice(e.target.value)} type="text" name="name" className="form-control" required/>
                        </div>
                        <div className="admin-form">
                            <label htmlFor="info">Info</label>
                            <textarea value={info} onChange={e => setInfo(e.target.value)} name="message" rows="5" required></textarea>
                        </div>
                        <div className="admin-form">
                                <div></div>
                            <div className="text-center">
                                <div>
                                    <button type="submit" className="btn form-button">Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminUpdateC;


          
