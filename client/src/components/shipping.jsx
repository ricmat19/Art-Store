import React from 'react';
import OrderSummaryC from './orderSummary';

const ShippingC = () => {

    return(
        <div className="main-body shipping-div">
            <div className="shipping-selection-div">
                <div className="shipping-info-div">
                    <div className="email-div">
                    </div>
                    <div className="shipping-address-div">
                    </div>
                </div>
                <hr className="shipping-hr"/>
                <div className="shipping-method-selection-div">
                    <p>shipping method</p>
                    <div className="shipping-options-div">
                        <div className="shipping-option">
                            <input className="align-left" type="radio" name="shipping-method"/>
                            <label className="align-left">first class (3-7 business days)</label>
                            <p className="align-right">$0.00</p>
                        </div>
                        <hr className="shipping-hr"/>
                        <div className="shipping-option">
                            <input className="align-left" type="radio" name="shipping-method"/>
                            <label className="align-left">priority mail (1-3 business days)</label>
                            <p className="align-right">$0.00</p>
                        </div>
                    </div>
                </div>
                <div className="two-column-div shipping-button">
                    <a href="/payment"><button>continue to payment</button></a>
                    <a href="/checkout"><p>return to information</p></a>
                </div>
            </div>
            <div className="order-summary">
                <div>
                    <OrderSummaryC/>
                </div>
                <hr className="checkout-hr"/>
                <div className="two-column-div checkout-discount">
                    <input type="text" placeholder="discount code"/>
                    <button>apply</button>
                </div>
                <div className="two-column-div">
                    <p className="align-left">subtotal</p>
                    <p className="align-right">$0.00</p>
                </div>
                <div className="two-column-div">
                    <p className="align-left">shipping</p>
                    <p className="align-right">$0.00</p>
                </div>
                <hr className="checkout-hr"/>
                <div className="two-column-div">
                    <p className="align-left">total</p>
                    <p className="align-right">$0.00</p>
                </div>
            </div>
        </div>
    )
}

export default ShippingC;