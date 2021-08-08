import React, {useContext, useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import CollectionAPI from '../../apis/collectionAPI';
import {CollectionContext} from '../../context/collectionContext';
import AdminHeaderC from '../admin/header';
import FooterC from '../footer';

const AdminUpdateC = (props) => {

    const {id} = useParams();
    const {collection, setCollection} = useContext(CollectionContext);
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [info, setInfo] = useState("");

    const titleInput = useRef(null);
    const typeInput = useRef(null);
    const quantityInput = useRef(null);
    const priceInput = useRef(null);
    const infoInput = useRef(null);

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                const response = await CollectionAPI.get(`/admin/update/${id}`);
                setTitle(response.data.data.product.title);
                setType(response.data.data.product.product);
                setPrice(response.data.data.product.price);
                setInfo(response.data.data.product.info);
                    
                if(response.data.data.product.imagekey !== null){
                    let imagesResponse = await CollectionAPI.get(`/images/${response.data.data.product.imagekey}`, {
                        responseType: 'arraybuffer'
                    })
                    .then(response => Buffer.from(response.data, 'binary').toString('base64'));

                    response.data.data.product.imageBuffer = `data:image/png;base64,${imagesResponse}`;
                }

                setCollection(response.data.data.product);
            }catch(err){
                console.log(err);
            }
        }

        fetchData();
    }, []);

    return(
        <div>
            <AdminHeaderC/>
            <div className="main-body">
                <div className="center">
                    <p className="title">admin</p>
                </div>
                <div className="admin-item-div">
                    <div className="admin-image-div">
                        <div className="image">
                            <div className="big-image-div">
                                <img className="big-image" src={collection.imageBuffer} alt="item"/>
                            </div>
                        </div>
                    </div>
                    <form className="admin-form" action="/routes/admin.js" method="POST">
                        <div className="admin-form-title">
                            <p className="title">Update</p>
                        </div>
                        <div className="admin-form-field">
                            <label className="admin-label" htmlFor="title">Title:</label>
                            <input value={title} onChange={e => setTitle(e.target.value)} type="text" name="name" className="form-control" required/>
                        </div>
                        <div className="admin-form-field">
                            <div>
                                <label className="admin-label" htmlFor="product">Type:</label>
                            </div>
                            <div className="radio-div">
                                <div>
                                    <label className=" radio">2D art</label>
                                    <input value={type} onChange={e => setType("2D")} type = "radio" name = "product"/>
                                </div>
                                <div>
                                    <label className=" radio">3D art</label>
                                    <input value={type} onChange={e => setType("3D")} type = "radio" name = "product"/>
                                </div>
                                <div>
                                    <label className=" radio">Comic</label>
                                    <input value={type} onChange={e => setType("comic")} type = "radio" name = "product" required/>
                                </div>
                            </div>
                        </div>
                        <div className="admin-form-field">
                            <label className="admin-label" htmlFor="price">Price:</label>
                            <input value={price} onChange={e => setPrice(e.target.value)} type="text" name="name" className="form-control" required/>
                        </div>
                        <div className="admin-form-field">
                            <label className="admin-label" htmlFor="info">Info:</label>
                            <textarea value={info} onChange={e => setInfo(e.target.value)} name="message" rows="5" required></textarea>
                        </div>
                        <div className="admin-form-button">
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
            <FooterC/>
        </div>
    )
}

export default AdminUpdateC;


          
