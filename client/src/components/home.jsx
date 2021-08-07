import React, { useEffect, useState } from 'react';
import CartModalC from './cartModal';
import HeaderC from './header';
import FooterC from './footer';
import CollectionAPI from '../apis/collectionAPI';

const HomeC = () => {

    const [cart, setCart] = useState([]);
    const [cartState, setCartState] = useState(false);
    const [cartQty, setCartQty] = useState(0);
    const [cartCost, setCartCost] = useState(0);

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