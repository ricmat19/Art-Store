import React from 'react';

const OrderSummaryC = () => {

    return(
        <div className="cart-item">
            <div className="order-item-details">
                <div className="cart-item-info">
                    <img className="cart-item-thumbnail" src="../../logo512.png" alt="thumbnail"/>
                    <div className="cart-item-title">Title</div>
                </div>
                <div className="cart-item-price">
                    <span>$0.00</span>
                </div>
            </div>
        </div>
    )
}

export default OrderSummaryC;