import React from 'react';

const CartModalC = () => {

    return(
        <a href="/cart">
            <div className="active-modal cart-modal">
                <i className="fas fa-shopping-cart cart-icon"></i>
                <div className="cart-quantity">
                    <div>0</div>
                    <label>items</label>
                </div>
                <div className="totalPrice">$0</div>
            </div>
        </a>
    )
}

export default CartModalC;