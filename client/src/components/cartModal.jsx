import React from 'react';

const CartModalC = () => {

    return(
        <a href="/cart">
            <div className="active-cart cart-modal">
                <i className="fas fa-shopping-cart cart-icon"></i>
                <div className="cart-quantity-div">
                    <div className="cart-quantity">0</div>
                    <label>items</label>
                </div>
                <div className="totalPrice">$0</div>
            </div>
        </a>
    )
}

export default CartModalC;