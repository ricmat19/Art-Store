import React, { useEffect, useState } from 'react';
import CartModalC from './cartModal';
import HeaderC from './header';
import FooterC from './footer';
import CollectionAPI from '../apis/collectionAPI';

const HomeC = () => {

    const [cart, setCart] = useState([]);
    const [cartState, setCartState] = useState(false);

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                const cartResponse = await CollectionAPI.get(`/cart`);
                setCart(cartResponse.data.data.cart);

                console.log(cart)

                if(cart.length !== 0){
                    setCartState(true);
                }else{
                    setCartState(false);
                }

            }catch(err){
                console.log(err);
            }
        }

        fetchData();
    }, []);

    return(
        <div>
            <CartModalC cartState={cartState}/>
            <HeaderC/>
            <div className="main-body home-menu">
                <a href="collection/comic">
                    <div className="menu-item">
                        <img className="menu-image" src="../../logo512.png" alt="comics"/>
                        <p className="title">Comics</p>
                    </div>
                </a>
                <a href="collection/print">
                    <div className="menu-item">
                        <img className="menu-image" src="../../logo512.png" alt="prints"/>
                        <p className="title">Prints</p>
                    </div>
                </a>
                <a href="collection/personal">
                    <div className="menu-item">
                        <img className="menu-image" src="../../logo512.png" alt="personal works"/>
                        <p className="title">Personal Works</p>
                    </div>
                </a>
            </div>
            <FooterC/>
        </div>
    )
}

export default HomeC;