import React from 'react';
import CartItemC from './cartItem';

const CartC = () => {

    return(
        <div className="main-body">
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
                    <CartItemC/>
                </div>
                <div className="align-right subtotal-div">
                    <span>subtotal</span>
                    <span>$0.00</span>
                </div>
                <div className="align-right cart-button">
                    <button><a href="/checkout">Checkout</a></button>
                </div>

            </div>
        </div>
    )
}

export default CartC;