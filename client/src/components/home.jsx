import React, { useContext, useEffect, useState } from 'react';
import CartModalC from './cartModal';
import HeaderC from './header';
import FooterC from './footer';
import CollectionAPI from '../apis/collectionAPI';
import { useParams } from 'react-router-dom';
import { CollectionContext } from '../context/collectionContext';

const HomeC = () => {

    const {product} = useParams();
    const {collection, setCollection} = useContext(CollectionContext);
    const [cart, setCart] = useState([]);
    const [cartState, setCartState] = useState(false);
    const [cartQty, setCartQty] = useState(0);
    const [cartCost, setCartCost] = useState(0);
    const [homeImageArray, setHomeImageArray] = useState([]);

    let productResponse;
    let imageArray = [];
    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                const cartResponse = await CollectionAPI.get(`/cart`);
                setCart(cartResponse.data.data.cart);

                setCartQty(cartResponse.data.data.cart.length)

                let price = 0;
                for(let i = 0; i < cartResponse.data.data.cart.length; i++){
                    price += parseInt(cartResponse.data.data.cart[i].price)
                }
                setCartCost(price)

                if(cartResponse.length !== 0){
                    setCartState(true);
                }else{
                    setCartState(false);
                }

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
            <CartModalC cartState={cartState} cartQty={cartQty} cartCost={cartCost}/>
            <HeaderC/>
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