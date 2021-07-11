import React from 'react';
import OrderSummaryC from './orderSummary';

const PaymentC = () => {

    return(
        <div className="main-body payment-div">
            <div className="payment-selection-div">
                <div className="payment-info-div">
                    <div className="payment-info">
                        <p className="align-left">contact</p>
                        <p className="align-left">test@test.com</p>
                        <a className="align-right" href=""><p>change</p></a>
                    </div>
                    <hr className="payment-hr"/>
                    <div className="payment-info">
                        <p className="align-left">ship to</p>
                        <p className="align-left">100 sw 111 ave Atlanta GA 11111, United States</p>
                        <a className="align-right" href=""><p>change</p></a>
                    </div>
                    <hr className="payment-hr"/>
                    <div className="payment-info">
                        <p className="align-left">method</p>
                        <p className="align-left">first class (3-7 days) - $0.00</p>
                        <a className="align-right" href=""><p>change</p></a>
                    </div>
                </div>

                <div className="payment-method-selection-div">
                    <p>payment method</p>
                    <div className="payment-options-div">
                        <div className="payment-option">
                            <input className="align-left" type="radio" name="payment-method"/>
                            <label className="align-left">Credit Card</label>
                        </div>
                        <div className="payment-info-input-div">
                            <div className="grid payment-input">
                                <input type="text" placeholder="card number"/>
                            </div>
                            <div className="grid payment-input">
                                <input type="text" placeholder="name on card"/>
                            </div>
                            <div className="two-column-div">
                                <input type="text" placeholder="expiration date (mm/yy)"/>
                                <input type="text" placeholder="cvv"/>
                            </div>
                            <hr className="payment-hr"/>
                            <div className="payment-option">
                                <input className="align-left" type="radio" name="payment-method"/>
                                <label className="align-left">PayPal</label>
                            </div>
                            <hr className="payment-hr"/>
                            <div className="payment-option">
                                <input className="align-left" type="radio" name="payment-method"/>
                                <label className="align-left">Amazon Pay</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="two-column-div payment-button">
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
                    <p className="align-left">payment</p>
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

export default PaymentC;