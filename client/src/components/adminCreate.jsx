import React, { useContext, useState, useRef} from 'react';
import CollectionAPI from "../apis/collectionAPI";
import {CollectionContext} from '../context/collectionContext';

const AdminCreateC = (props) => {

    const{createItem} = useContext(CollectionContext);

    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [images, setImages] = useState(null);
    const [price, setPrice] = useState("");
    const [info, setInfo] = useState("");

    const titleInput = useRef(null);
    const typeInput = useRef(null);
    const priceInput = useRef(null);
    const infoInput = useRef(null);

    //insures that the .env file is only run in a development environment and not a production environment
    if(process.env.NODE_ENV !== 'production'){
        //requires the the .env file configuration be run first hiding all info hidden via the .env file
        require('dotenv').config();
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{

            let formData = new FormData();
            
            formData.append('title', title);
            formData.append('product', type);
            formData.append('images', images);
            formData.append('price', price);
            formData.append('info', info);

            const response = await CollectionAPI.post(
                "/admin/create",
                formData,
                {
                    headers: {"Content-Type": "multipart/form-data"}
                }
            )
            .then(res => console.log(res))
            .catch(err => console.log(err))

            // const response = await CollectionAPI.post("/admin/create",{
            //         title: title,
            //         product: type,
            //         images: images,
            //         price: price,                
            //         info: info
            // })

            createItem(response);

            titleInput.current.value = "";
            typeInput.current.value = "";
            priceInput.current.value = "";
            infoInput.current.value = "";

        }catch(err){
            console.log(err);
        }
    }

    return(
        <div>
            <div className="main-body">
                <div className="center">
                    <p className="title">admin</p>
                </div>
                <div className="admin-item-div">
                    <div className="admin-image-div">
                        <div className="image">
                            <div className="big-image-div">
                                <img className="big-image" src="" alt="item"/>
                            </div>
                        </div>
                    </div>
                    <form className="admin-form" action="/admin/create" method="POST" encType="multipart/form-data">
                        <div className="admin-form-field">
                            <label className=""></label>
                            <p className="title">Create</p>
                        </div>
                        <div className="admin-form-field">
                            <label className="">Title</label>
                            <input value={title} ref={titleInput} onChange={e => setTitle(e.target.value)} type="text" name="name" className="form-control" required/>
                        </div>
                        <div className="admin-form-field">
                            <div>
                                <label className=" radio-label">Type:</label>
                            </div>
                            <div className="radio-div">
                                <div>
                                    <label className=" radio">Comic</label>
                                    <input value={type} ref={typeInput} onChange={e => setType("comic")} type = "radio" name = "product" required/>
                                </div>
                                <div>
                                    <label className=" radio">Print</label>
                                    <input value={type} ref={typeInput} onChange={e => setType("print")} type = "radio" name = "product"/>
                                </div>
                                <div>
                                    <label className=" radio">Personal</label>
                                    <input value={type} ref={typeInput} onChange={e => setType("personal")} type = "radio" name = "product"/>
                                </div>
                            </div>
                        </div>
                        <div className="admin-form-field">
                            <label className="">Images</label>
                            <input  type="file" onChange={e => setImages(e.target.files[0])} name="images" className="form-control" required/>
                        </div>
                        <div className="admin-form-field">
                            <label className="">Price</label>
                            <input value={price} ref={priceInput} onChange={e => setPrice(e.target.value)} type="number" name="price" className="form-control" required/>
                        </div>
                        <div className="admin-form-field">
                            <label className="">Info</label>
                            <textarea value={info} ref={infoInput} onChange={e => setInfo(e.target.value)} name="message" rows="5" required></textarea>
                        </div>
                        <div className="admin-form-button">
                            <div></div>
                            <div className="text-center">
                                <div>
                                    <button onClick={handleSubmit} type="submit" className="btn form-button">Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminCreateC;