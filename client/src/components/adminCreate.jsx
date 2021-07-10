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

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{

            // const {url} = await fetch("/s3Url").then(res => res.json());
            // console.log(url);

            // fetch({
            //     method: "PUT",
            //     headers: {"Content-Type": "multipart/form-data"},
            //     body: images
            // })

            // const imageUrl = url.split('?')[0];
            // console.log(imageUrl);

            const response = await CollectionAPI.post("/admin/create", {
                title: title,
                product: type,
                images: images,
                price: price,
                info: info
            })

            createItem(response.data.data.newItem);

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
                    <form action="/routes/admin.js" method="POST" encType="multipart/form-data">
                        <div className="admin-form">
                            <label className=""></label>
                            <p className="">Create</p>
                        </div>
                        <div className="admin-form">
                            <label className="">Title</label>
                            <input value={title} ref={titleInput} onChange={e => setTitle(e.target.value)} type="text" name="name" className="form-control" required/>
                        </div>
                        <div className="admin-form">
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
                        <div className="admin-form">
                            <label className="">Images</label>
                            <input  type="file" onChange={e => setImages(e.target.file)} name="images" className="form-control" required/>
                        </div>
                        <div className="admin-form">
                            <label className="">Price</label>
                            <input value={price} ref={priceInput} onChange={e => setPrice(e.target.value)} type="number" name="price" className="form-control" required/>
                        </div>
                        <div className="admin-form">
                            <label className="">Info</label>
                            <textarea value={info} ref={infoInput} onChange={e => setInfo(e.target.value)} name="message" rows="5" required></textarea>
                        </div>
                        <div className="form-button-div text-center">
                            <button onClick={handleSubmit} type="submit" className="btn form-button">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminCreateC;