import React, { useContext, useEffect, useState } from 'react';
import AdminHeaderC from './adminHeader';
import FooterC from '../footer';
import CollectionAPI from '../../apis/collectionAPI';
import { useParams } from 'react-router-dom';
import { CollectionContext } from '../../context/collectionContext';

const HomeC = () => {

    const {product} = useParams();
    const {collection, setCollection} = useContext(CollectionContext);
    const [homeImageArray, setHomeImageArray] = useState([]);

    let productResponse;
    let imageArray = [];
    useEffect(() => {
        const fetchData = async (req, res) => {
            try{

                productResponse = await CollectionAPI.get(`/collection`);

                for(let i=0; i < productResponse.data.data.collection.length; i++){
                    
                    if(productResponse.data.data.collection[i].imagekey !== null){
                        let imagesResponse = await CollectionAPI.get(`/images/${productResponse.data.data.collection[i].imagekey}`, {
                            responseType: 'arraybuffer'
                        })
                        .then(response => Buffer.from(response.data, 'binary').toString('base64'));
    
                        imageArray.push(`data:image/png;base64,${imagesResponse}`)
                    }
                    
                }
                setHomeImageArray(imageArray);
                console.log(homeImageArray)
                setCollection(productResponse.data.data.collection);

            }catch(err){
                console.log(err);
            }
        }

        fetchData();
    }, []);

    return(
        <div>
            <AdminHeaderC/>
                <div className="main-body home-menu">
                    <a href="collection/2D">
                        <div className="menu-item">
                            <img className="menu-image" src={homeImageArray[0]} alt="prints"/>
                            <p className="title">2D Art</p>
                        </div>
                    </a>
                    <a href="collection/3D">
                        <div className="menu-item">
                            <img className="menu-image" src={homeImageArray[1]} alt="3d art"/>
                            <p className="title">3D Art</p>
                        </div>
                    </a>
                    <a href="collection/comic">
                        <div className="menu-item">
                            <img className="menu-image" src={homeImageArray[2]} alt="comics"/>
                            <p className="title">Comics</p>
                        </div>
                    </a>
                </div>
            <FooterC/>
        </div>
    )
}

export default HomeC;