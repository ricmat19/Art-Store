import React from 'react';

const CartItemC = () => {

    return(
        <div className="cart-item">
            <div className="cart-item-details">
                <div className="cart-item-info">
                    <span>X</span>
                    <span>
                        <img className="cart-item-thumbnail" src="../../logo512.png" alt="thumbnail"/>
                    </span>
                    <div className="cart-item-title">Title</div>
                </div>
                <div className="cart-item-qty">
                    <input className="item-qty-input" type="number" placeholder="0"></input>
                </div>
                <div className="cart-item-price">
                    <span>$0.00</span>
                </div>
            </div>
            <hr className="item-hr"/>
        </div>
    )
}

export default CartItemC;