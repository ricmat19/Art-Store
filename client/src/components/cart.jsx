import React, { useEffect, useState } from 'react';
import CartItemC from './cartItem';
import HeaderC from './header';
import FooterC from './footer';
import collectionAPI from '../apis/collectionAPI';

const CartC = () => {

    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchData = async (req, res) => {
            try{
                const cartResponse = await collectionAPI.get(`/cart`);
                setCart(cartResponse.data.data.cart);
            }catch(err){
                console.log(err);
            }
        }

        fetchData();
    }, []);


    return(
        <div className="main-body">
            <HeaderC/>
            <div className="center">
                <p className="title">Shopping Cart</p>
            </div>
            <div className="cart-table">
                <div className="table-headers">
                    <p>item</p>
                    <p className="align-center">quantity</p>
                    <p className="align-right">price</p>
                </div>
                <hr className="table-hr"/>
                <div className="cart-items">
                    <CartItemC cartCollection={cart}/>
                </div>
                <div className="align-right subtotal-div">
                    <span>subtotal</span>
                    <span>$0.00</span>
                </div>
                <div className="align-right cart-button">
                    <button><a href="/checkout">Checkout</a></button>
                </div>
            </div>
            <FooterC/>
        </div>
    )
}

export default CartC;